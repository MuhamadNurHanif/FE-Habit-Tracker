import axios from "axios"

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8000/api",
  headers: { "Content-Type": "application/json" },
})

// ---- Habits endpoints (Django Ninja) ----
// expected shape (contoh):
// Habit: { id, title, description, frequency, created_at, updated_at, done? }

export const getHabits = async () => {
  const { data } = await api.get("/habits")
  return data
}

export const getHabit = async (id) => {
  const { data } = await api.get(`/habits/${id}`)
  return data
}

export const createHabit = async (payload) => {
  const { data } = await api.post("/habits", payload)
  return data
}

export const updateHabit = async (id, payload) => {
  const { data } = await api.put(`/habits/${id}`, payload)
  return data
}

export const deleteHabit = async (id) => {
  const { data } = await api.delete(`/habits/${id}`)
  return data
}