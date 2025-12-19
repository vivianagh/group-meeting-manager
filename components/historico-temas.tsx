"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CheckCircle2, Calendar, Users, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

const temasCerrados = [
  {
    id: "1",
    nombre: "Renovación de licencias de software",
    descripcion:
      "Se evaluaron diferentes opciones de licenciamiento para el equipo. Finalmente se decidió renovar las licencias actuales con un descuento del 15% por renovación anticipada.",
    importancia: "media",
    fecha_cierre: "2024-01-10",
    responsables: [
      { iniciales: "JD", nombre: "Juan Pérez" },
      { iniciales: "AL", nombre: "Ana López" },
    ],
    decisiones: [
      { texto: "Renovar licencias actuales con Microsoft", autor: "JD", fecha: "2024-01-05" },
      { texto: "Negociar descuento del 15% por pago anticipado", autor: "AL", fecha: "2024-01-08" },
    ],
    acciones: [
      { descripcion: "Contactar con proveedor Microsoft", responsable: "JD", estado: "Realizada" },
      { descripcion: "Preparar orden de compra", responsable: "AL", estado: "Realizada" },
      { descripcion: "Renovar licencias para 50 usuarios", responsable: "JD", estado: "Realizada" },
    ],
    acciones_completadas: 3,
  },
  {
    id: "2",
    nombre: "Contratación de nuevo desarrollador",
    descripcion:
      "Proceso completo de reclutamiento para posición senior de desarrollo backend. Se entrevistaron 12 candidatos y se seleccionó al mejor perfil que se incorporará en febrero.",
    importancia: "alta",
    fecha_cierre: "2024-01-08",
    responsables: [{ iniciales: "RP", nombre: "Roberto Pérez" }],
    decisiones: [
      { texto: "Contratar a Carlos Martínez como Senior Backend Developer", autor: "RP", fecha: "2024-01-08" },
      { texto: "Salario acordado: $85,000 anuales", autor: "RP", fecha: "2024-01-08" },
    ],
    acciones: [
      { descripcion: "Publicar vacante en LinkedIn y portales", responsable: "RP", estado: "Realizada" },
      { descripcion: "Realizar entrevistas técnicas", responsable: "RP", estado: "Realizada" },
      { descripcion: "Preparar oferta laboral", responsable: "RP", estado: "Realizada" },
      { descripcion: "Enviar contrato al candidato seleccionado", responsable: "RP", estado: "Realizada" },
    ],
    acciones_completadas: 4,
  },
  {
    id: "3",
    nombre: "Actualización del sitio web corporativo",
    descripcion:
      "Rediseño completo de la página web incluyendo nueva identidad visual, optimización SEO y mejora de velocidad de carga. Implementación exitosa con mejora del 40% en métricas de rendimiento.",
    importancia: "media",
    fecha_cierre: "2024-01-05",
    responsables: [
      { iniciales: "MS", nombre: "María Sánchez" },
      { iniciales: "JD", nombre: "Juan Pérez" },
    ],
    decisiones: [
      { texto: "Usar Next.js como framework principal", autor: "JD", fecha: "2023-12-15" },
      { texto: "Implementar nueva identidad visual", autor: "MS", fecha: "2023-12-20" },
      { texto: "Migrar hosting a Vercel", autor: "JD", fecha: "2023-12-28" },
    ],
    acciones: [
      { descripcion: "Diseñar wireframes y mockups", responsable: "MS", estado: "Realizada" },
      { descripcion: "Desarrollar frontend con Next.js", responsable: "JD", estado: "Realizada" },
      { descripcion: "Optimizar SEO y performance", responsable: "JD", estado: "Realizada" },
      { descripcion: "Realizar pruebas y QA", responsable: "MS", estado: "Realizada" },
      { descripcion: "Deploy a producción", responsable: "JD", estado: "Realizada" },
    ],
    acciones_completadas: 5,
  },
  {
    id: "4",
    nombre: "Planificación evento anual",
    descripcion:
      "Organización del evento anual de la empresa para 200 personas. Se coordinó venue, catering, actividades y logística completa. Evento realizado exitosamente con excelente feedback.",
    importancia: "baja",
    fecha_cierre: "2024-01-03",
    responsables: [
      { iniciales: "AL", nombre: "Ana López" },
      { iniciales: "MS", nombre: "María Sánchez" },
    ],
    decisiones: [
      { texto: "Realizar evento en Hotel Grand Plaza", autor: "AL", fecha: "2023-12-10" },
      { texto: "Contratar catering premium para 200 personas", autor: "MS", fecha: "2023-12-12" },
    ],
    acciones: [
      { descripcion: "Reservar venue para 200 personas", responsable: "AL", estado: "Realizada" },
      { descripcion: "Coordinar catering y menú", responsable: "MS", estado: "Realizada" },
      { descripcion: "Preparar actividades y agenda", responsable: "AL", estado: "Realizada" },
    ],
    acciones_completadas: 3,
  },
  {
    id: "5",
    nombre: "Migración de servidores",
    descripcion:
      "Migración completa de infraestructura a nuevos servidores cloud con mejor capacidad y redundancia. Se realizó sin interrupciones del servicio durante el proceso de 3 fases.",
    importancia: "alta",
    fecha_cierre: "2023-12-28",
    responsables: [{ iniciales: "JD", nombre: "Juan Pérez" }],
    decisiones: [
      { texto: "Migrar a AWS con arquitectura multi-región", autor: "JD", fecha: "2023-11-15" },
      { texto: "Implementar backup automático diario", autor: "JD", fecha: "2023-11-20" },
    ],
    acciones: [
      { descripcion: "Planificar arquitectura cloud", responsable: "JD", estado: "Realizada" },
      { descripcion: "Configurar servidores AWS", responsable: "JD", estado: "Realizada" },
      { descripcion: "Realizar migración fase 1", responsable: "JD", estado: "Realizada" },
      { descripcion: "Realizar migración fase 2", responsable: "JD", estado: "Realizada" },
      { descripcion: "Realizar migración fase 3 y validación", responsable: "JD", estado: "Realizada" },
    ],
    acciones_completadas: 5,
  },
]

