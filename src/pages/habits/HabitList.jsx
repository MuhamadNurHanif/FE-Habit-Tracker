import { Link } from "react-router-dom"
import { useHabits, useDeleteHabit } from "@/hooks/useHabits"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useMemo, useState } from "react"

export default function HabitList() {
  const { data, isLoading, isError } = useHabits()
  const del = useDeleteHabit()
  const [q, setQ] = useState("")

  const filtered = useMemo(() => {
    if (!data) return []
    const k = q.toLowerCase()
    return data.filter((h) => h.title?.toLowerCase().includes(k))
  }, [data, q])

  const onDelete = async (id) => {
    await toast.promise(del.mutateAsync(id), {
      loading: "Menghapus habit...",
      success: "Habit terhapus",
      error: "Gagal menghapus habit",
    })
  }

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Gagal memuat data.</p>

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Daftar Habits</h1>
        <Link to="/todos/"><Button>+ New</Button></Link>
      </div>

      <div className="max-w-sm">
        <Input placeholder="Cari habit..." value={q} onChange={(e) => setQ(e.target.value)} />
      </div>

      <ul className="space-y-2">
        {filtered.map((habit) => (
          <li key={habit.id} className="border rounded-xl p-3 flex items-center justify-between">
            <div>
              <Link to={`/todos/${habit.id}`} className="font-semibold hover:underline">
                {habit.title}
              </Link>
              {habit._optimistic && <span className="ml-2 text-xs text-amber-600">(syncing...)</span>}
              <p className="text-sm text-gray-500">{habit.description}</p>
            </div>
            <div className="flex gap-2">
              <Link to={`/todos/${habit.id}/edit`}>
                <Button variant="outline">Edit</Button>
              </Link>
              <Button variant="destructive" onClick={() => onDelete(habit.id)}>Delete</Button>
            </div>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="text-sm text-gray-500">Belum ada data.</li>
        )}
      </ul>
    </div>
  )
}