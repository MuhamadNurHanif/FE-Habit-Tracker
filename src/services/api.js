const API_URL = "http://localhost:8000/api/todos/"

export const getTodos = async () => {
  const res = await fetch(API_URL)
  if (!res.ok) throw new Error("Failed to fetch todos")
  return res.json()
}

export const getTodo = async (id) => {
  const res = await fetch(`${API_URL}${id}`)
  if (!res.ok) throw new Error("Failed to fetch todo")
  return res.json()
}

export const createTodo = async (todo) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  })
  if (!res.ok) throw new Error("Failed to create todo")
  return res.json()
}

export const updateTodo = async ({ id, ...todo }) => {
  const res = await fetch(`${API_URL}${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  })
  if (!res.ok) throw new Error("Failed to update todo")
  return res.json()
}

export const deleteTodo = async (id) => {
  const res = await fetch(`${API_URL}${id}`, { method: "DELETE" })
  if (!res.ok) throw new Error("Failed to delete todo")
  return res.json()
}