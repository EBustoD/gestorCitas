"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Calendar, Home, Users } from "lucide-react"

interface SidebarProps {
  isMobile?: boolean
}

export function Sidebar({ isMobile = false }: SidebarProps) {
  const pathname = usePathname()

  const links = [
    {
      name: "Panel",
      href: "/dashboard",
      icon: Home,
    },
    {
      name: "Calendario",
      href: "/dashboard/calendar",
      icon: Calendar,
    },
    {
      name: "Clientes",
      href: "/dashboard/clients",
      icon: Users,
    },
  ]

  return (
    <aside className={cn("flex h-full w-64 flex-col border-r bg-white", isMobile && "w-full border-r-0")}>
      <div className="flex h-14 items-center border-b px-4">
        <h2 className="text-lg font-semibold">Gestor de Citas</h2>
      </div>
      <nav className="flex-1 space-y-1 p-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              pathname === link.href ? "bg-sky-50 text-sky-700" : "text-gray-700 hover:bg-gray-100",
            )}
          >
            <link.icon className="h-5 w-5" />
            {link.name}
          </Link>
        ))}
      </nav>
      <div className="border-t p-4">
        <div className="text-xs text-gray-500">© 2024 Gestor de Citas</div>
      </div>
    </aside>
  )
}

