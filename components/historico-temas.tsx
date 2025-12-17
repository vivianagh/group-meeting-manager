"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CheckCircle2, Calendar, Users, ChevronDown, ChevronUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"

const temasCerrados = [
  {
    id: "1",
    nombre: "Renovación de licencias de software",
    descripcion:
      "Se evaluaron diferentes opciones de licenciamiento para el equipo. Finalmente se decidió renovar las licencias actuales con un descuento del 15% por renovación anticipada.",
    importancia: "media",
    fecha_cierre: "2024-01-10",
    responsables: ["JD", "AL"],
    duracion_dias: 15,
    acciones_completadas: 5,
  },
  {
    id: "2",
    nombre: "Contratación de nuevo desarrollador",
    descripcion:
      "Proceso completo de reclutamiento para posición senior de desarrollo backend. Se entrevistaron 12 candidatos y se seleccionó al mejor perfil que se incorporará en febrero.",
    importancia: "alta",
    fecha_cierre: "2024-01-08",
    responsables: ["RP"],
    duracion_dias: 30,
    acciones_completadas: 8,
  },
  {
    id: "3",
    nombre: "Actualización del sitio web corporativo",
    descripcion:
      "Rediseño completo de la página web incluyendo nueva identidad visual, optimización SEO y mejora de velocidad de carga. Implementación exitosa con mejora del 40% en métricas de rendimiento.",
    importancia: "media",
    fecha_cierre: "2024-01-05",
    responsables: ["MS", "JD"],
    duracion_dias: 45,
    acciones_completadas: 12,
  },
  {
    id: "4",
    nombre: "Planificación evento anual",
    descripcion:
      "Organización del evento anual de la empresa para 200 personas. Se coordinó venue, catering, actividades y logística completa. Evento realizado exitosamente con excelente feedback.",
    importancia: "baja",
    fecha_cierre: "2024-01-03",
    responsables: ["AL", "MS"],
    duracion_dias: 20,
    acciones_completadas: 6,
  },
  {
    id: "5",
    nombre: "Migración de servidores",
    descripcion:
      "Migración completa de infraestructura a nuevos servidores cloud con mejor capacidad y redundancia. Se realizó sin interrupciones del servicio durante el proceso de 3 fases.",
    importancia: "alta",
    fecha_cierre: "2023-12-28",
    responsables: ["JD"],
    duracion_dias: 60,
    acciones_completadas: 15,
  },
]

const importanciaColors = {
  alta: "destructive",
  media: "default",
  baja: "secondary",
} as const

export function HistoricoTemas() {
  const [expandedTemas, setExpandedTemas] = useState<Set<string>>(new Set())

  const toggleExpanded = (temaId: string) => {
    setExpandedTemas((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(temaId)) {
        newSet.delete(temaId)
      } else {
        newSet.add(temaId)
      }
      return newSet
    })
  }

  return (
    <div className="space-y-4">
      {/* Búsqueda */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar temas cerrados..." className="pl-10" />
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas rápidas */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total cerrados</p>
                <p className="text-2xl font-bold mt-1">{temasCerrados.length}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Este mes</p>
                <p className="text-2xl font-bold mt-1">4</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Duración media</p>
                <p className="text-2xl font-bold mt-1">34 días</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de temas cerrados */}
      <div className="space-y-3">
        {temasCerrados.map((tema) => {
          const isExpanded = expandedTemas.has(tema.id)

          return (
            <Card key={tema.id} className="hover:bg-accent/50 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-green-50 dark:bg-green-950/30 rounded-lg flex-shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="font-semibold mb-2">{tema.nombre}</h3>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant={importanciaColors[tema.importancia]} className="text-xs">
                            {tema.importancia.charAt(0).toUpperCase() + tema.importancia.slice(1)}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            Cerrado
                          </Badge>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <p className="text-sm text-muted-foreground">Cerrado</p>
                        <p className="text-sm font-medium">
                          {new Date(tema.fecha_cierre).toLocaleDateString("es-ES", {
                            day: "numeric",
                            month: "short",
                          })}
                        </p>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="mb-4 p-3 bg-muted/30 rounded-lg border">
                        <p className="text-sm text-muted-foreground leading-relaxed">{tema.descripcion}</p>
                      </div>
                    )}

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>Duración: {tema.duracion_dias} días</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>{tema.acciones_completadas} acciones completadas</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Responsables:</span>
                        <div className="flex -space-x-2">
                          {tema.responsables.map((responsable, idx) => (
                            <Avatar key={idx} className="h-6 w-6 border-2 border-background">
                              <AvatarFallback className="text-xs">{responsable}</AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                      </div>

                      <Button variant="ghost" size="sm" onClick={() => toggleExpanded(tema.id)} className="h-8 text-xs">
                        {isExpanded ? (
                          <>
                            <ChevronUp className="h-4 w-4 mr-1" />
                            Ocultar descripción
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4 mr-1" />
                            Ver descripción completa
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
