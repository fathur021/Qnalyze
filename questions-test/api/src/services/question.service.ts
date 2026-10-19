import type { NewQuestion, Question } from "../db/schema.js";
import { findImportContext, insertMany } from "../repositories/question.repository.js";
import type { ExcelImportError, ParsedEntry, ParsedQuestion } from "../types/question.js";
import { parseQuestionsWorkbook } from "../utils/excel.js";

/** Ringkasan hasil impor soal massal. */
export type ImportQuestionsResult = {
  imported: number;
  failed: number;
  errors: ExcelImportError[];
  data: Question[];
};

export type ImportPreviewRow = {
  row: number;
  question: Pick<ParsedQuestion, "code" | "text" | "category" | "type"> | null;
  errors: string[];
};

export type ImportPreviewResult = {
  valid: number;
  failed: number;
  rows: ImportPreviewRow[];
};

/** Konteks validasi satu baris: data referensi + kode yang sudah dilihat. */
type ImportValidationContext = {
  categoryIds: Map<string, number>;
  existingCodes: Set<string>;
  seenCodes: Set<string>;
};

/** Hasil validasi satu baris soal. */
type RowValidation = { ok: true; categoryId: number } | { ok: false; messages: string[] };

/**
 * Impor soal massal dari buffer berkas Excel.
 *
 * Setiap baris divalidasi terhadap kategori terdaftar dan kode unik; baris yang
 * bermasalah dikumpulkan di `errors`, sedangkan baris yang valid disimpan.
 *
 * @throws ExcelParseError bila bentuk berkas tidak valid.
 */
export async function importQuestions(buffer: Buffer): Promise<ImportQuestionsResult> {
  const workbook = parseQuestionsWorkbook(buffer);
  const errors: ExcelImportError[] = [...workbook.errors];

  const categoryNames = uniqueCategoryNames(workbook.data);
  const codes = workbook.data.map(({ question }) => question.code);
  const { categoryIds, existingCodes } = await findImportContext(categoryNames, codes);

  const context: ImportValidationContext = {
    categoryIds,
    existingCodes,
    seenCodes: new Set<string>(),
  };

  const questionsToInsert = collectValidQuestions(workbook.data, context, errors);
  const data = await insertMany(questionsToInsert);

  return { imported: data.length, failed: errors.length, errors, data };
}

/** Parse and validate an import file without persisting its questions. */
export async function previewQuestions(buffer: Buffer): Promise<ImportPreviewResult> {
  const workbook = parseQuestionsWorkbook(buffer);
  const categoryNames = uniqueCategoryNames(workbook.data);
  const codes = workbook.data.map(({ question }) => question.code);
  const { categoryIds, existingCodes } = await findImportContext(categoryNames, codes);
  const context: ImportValidationContext = {
    categoryIds,
    existingCodes,
    seenCodes: new Set<string>(),
  };
  const errorsByRow = new Map<number, string[]>();

  for (const error of workbook.errors) addRowError(errorsByRow, error.row, error.message);

  const rows: ImportPreviewRow[] = workbook.data.map(({ row, question }) => {
    const validation = validateRow(question, context);
    if (!validation.ok) {
      for (const message of validation.messages) addRowError(errorsByRow, row, message);
    }
    return {
      row,
      question: {
        code: question.code,
        text: question.text,
        category: question.category,
        type: question.type,
      },
      errors: errorsByRow.get(row) ?? [],
    };
  });

  const knownRows = new Set(rows.map(({ row }) => row));
  for (const [row, errors] of errorsByRow) {
    if (!knownRows.has(row)) rows.push({ row, question: null, errors });
  }
  rows.sort((first, second) => first.row - second.row);

  const failed = rows.filter(({ errors }) => errors.length > 0).length;
  return { valid: rows.length - failed, failed, rows };
}

function addRowError(errorsByRow: Map<number, string[]>, row: number, message: string): void {
  const errors = errorsByRow.get(row) ?? [];
  errors.push(message);
  errorsByRow.set(row, errors);
}

/** Nama kategori unik dari seluruh soal hasil parsing. */
function uniqueCategoryNames(entries: ParsedEntry[]): string[] {
  return [...new Set(entries.map(({ question }) => question.category))];
}

/**
 * Ubah baris hasil parsing menjadi data siap simpan, sambil menambahkan
 * pesan kesalahan ke `errors` untuk baris yang tidak lolos validasi.
 */
function collectValidQuestions(
  entries: ParsedEntry[],
  context: ImportValidationContext,
  errors: ExcelImportError[],
): NewQuestion[] {
  const questionsToInsert: NewQuestion[] = [];

  for (const { row, question } of entries) {
    const validation = validateRow(question, context);

    if (!validation.ok) {
      errors.push({ row, message: validation.messages.join("; ") });
      continue;
    }

    questionsToInsert.push(toInsertPayload(question, validation.categoryId));
  }

  return questionsToInsert;
}

/** Validasi satu soal: kategori harus terdaftar dan kode belum dipakai. */
function validateRow(question: ParsedQuestion, context: ImportValidationContext): RowValidation {
  const categoryId = context.categoryIds.get(question.category);
  const messages: string[] = [];

  if (categoryId === undefined) {
    messages.push(`Kategori "${question.category}" tidak ditemukan`);
  }
  if (context.seenCodes.has(question.code) || context.existingCodes.has(question.code)) {
    messages.push(`Kode "${question.code}" sudah digunakan`);
  }
  context.seenCodes.add(question.code);

  if (messages.length > 0 || categoryId === undefined) {
    return { ok: false, messages };
  }

  return { ok: true, categoryId };
}

/** Bentuk data insert dari satu soal hasil parsing. */
function toInsertPayload(question: ParsedQuestion, categoryId: number): NewQuestion {
  return {
    code: question.code,
    text: question.text,
    categoryId,
    type: question.type,
    difficulty: question.difficulty,
    status: question.status,
    options: question.options,
    answer: question.answer,
    explanation: question.explanation,
  };
}
