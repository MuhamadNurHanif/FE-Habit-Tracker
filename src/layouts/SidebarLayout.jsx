import React from "react"
import { Outlet, Link, useLocation } from "react-router-dom"
import AppSidebar from "@/components/AppSidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function SidebarLayout() {
  const { pathname } = useLocation()
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto">
          <header className="flex items-center justify-between p-4 border-b">
            <nav className="text-sm">
              <Link to="/" className="hover:underline">Dashboard</Link>
              <span className="mx-2">/</span>
              {pathname.startsWith("/habits") ? (
                <Link to="/habits" className="hover:underline">Habits</Link>
              ) : null}
            </nav>
          </header>
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
