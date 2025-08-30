import { Link, useNavigate, useParams } from "react-router-dom"
import { useHabit, useDeleteHabit } from "@/hooks/useHabits"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export default function HabitDetail() {
  const { id } = useParams()
  const nav = useNavigate()
  const { data, isLoading, isError } = useHabit(id)
  const del = useDeleteHabit()

  const onDelete = async () => {
    await toast.promise(del.mutateAsync(id), {
      loading: "Menghapus habit...",
      success: () => {
        nav("/habits")
        return "Habit terhapus"
      },
      error: "Gagal menghapus habit",
    })
  }

  if (isLoading) return <p>Loading...</p>
  if (isError || !data) return <p>Data tidak ditemukan.</p>

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">{data.title}</h1>
          <p className="text-gray-600">{data.description}</p>
          <p className="text-xs text-gray-500 mt-1">Frequency: {data.frequency}</p>
        </div>
        <div className="flex gap-2">
          <Link to={`/habits/${id}/edit`}><Button variant="outline">Edit</Button></Link>
          <Button variant="destructive" onClick={onDelete}>Delete</Button>
        </div>
      </div>

      <Link to="/habits">
        <Button variant="secondary">← Kembali</Button>
      </Link>
    </div>
  )
}