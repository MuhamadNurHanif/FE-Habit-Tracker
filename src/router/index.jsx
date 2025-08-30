import { createBrowserRouter, RouterProvider } from "react-router-dom"
import SidebarLayout from "@/layouts/SidebarLayout"
import Dashboard from "@/pages/dashboard"
import HabitList from "@/pages/habits/HabitList"
import HabitForm from "@/pages/habits/HabitForm"
import HabitDetail from "@/pages/habits/HabitDetail"

const router = createBrowserRouter([
  {
    path: "/",
    element: <SidebarLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "habits", element: <HabitList /> },
      { path: "habits/new", element: <HabitForm /> },
      { path: "habits/:id", element: <HabitDetail /> },
      { path: "habits/:id/edit", element: <HabitForm /> },
    ],
  },
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}
