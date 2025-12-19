"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, Plus, ArrowRight, AlertCircle, ListPlus, X, CalendarCheck } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

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
    fecha_reunion: "2024-01-29",
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
    fecha_reunion: null,
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
    fecha_reunion: "2024-01-29",
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
    fecha_reunion: null,
  },
]

const reunionesProgramadas = [{ id: "1", fecha: "2024-01-29", temasCount: 2 }]

const importanciaColors = {
  alta: "destructive",
  media: "default",
  baja: "secondary",
} as const

export function TemasActivos() {
  const [selectedTema, setSelectedTema] = useState<string | null>(null)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [newMeetingDate, setNewMeetingDate] = useState("")

  const handleAddToMeeting = (temaId: string) => {
    if (reunionesProgramadas.length === 0) {
      // No hay reuniones programadas, mostrar date picker
      setShowDatePicker(true)
      setSelectedTema(temaId)
    } else {
      // Hay reuniones, mostrar opciones
      setSelectedTema(temaId)
      setShowDatePicker(false)
    }
  }

  const assignToMeeting = (meetingId: string | "new", customDate?: string) => {
    console.log("[v0] Assigning tema", selectedTema, "to meeting:", meetingId, customDate)
    setSelectedTema(null)
    setShowDatePicker(false)
    setNewMeetingDate("")
  }

  const removeFromMeeting = (temaId: string) => {
    console.log("[v0] Removing tema", temaId, "from meeting")
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Temas a tratar</CardTitle>
              <CardDescription>Gestiona los temas del grupo</CardDescription>
            </div>
            <Link href="/dashboard/temas/nuevo">
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Tema
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border-l-4 border-primary pl-4 -ml-4">
            <div className="flex items-center gap-2 mb-3">
              <CalendarCheck className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold">Temas de la próxima reunión</h3>
              <Badge variant="outline" className="text-xs">
                {temasData.filter((t) => t.estado === "siguiente-reunion").length} temas
              </Badge>
            </div>
            <div className="space-y-3">
              {temasData
                .filter((t) => t.estado === "siguiente-reunion")
                .map((tema) => (
                  <div key={tema.id} className="flex items-center gap-2">
                    <Link href={`/dashboard/temas/${tema.id}`} className="flex-1">
                      <div className="p-4 border rounded-lg hover:bg-accent transition-colors cursor-pointer group bg-background">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">
                                {tema.nombre}
                              </h4>
                              <Badge variant="default" className="text-xs bg-primary/10 text-primary border-primary/20">
                                <Calendar className="h-3 w-3 mr-1" />
                                {new Date(tema.fecha_reunion!).toLocaleDateString("es-ES", {
                                  day: "numeric",
                                  month: "short",
                                })}
                              </Badge>
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
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromMeeting(tema.id)}
                      className="flex-shrink-0 hover:bg-destructive/10 hover:text-destructive"
                      title="Quitar de la reunión"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-[#f8fafc] dark:bg-muted/30 p-4 rounded-lg -mx-6 px-6">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-sm font-semibold text-muted-foreground">Backlog de temas</h3>
              <Badge variant="secondary" className="text-xs">
                {temasData.filter((t) => t.estado === "abierto").length} temas
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Estos temas no están asignados a ninguna reunión. Agrégalos cuando estén listos para discutirse.
            </p>
            <div className="space-y-3">
              {temasData
                .filter((t) => t.estado === "abierto")
                .map((tema) => (
                  <div key={tema.id} className="flex items-center gap-2">
                    <div className="flex-1 p-4 border rounded-lg hover:bg-accent/50 transition-colors bg-background">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm mb-2">{tema.nombre}</h4>

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
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddToMeeting(tema.id)}
                      className="flex-shrink-0"
                    >
                      <ListPlus className="h-4 w-4 mr-1" />
                      Agregar a reunión
                    </Button>
                  </div>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedTema && showDatePicker && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>No hay reuniones programadas</CardTitle>
              <CardDescription>Crea una nueva reunión para asignar este tema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nueva-reunion-fecha">Fecha de la nueva reunión</Label>
                <Input
                  id="nueva-reunion-fecha"
                  type="date"
                  value={newMeetingDate}
                  onChange={(e) => setNewMeetingDate(e.target.value)}
                  className="w-full"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm">
                  Se creará una nueva reunión y este tema será agregado automáticamente al orden del día.
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedTema(null)
                    setShowDatePicker(false)
                    setNewMeetingDate("")
                  }}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={() => assignToMeeting("new", newMeetingDate)}
                  className="flex-1"
                  disabled={!newMeetingDate}
                >
                  Crear y Asignar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedTema && !showDatePicker && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>Agregar tema a reunión</CardTitle>
              <CardDescription>Selecciona a qué reunión deseas agregar este tema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {reunionesProgramadas.map((reunion) => (
                <Button
                  key={reunion.id}
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => assignToMeeting(reunion.id)}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Reunión del{" "}
                  {new Date(reunion.fecha).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                  <Badge variant="secondary" className="ml-auto">
                    {reunion.temasCount} temas
                  </Badge>
                </Button>
              ))}

              <Button
                variant="outline"
                className="w-full justify-start bg-transparent border-dashed"
                onClick={() => setShowDatePicker(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Crear nueva reunión
              </Button>

              <Button variant="ghost" className="w-full" onClick={() => setSelectedTema(null)}>
                Cancelar
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
