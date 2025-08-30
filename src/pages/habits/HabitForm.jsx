import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { useCreateHabit, useHabit, useUpdateHabit } from "@/hooks/useHabits"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useEffect } from "react"

export default function HabitForm() {
  const { id } = useParams()
  const isEdit = !!id
  const { data: detail, isLoading: loadingDetail } = useHabit(id)
  const createMut = useCreateHabit()
  const updateMut = useUpdateHabit()
  const nav = useNavigate()

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { title: "", description: "", frequency: "daily" },
  })

  useEffect(() => {
    if (detail && isEdit) {
      reset({
        title: detail.title ?? "",
        description: detail.description ?? "",
        frequency: detail.frequency ?? "daily",
      })
    }
  }, [detail, isEdit, reset])

  const onSubmit = async (values) => {
    if (isEdit) {
      await toast.promise(
        updateMut.mutateAsync({ id, data: values }),
        { loading: "Menyimpan...", success: "Habit diupdate", error: "Gagal update" }
      )
      nav(`/habits/${id}`)
    } else {
      await toast.promise(
        createMut.mutateAsync(values),
        { loading: "Membuat habit...", success: "Habit dibuat", error: "Gagal membuat" }
      )
      nav("/habits")
    }
  }

  if (isEdit && loadingDetail) return <p>Loading...</p>

  return (
    <div className="max-w-xl space-y-4">
      <h1 className="text-2xl font-bold">{isEdit ? "Edit Habit" : "Buat Habit"}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <Input {...register("title", { required: true })} placeholder="Contoh: Bangun Pagi" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <Textarea {...register("description")} placeholder="Deskripsi singkat..." />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Frequency</label>
          <select
            {...register("frequency")}
            className="w-full border rounded-md px-3 py-2"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>

        <div className="flex gap-2">
          <Button type="submit">{isEdit ? "Simpan" : "Buat"}</Button>
          <Button type="button" variant="outline" onClick={() => nav(-1)}>Batal</Button>
        </div>
      </form>
    </div>
  )
}