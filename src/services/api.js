import axios from "axios"

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000/api",
  headers: { "Content-Type": "application/json" },
})


export const getTodos = async () => {
  const { data } = await api.get("/todos/")
  return data
}

export const getTodo = async (id) => {
  const { data } = await api.get(`/todos/${id}`)
  return data
}

export const createTodo = async (payload) => {
  const { data } = await api.post("/todos/", payload)
  return data
}

export const updateTodo = async (id, payload) => {
  const { data } = await api.put(`/todos/${id}`, payload)
  return data
}

export const deleteTodo = async (id) => {
  const { data } = await api.delete(`/todos/${id}`)
  return data
}