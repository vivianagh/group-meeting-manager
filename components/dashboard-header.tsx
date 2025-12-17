"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Calendar, LogOut, Settings, Users, PlayCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function DashboardHeader() {
  const router = useRouter()

  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Calendar className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">Reuniones</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
                Dashboard
              </Link>
              <Link
                href="/dashboard/historico"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Histórico
              </Link>
              <Link
                href="/dashboard/reuniones"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Reuniones
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="relative bg-transparent">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground flex items-center justify-center">
                3
              </span>
            </Button>

            <Button onClick={() => router.push("/dashboard/reuniones/activa")}>
              <PlayCircle className="h-4 w-4 mr-2" />
              Iniciar Reunión
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Juan Pérez</span>
                    <span className="text-xs text-muted-foreground">juan@empresa.com</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Users className="mr-2 h-4 w-4" />
                  <span>Mi Equipo</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configuración</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
