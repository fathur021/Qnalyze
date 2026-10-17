import { notFound } from "next/navigation"

import { PageHeader } from "@/components/admin/page-header"
import { QuestionForm } from "@/components/admin/question-form"
import { questions } from "@/lib/mock-data"

export default async function EditSoalPage({
  params,
}: PageProps<"/admin/bank-soal/[id]">) {
  const { id } = await params
  const question = questions.find((q) => q.id === id)

  if (!question) notFound()

  return (
    <div className="space-y-5">
      <PageHeader
        title="Edit Soal"
        description={`Perbarui soal ${question.code}.`}
      />
      <QuestionForm mode="edit" question={question} />
    </div>
  )
}
