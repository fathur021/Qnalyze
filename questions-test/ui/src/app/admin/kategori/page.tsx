"use client"

import { useState } from "react"
import { FolderOpen, MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react"
import { toast } from "sonner"

import { PageHeader } from "@/components/admin/page-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { categories as initialCategories, toneClasses, type Category } from "@/lib/mock-data"
import { cn } from "cn"

export default function KategoriPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Category | null>(null)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null)

  const openCreate = () => {
    setEditing(null)
    setName("")
    setDescription("")
    setFormOpen(true)
  }

  const openEdit = (category: Category) => {
    setEditing(category)
    setName(category.name)
    setDescription(category.description)
    setFormOpen(true)
  }

  const handleSave = () => {
    if (!name.trim()) {
      toast.error("Nama kategori wajib diisi.")
      return
    }
    if (editing) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === editing.id ? { ...c, name, description } : c
        )
      )
      toast.success("Kategori berhasil diperbarui.")
    } else {
      setCategories((prev) => [
        ...prev,
        {
          id: `cat-${Date.now()}`,
          name,
          description,
          questionCount: 0,
          tone: "indigo",
          createdAt: "Hari ini",
        },
      ])
      toast.success("Kategori baru berhasil ditambahkan.")
    }
    setFormOpen(false)
  }

  const handleDelete = () => {
    if (!deleteTarget) return
    setCategories((prev) => prev.filter((c) => c.id !== deleteTarget.id))
    toast.success(`Kategori "${deleteTarget.name}" dihapus.`)
    setDeleteTarget(null)
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title="Kategori Soal"
        description="Kelompokkan bank soal berdasarkan mata pelajaran atau topik."
      >
        <Button onClick={openCreate}>
          <Plus />
          Tambah Kategori
        </Button>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => {
          const tone = toneClasses[category.tone]
          return (
            <Card key={category.id} size="sm">
              <CardContent className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span
                    className={cn(
                      "flex size-10 items-center justify-center rounded-lg",
                      tone.bg,
                      tone.text
                    )}
                  >
                    <FolderOpen className="size-5" />
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label={`Aksi ${category.name}`}
                        />
                      }
                    >
                      <MoreHorizontal />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEdit(category)}>
                        <Pencil />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => setDeleteTarget(category)}
                      >
                        <Trash2 />
                        Hapus
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-1">
                  <h3 className="font-heading text-sm font-semibold text-foreground">
                    {category.name}
                  </h3>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <Badge variant="secondary">
                    {category.questionCount} soal
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Dibuat {category.createdAt}
                  </span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Kategori" : "Tambah Kategori"}
            </DialogTitle>
            <DialogDescription>
              {editing
                ? "Perbarui informasi kategori soal."
                : "Buat kategori baru untuk mengelompokkan soal."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category-name">Nama Kategori</Label>
              <Input
                id="category-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Matematika"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category-description">Deskripsi</Label>
              <Textarea
                id="category-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Deskripsi singkat kategori…"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFormOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleSave}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogMedia className="bg-destructive/10 text-destructive">
              <Trash2 />
            </AlertDialogMedia>
            <AlertDialogTitle>Hapus kategori?</AlertDialogTitle>
            <AlertDialogDescription>
              Kategori &quot;{deleteTarget?.name}&quot; beserta
              {deleteTarget?.questionCount} soal di dalamnya akan dihapus. Tindakan
              ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-white hover:bg-destructive/90"
              onClick={handleDelete}
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
