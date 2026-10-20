export type User = {
  id: number;
  name: string | null;
  email: string;
  createdAt: string;
};

export type ApiCategory = {
  id: number;
  name: string;
  description: string | null;
  tone: "indigo" | "emerald" | "amber" | "rose" | "sky" | "violet";
  questionCount: number;
  createdAt: string;
};

export type CategoryInput = {
  name: string;
  description?: string | null;
  tone?: ApiCategory["tone"];
};

export type ApiQuestion = {
  id: number;
  code: string;
  categoryId: number;
  text: string;
  type: "Pilihan Ganda" | "Benar/Salah" | "Isian Singkat";
  difficulty: "Mudah" | "Sedang" | "Sulit";
  status: "Terbit" | "Draf";
  options: { key: string; text: string }[];
  answer?: string;
  explanation?: string | null;
  updatedAt?: string;
};

export type QuestionInput = Omit<ApiQuestion, "id" | "updatedAt">;

export type AttemptQuestion = {
  id: number;
  number: number;
  topic: string;
  difficulty: "Mudah" | "Sedang" | "Sulit";
  prompt: string;
  options: { key: string; text: string }[];
  answer?: string;
  explanation?: string | null;
};

export type Attempt = {
  id: number;
  categoryId: number;
  title: string;
  packageLabel: string | null;
  durationLimitMinutes: number;
  status: "Berlangsung" | "Selesai";
  score: number | null;
  correct: number | null;
  total: number;
  questions: AttemptQuestion[];
};
export type AuthResponse = {
  user: User;
};

export type ExcelImportError = {
  row: number;
  message: string;
};

export type ExcelImportResult = {
  imported: number;
  failed: number;
  errors: ExcelImportError[];
};

export type ExcelImportPreview = {
  valid: number;
  failed: number;
  rows: {
    row: number;
    question: {
      code: string;
      text: string;
      category: string;
      type: string;
    } | null;
    errors: string[];
  }[];
};

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

const API_BASE_URL = "/api";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;

  try {
    const headers = new Headers(init?.headers);
    if (!(init?.body instanceof FormData)) {
      headers.set("Content-Type", "application/json");
    }

    response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      credentials: "include",
      headers,
    });
  } catch {
    throw new ApiError(0, "Tidak dapat terhubung ke server. Coba lagi.");
  }

  if (!response.ok) {
    let message = `Terjadi kesalahan (${response.status})`;

    try {
      const data = (await response.json()) as { message?: string };
      if (data?.message) message = data.message;
    } catch {
      // Respons bukan JSON — pakai pesan baku.
    }

    throw new ApiError(response.status, message);
  }

  if (response.status === 204) return undefined as T;

  return (await response.json()) as T;
}

export function login(input: { email: string; password: string }) {
  return request<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function register(input: {
  name?: string;
  email: string;
  password: string;
}) {
  return request<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function logout() {
  return request<void>("/auth/logout", { method: "POST" });
}

export function getCurrentUser() {
  return request<User>("/users/me");
}

export function importQuestions(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  return request<ExcelImportResult>("/questions/import", {
    method: "POST",
    body: formData,
  });
}

export function previewQuestionsImport(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  return request<ExcelImportPreview>("/questions/import/preview", {
    method: "POST",
    body: formData,
  });
}

export async function getCategories(publicOnly = false) {
  const result = await request<{ data: ApiCategory[] }>(
    publicOnly ? "/categories/public" : "/categories",
  );
  return result.data;
}

export function createCategory(input: CategoryInput) {
  return request<ApiCategory>("/categories", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function updateCategory(id: number, input: Partial<CategoryInput>) {
  return request<ApiCategory>(`/categories/${id}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}

export function deleteCategory(id: number) {
  return request<void>(`/categories/${id}`, { method: "DELETE" });
}

export async function getQuestions(
  params: {
    page?: number;
    limit?: number;
    status?: string;
  } = {},
) {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) search.set(key, String(value));
  }
  return request<{ data: ApiQuestion[]; total: number }>(
    `/questions?${search}`,
  );
}

export function getQuestion(id: string | number) {
  return request<ApiQuestion>(`/questions/${id}`);
}

export function createQuestion(input: QuestionInput) {
  return request<ApiQuestion>("/questions", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function updateQuestion(id: string | number, input: QuestionInput) {
  return request<ApiQuestion>(`/questions/${id}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });
}

export function deleteQuestion(id: string | number) {
  return request<void>(`/questions/${id}`, { method: "DELETE" });
}

export function duplicateQuestion(id: string | number) {
  return request<ApiQuestion>(`/questions/${id}/duplicate`, { method: "POST" });
}

export function getPublicQuestions(categoryId: number) {
  return request<{ data: Omit<ApiQuestion, "answer" | "explanation">[] }>(
    `/questions/public?categoryId=${categoryId}&limit=100`,
  );
}

export function startAttempt(categoryId: number) {
  return request<Attempt>("/attempts", {
    method: "POST",
    body: JSON.stringify({ categoryId }),
  });
}

export function getAttempt(id: number) {
  return request<Attempt>(`/attempts/${id}`);
}

export function submitAttempt(
  id: number,
  answers: { questionId: number; answer: string }[],
) {
  return request<Attempt>(`/attempts/${id}/answers`, {
    method: "POST",
    body: JSON.stringify({ answers }),
  });
}
