import { PageHeader } from "@/components/admin/page-header"
import { QuestionForm } from "@/components/admin/question-form"

export default function TambahSoalPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Tambah Soal"
        description="Buat soal baru dan masukkan ke bank soal."
      />
      <QuestionForm mode="create" />
    </div>
  )
}
