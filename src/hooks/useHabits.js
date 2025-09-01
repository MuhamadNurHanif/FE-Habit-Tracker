import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getHabits, getHabit, createHabit, updateHabit, deleteHabit } from "@/services/api"

export function useHabits() {
  return useQuery({ queryKey: ["habits"], queryFn: getHabits })
}

export function useHabit(id) {
  return useQuery({
    queryKey: ["habits", id],
    queryFn: () => getHabit(id),
    enabled: !!id,
  })
}

export function useCreateHabit() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: createHabit,
    onMutate: async (newHabit) => {
      await qc.cancelQueries({ queryKey: ["habits"] })
      const prev = qc.getQueryData(["habits"])
      qc.setQueryData(["habits"], (old = []) => [
        ...old,
        { id: `temp-${Date.now()}`, ...newHabit, _optimistic: true },
      ])
      return { prev }
    },
    onError: (_err, _newHabit, ctx) => {
      if (ctx?.prev) qc.setQueryData(["habits"], ctx.prev)
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["habits"] })
    },
  })
}

export function useUpdateHabit() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => updateHabit(id, data),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["habits"] })
      qc.invalidateQueries({ queryKey: ["habits", vars.id] })
    },
  })
}

export function useDeleteHabit() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: deleteHabit,
    // Optimistic remove
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ["habits"] })
      const prev = qc.getQueryData(["habits"])
      qc.setQueryData(["habits"], (old = []) => old.filter((h) => h.id !== id))
      return { prev }
    },
    onError: (_err, _id, ctx) => {
      if (ctx?.prev) qc.setQueryData(["habits"], ctx.prev)
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["habits"] })
    },
  })
}