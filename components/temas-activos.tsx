"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, Plus, ArrowRight, AlertCircle } from "lucide-react"
import Link from "next/link"

const temasData = [
  {
    id: "1",
    nombre: "Implementación de nuevo sistema CRM",
    importancia: "alta",
    fecha_limite: "2024-01-15",
    responsables: ["JD", "MS"],
    estado: "siguiente-reunion",
    acciones_pendientes: 3,
    decisiones: 2,
  },
  {
    id: "2",
    nombre: "Actualización de políticas de seguridad",
    importancia: "alta",
    fecha_limite: "2024-01-10",
    responsables: ["AL"],
    estado: "abierto",
    acciones_pendientes: 5,
    decisiones: 1,
  },
  {
    id: "3",
    nombre: "Planificación Q1 2024",
    importancia: "media",
    fecha_limite: "2024-01-20",
    responsables: ["RP", "JD"],
    estado: "siguiente-reunion",
    acciones_pendientes: 2,
    decisiones: 3,
  },
  {
    id: "4",
    nombre: "Migración a la nube",
    importancia: "media",
    fecha_limite: "2024-02-01",
    responsables: ["MS", "AL"],
    estado: "abierto",
    acciones_pendientes: 7,
    decisiones: 0,
  },
]

const importanciaColors = {
  alta: "destructive",
  media: "default",
  baja: "secondary",
} as const

const estadoLabels = {
  abierto: "Abierto",
  "siguiente-reunion": "Próxima reunión",
  cerrado: "Cerrado",
}

export function TemasActivos() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Temas a tratar</CardTitle>
            <CardDescription>Temas abiertos con acciones pendientes</CardDescription>
          </div>
          <Link href="/dashboard/temas/nuevo">
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Tema
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {temasData.map((tema) => (
            <Link key={tema.id} href={`/dashboard/temas/${tema.id}`}>
              <div className="p-4 border rounded-lg hover:bg-accent transition-colors cursor-pointer group">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                        {tema.nombre}
                      </h3>
                      {tema.estado === "siguiente-reunion" && (
                        <Badge variant="outline" className="text-xs">
                          <Calendar className="h-3 w-3 mr-1" />
                          Próxima reunión
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        <span>{tema.acciones_pendientes} acciones pendientes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>Vence {new Date(tema.fecha_limite).toLocaleDateString("es-ES")}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-3">
                      <Badge variant={importanciaColors[tema.importancia]} className="text-xs">
                        {tema.importancia.charAt(0).toUpperCase() + tema.importancia.slice(1)}
                      </Badge>
                      <div className="flex -space-x-2">
                        {tema.responsables.map((responsable, idx) => (
                          <Avatar key={idx} className="h-6 w-6 border-2 border-background">
                            <AvatarFallback className="text-xs">{responsable}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    </div>
                  </div>

                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
