"use client"

import { ArrowRight, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-border bg-background p-3 text-center">
      <p className="font-heading text-xl font-semibold tabular-nums text-foreground">
        {value}
      </p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  )
}

export function SubmitDialog({
  total,
  answered,
  flagged,
  onConfirm,
}: {
  total: number
  answered: number
  flagged: number
  onConfirm: () => void
}) {
  return (
    <Dialog>
      <DialogTrigger
        render={<Button size="lg" className="w-full" />}
      >
        <CheckCircle2 data-icon="inline-start" />
        Kumpulkan Semua Jawaban
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Konfirmasi Pengumpulan</DialogTitle>
          <DialogDescription>
            Sesi latihan akan diselesaikan dan seluruh jawabanmu akan direkam.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-2">
          <Stat label="Terjawab" value={answered} />
          <Stat label="Belum Dijawab" value={total - answered} />
          <Stat label="Ragu-ragu" value={flagged} />
        </div>

        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            Periksa Kembali
          </DialogClose>
          <Button onClick={onConfirm}>
            Ya, Selesaikan Latihan
            <ArrowRight data-icon="inline-end" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