const importanciaColors = {
  alta: "destructive",
  media: "default",
  baja: "secondary",
} as const

export function HistoricoTemas() {
  const [selectedTema, setSelectedTema] = useState<(typeof temasCerrados)[0] | null>(null)

  return (
    <div className="space-y-4">
      {/* Búsqueda */}
      <Card className="border-border/50">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar temas cerrados..." className="pl-10" />
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas rápidas */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-border/50">
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

        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Este mes</p>
                <p className="text-2xl font-bold mt-1">4</p>
              </div>
              <Calendar className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de temas cerrados - ahora clicables para abrir modal */}
      <div className="space-y-3">
        {temasCerrados.map((tema) => {
          return (
            <Card
              key={tema.id}
              className="hover:bg-accent/50 transition-colors cursor-pointer border-border/50"
              onClick={() => setSelectedTema(tema)}
            >
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

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
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
                              <AvatarFallback className="text-xs">{responsable.iniciales}</AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Dialog open={!!selectedTema} onOpenChange={(open) => !open && setSelectedTema(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedTema && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                  {selectedTema.nombre}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Badges de estado */}
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant={importanciaColors[selectedTema.importancia]}>
                    Importancia: {selectedTema.importancia.charAt(0).toUpperCase() + selectedTema.importancia.slice(1)}
                  </Badge>
                  <Badge variant="outline">Cerrado</Badge>
                  <Badge variant="secondary">
                    {new Date(selectedTema.fecha_cierre).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </Badge>
                </div>

                {/* Descripción */}
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2">Descripción</h3>
                  <p className="text-sm leading-relaxed p-4 bg-muted/30 rounded-lg border">
                    {selectedTema.descripcion}
                  </p>
                </div>

                {/* Responsables */}
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2">Responsables</h3>
                  <div className="flex items-center gap-3">
                    {selectedTema.responsables.map((responsable, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{responsable.iniciales}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{responsable.nombre}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Decisiones */}
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Decisiones Finales ({selectedTema.decisiones.length})
                  </h3>
                  <div className="space-y-2">
                    {selectedTema.decisiones.map((decision, idx) => (
                      <div key={idx} className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                        <p className="text-sm mb-2">{decision.texto}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>Por {decision.autor}</span>
                          <span>•</span>
                          <span>
                            {new Date(decision.fecha).toLocaleDateString("es-ES", {
                              day: "numeric",
                              month: "short",
                            })}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Acciones realizadas */}
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    Acciones Realizadas ({selectedTema.acciones.length})
                  </h3>
                  <div className="space-y-2">
                    {selectedTema.acciones.map((accion, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 bg-green-50/50 dark:bg-green-950/20 border border-green-200/50 dark:border-green-800/50 rounded-lg"
                      >
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm mb-1">{accion.descripcion}</p>
                          <p className="text-xs text-muted-foreground">Responsable: {accion.responsable}</p>
                        </div>
                        <Badge
                          variant="secondary"
                          className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                        >
                          {accion.estado}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
