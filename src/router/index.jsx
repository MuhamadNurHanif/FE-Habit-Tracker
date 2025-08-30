// src/router/index.jsx
import { createRootRoute, createRoute, Router, RouterProvider } from "@tanstack/react-router"
import SidebarLayout from "@/layouts/SidebarLayout"
import Dashboard from "@/pages/dashboard"

const rootRoute = createRootRoute({
  component: () => (
    <SidebarLayout>
      <Outlet />
    </SidebarLayout>
  ),
})

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Dashboard,
})

const routeTree = rootRoute.addChildren([dashboardRoute])
const router = new Router({ routeTree })

export default function AppRouter() {
  return <RouterProvider router={router} />
}
