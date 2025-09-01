import React from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function AppSidebar() {
  const { pathname } = useLocation()
  const item = (to, label) => (
    <Link
      to={to}
      className={cn(
        "block rounded-xl px-3 py-2 text-sm hover:bg-gray-100",
        pathname === to && "bg-gray-100 font-semibold"
      )}
    >
      {label}
    </Link>
  )

  return (
    <aside className="w-64 border-r p-4 flex flex-col gap-2">
      <div className="text-lg font-bold mb-2">Habit Tracker</div>
      {item("/", "Dashboard")}
      {item("/habits", "Habits")}
      <Link to="/habits/new">
        <Button className="mt-4 w-full">+ New Habit</Button>
      </Link>
      <div className="mt-auto text-xs text-gray-500">v1.0</div>
    </aside>
  )
}