"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, Users, FileText, CheckCircle2, AlertCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

const reunionesAnteriores = [
  {
    id: "1",
    fecha: "2024-01-08",
    asistentes: [
      { iniciales: "JD", nombre: "Juan Pérez" },
      { iniciales: "MS", nombre: "María Sánchez" },
      { iniciales: "AL", nombre: "Ana López" },
      { iniciales: "RP", nombre: "Roberto Pérez" },
    ],
    temas: [
      {
        nombre: "Implementación de nuevo sistema CRM",
        decisiones: [
          { texto: "Usar Salesforce como plataforma principal", autor: "JD" },
          { texto: "Presupuesto aprobado: $50,000", autor: "RP" },
        ],
        acciones: [
          { descripcion: "Revisar propuestas de proveedores", responsable: "MS", estado: "Realizada" },
          { descripcion: "Preparar documento de requisitos técnicos", responsable: "JD", estado: "En Progreso" },
          { descripcion: "Coordinar reunión con equipo de IT", responsable: "JD", estado: "Pendiente" },
        ],
      },
      {
        nombre: "Planificación Q1 2024",
        decisiones: [{ texto: "Priorizar desarrollo de nuevas features", autor: "MS" }],
        acciones: [
          { descripcion: "Definir roadmap Q1", responsable: "MS", estado: "Realizada" },
          { descripcion: "Asignar recursos a proyectos", responsable: "RP", estado: "Realizada" },
        ],
      },
    ],
    temasTratados: 2,
    decisiones: 3,
  },
  {
    id: "2",
    fecha: "2024-01-01",
    asistentes: [
      { iniciales: "JD", nombre: "Juan Pérez" },
      { iniciales: "MS", nombre: "María Sánchez" },
      { iniciales: "AL", nombre: "Ana López" },
      { iniciales: "RP", nombre: "Roberto Pérez" },
    ],
    temas: [
      {
        nombre: "Renovación de licencias de software",
        decisiones: [
          { texto: "Renovar licencias Microsoft", autor: "JD" },
          { texto: "Negociar descuento del 15%", autor: "AL" },
        ],
        acciones: [
          { descripcion: "Contactar proveedor Microsoft", responsable: "JD", estado: "Realizada" },
          { descripcion: "Preparar orden de compra", responsable: "AL", estado: "Realizada" },
        ],
      },
      {
        nombre: "Actualización del sitio web",
        decisiones: [{ texto: "Usar Next.js para el rediseño", autor: "JD" }],
        acciones: [
          { descripcion: "Crear wireframes", responsable: "MS", estado: "Realizada" },
          { descripcion: "Desarrollar prototipo", responsable: "JD", estado: "Realizada" },
        ],
      },
    ],
    temasTratados: 2,
    decisiones: 4,
  },
  {
    id: "3",
    fecha: "2023-12-25",
    asistentes: [
      { iniciales: "JD", nombre: "Juan Pérez" },
      { iniciales: "MS", nombre: "María Sánchez" },
      { iniciales: "AL", nombre: "Ana López" },
    ],
    temas: [
      {
        nombre: "Planificación evento anual",
        decisiones: [
          { texto: "Evento en Hotel Grand Plaza", autor: "AL" },
          { texto: "Fecha: 15 de febrero", autor: "MS" },
        ],
        acciones: [
          { descripcion: "Reservar venue", responsable: "AL", estado: "Realizada" },
          { descripcion: "Coordinar catering", responsable: "MS", estado: "Realizada" },
        ],
      },
    ],
    temasTratados: 1,
    decisiones: 2,
  },
]

export function ReunionesAnteriores() {
  const [selectedReunion, setSelectedReunion] = useState<(typeof reunionesAnteriores)[0] | null>(null)

  return (
    <>
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-base">Reuniones Anteriores</CardTitle>
          <CardDescription>Consulta reuniones pasadas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {reunionesAnteriores.map((reunion) => (
              <div
                key={reunion.id}
                className="p-4 border border-border/50 rounded-lg hover:bg-accent transition-colors group cursor-pointer"
                onClick={() => setSelectedReunion(reunion)}
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      {new Date(reunion.fecha).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>{reunion.asistentes.length}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    <span>{reunion.temasTratados} temas</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>{reunion.decisiones} decisiones</span>
                  </div>
                </div>

                <Button variant="ghost" size="sm" className="w-full text-xs group-hover:bg-background">
                  Ver detalles
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedReunion} onOpenChange={(open) => !open && setSelectedReunion(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedReunion && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  Reunión Semanal -{" "}
                  {new Date(selectedReunion.fecha).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Asistentes */}
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Asistentes ({selectedReunion.asistentes.length})
                  </h3>
                  <div className="flex items-center gap-3 flex-wrap">
                    {selectedReunion.asistentes.map((asistente, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg border">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{asistente.iniciales}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{asistente.nombre}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Estadísticas */}
                <div className="grid grid-cols-3 gap-4">
                  <Card className="border-border/50">
                    <CardContent className="pt-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold">{selectedReunion.temasTratados}</p>
                        <p className="text-xs text-muted-foreground mt-1">Temas Tratados</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-border/50">
                    <CardContent className="pt-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary">{selectedReunion.decisiones}</p>
                        <p className="text-xs text-muted-foreground mt-1">Decisiones</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-border/50">
                    <CardContent className="pt-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">
                          {selectedReunion.temas.reduce((acc, tema) => acc + tema.acciones.length, 0)}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">Acciones</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Separator />

                {/* Temas tratados */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Temas Tratados</h3>
                  <div className="space-y-6">
                    {selectedReunion.temas.map((tema, index) => (
                      <div key={index}>
                        <div className="space-y-4">
                          <h4 className="font-semibold text-base">{tema.nombre}</h4>

                          {/* Decisiones */}
                          <div>
                            <h5 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4" />
                              Decisiones ({tema.decisiones.length})
                            </h5>
                            <div className="space-y-2">
                              {tema.decisiones.map((decision, idx) => (
                                <div key={idx} className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                                  <p className="text-sm mb-1">{decision.texto}</p>
                                  <p className="text-xs text-muted-foreground">Por {decision.autor}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Acciones */}
                          <div>
                            <h5 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                              <AlertCircle className="h-4 w-4" />
                              Acciones ({tema.acciones.length})
                            </h5>
                            <div className="space-y-2">
                              {tema.acciones.map((accion, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-start justify-between gap-3 p-3 bg-muted/30 border rounded-lg"
                                >
                                  <div className="flex-1">
                                    <p className="text-sm mb-1">{accion.descripcion}</p>
                                    <p className="text-xs text-muted-foreground">Responsable: {accion.responsable}</p>
                                  </div>
                                  <Badge
                                    variant={
                                      accion.estado === "Realizada"
                                        ? "secondary"
                                        : accion.estado === "En Progreso"
                                          ? "default"
                                          : "outline"
                                    }
                                    className="flex-shrink-0"
                                  >
                                    {accion.estado}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        {index < selectedReunion.temas.length - 1 && <Separator className="my-6" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
