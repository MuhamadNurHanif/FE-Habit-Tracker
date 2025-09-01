import { createBrowserRouter, RouterProvider } from "react-router-dom"
// import SidebarLayout from "@/layouts/SidebarLayout"
import Dashboard from "@/pages/dashboard"
import '../index.css'
// import HabitList from "@/pages/habits/HabitList"
// import HabitForm from "@/pages/habits/HabitForm"
// import HabitDetail from "@/pages/habits/HabitDetail"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    // children: [
    //   // { index: true, element: <Dashboard /> },
    //   // { path: "todos", element: <HabitList /> },
    //   // { path: "todos/new", element: <HabitForm /> },
    //   // { path: "todos/:id", element: <HabitDetail /> },
    //   // { path: "todos/:id/edit", element: <HabitForm /> },
    // ],
  },
  
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}