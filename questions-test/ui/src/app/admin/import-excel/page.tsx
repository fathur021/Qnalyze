"use client"

import { useRef, useState } from "react"
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  FileSpreadsheet,
  FileUp,
  UploadCloud,
} from "lucide-react"
import { toast } from "sonner"

import { PageHeader } from "@/components/admin/page-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "cn"

const steps = [
  { id: 1, label: "Unduh Template" },
  { id: 2, label: "Unggah File" },
  { id: 3, label: "Tinjau Data" },
  { id: 4, label: "Selesai" },
]

const previewRows = [
  {
    row: 2,
    question: "Sinonim dari kata EVOKASI adalah …",
    category: "Penalaran Verbal",
    type: "Pilihan Ganda",
    valid: true,
  },
  {
    row: 3,
    question: "Lanjutkan deret: 3, 6, 11, 18, 27, …",
    category: "Penalaran Numerik",
    type: "Pilihan Ganda",
    valid: true,
  },
  {
    row: 4,
    question: "Perhatikan pola gambar □, △, ○, □, △, …",
    category: "Penalaran Figural",
    type: "Pilihan Ganda",
    valid: true,
  },
  {
    row: 5,
    question: "(sel kosong)",
    category: "—",
    type: "—",
    valid: false,
  },
  {
    row: 6,
    question: "Semua karyawan memakai kartu akses. Sebagian karyawan membawa laptop. Kesimpulannya …",
    category: "Penalaran Logis",
    type: "Pilihan Ganda",
    valid: true,
  },
]

export default function ImportExcelPage() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  const handleSelect = (files: FileList | null) => {
    if (files && files.length > 0) setFileName(files[0].name)
  }

  const handleImport = () => {
    toast.success("128 soal berhasil diimpor ke bank soal.")
    setFileName(null)
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title="Import Excel"
        description="Impor soal secara massal dari file spreadsheet."
      >
        <Button variant="outline">
          <Download />
          Unduh Template
        </Button>
      </PageHeader>

      <Card>
        <CardContent>
          <ol className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {steps.map((step, index) => {
              const active = step.id === (fileName ? 3 : 2)
              const done = step.id < (fileName ? 3 : 2)
              return (
                <li key={step.id} className="flex flex-1 items-center gap-3">
                  <span
                    className={cn(
                      "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                      active
                        ? "bg-primary text-primary-foreground"
                        : done
                          ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                          : "bg-muted text-muted-foreground"
                    )}
                  >
                    {done ? <CheckCircle2 className="size-4" /> : step.id}
                  </span>
                  <span
                    className={cn(
                      "text-sm font-medium",
                      active ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {step.label}
                  </span>
                  {index < steps.length - 1 ? (
                    <span className="hidden h-px flex-1 bg-border sm:block" />
                  ) : null}
                </li>
              )
            })}
          </ol>
        </CardContent>
      </Card>

      {!fileName ? (
        <Card>
          <CardContent>
            <div
              className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-muted/30 px-6 py-14 text-center"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault()
                handleSelect(e.dataTransfer.files)
              }}
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <UploadCloud className="size-6" />
              </span>
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">
                  Tarik & lepas file Excel di sini
                </p>
                <p className="text-xs text-muted-foreground">
                  Format .xlsx atau .csv, maksimal 5 MB.
                </p>
              </div>
              <input
                ref={inputRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                className="hidden"
                onChange={(e) => handleSelect(e.target.files)}
              />
              <Button
                variant="outline"
                onClick={() => inputRef.current?.click()}
              >
                <FileUp />
                Pilih File
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-5">
          <Card>
            <CardContent className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <FileSpreadsheet className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {fileName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    132 baris terdeteksi · 5 MB
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="border-transparent bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                >
                  <CheckCircle2 />
                  128 valid
                </Badge>
                <Badge
                  variant="outline"
                  className="border-transparent bg-destructive/10 text-destructive"
                >
                  <AlertTriangle />
                  4 perlu diperbaiki
                </Badge>
                <Button variant="ghost" size="sm" onClick={() => setFileName(null)}>
                  Ganti file
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pratinjau Data</CardTitle>
              <CardDescription>
                Tinjau beberapa baris pertama sebelum mengimpor.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-border">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-14">Baris</TableHead>
                      <TableHead>Pertanyaan</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead>Tipe</TableHead>
                      <TableHead className="w-24">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {previewRows.map((row) => (
                      <TableRow
                        key={row.row}
                        className={cn(!row.valid && "bg-destructive/5")}
                      >
                        <TableCell className="tabular-nums text-muted-foreground">
                          {row.row}
                        </TableCell>
                        <TableCell
                          className={cn(
                            "max-w-md whitespace-normal",
                            !row.valid && "text-destructive"
                          )}
                        >
                          {row.question}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {row.category}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {row.type}
                        </TableCell>
                        <TableCell>
                          {row.valid ? (
                            <Badge
                              variant="outline"
                              className="border-transparent bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            >
                              Valid
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="border-transparent bg-destructive/10 text-destructive"
                            >
                              Error
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-wrap items-center justify-end gap-2">
            <Button variant="outline">
              <AlertTriangle />
              Unduh Laporan Error
            </Button>
            <Button onClick={handleImport}>
              <CheckCircle2 />
              Import 128 Soal
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
