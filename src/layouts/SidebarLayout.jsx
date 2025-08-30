// src/layouts/SidebarLayout.jsx
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function SidebarLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1">
        {/* tombol untuk toggle sidebar */}
        <SidebarTrigger />
        <div className="p-6">{children}</div>
      </main>
    </SidebarProvider>
  )
}