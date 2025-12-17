"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowLeft, Calendar, LayoutDashboard, MoreVertical, Trash2, Video } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

interface TemaHeaderProps {
  tema: {
    id: string
    nombre: string
    importancia: string
    estado: string
  }
}

const importanciaColors = {
  alta: "destructive",
  media: "default",
  baja: "secondary",
} as const

const estadoConfig = {
  abierto: { label: "Abierto", variant: "outline" as const },
  "siguiente-reunion": { label: "Próxima reunión", variant: "default" as const },
  cerrado: { label: "Cerrado", variant: "secondary" as const },
}

export function TemaHeader({ tema }: TemaHeaderProps) {
  const searchParams = useSearchParams()
  const fromReunion = searchParams.get("from") === "reunion"

  return (
    <div>
      <Link href={fromReunion ? "/dashboard/reuniones/activa" : "/dashboard"}>
        <Button variant="ghost" size="sm" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          {fromReunion ? (
            <>
              <Video className="h-4 w-4 mr-2" />
              Volver a Reunión en curso
            </>
          ) : (
            <>
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Volver al Dashboard
            </>
          )}
        </Button>
      </Link>

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight mb-3">{tema.nombre}</h1>

          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant={importanciaColors[tema.importancia as keyof typeof importanciaColors]}>
              Importancia: {tema.importancia.charAt(0).toUpperCase() + tema.importancia.slice(1)}
            </Badge>
            <Badge variant={estadoConfig[tema.estado as keyof typeof estadoConfig].variant}>
              {estadoConfig[tema.estado as keyof typeof estadoConfig].label}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Marcar para próxima reunión
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Editar tema</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Eliminar tema
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
