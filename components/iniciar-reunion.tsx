"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, PlayCircle, GripVertical, Clock } from "lucide-react"
import Link from "next/link"

const asistentesDefault = [
  { id: "1", iniciales: "JD", nombre: "Juan Pérez", presente: true },
  { id: "2", iniciales: "MS", nombre: "María Sánchez", presente: true },
  { id: "3", iniciales: "AL", nombre: "Ana López", presente: true },
  { id: "4", iniciales: "RP", nombre: "Roberto Pérez", presente: true },
]

const temasOrdenDiaInicial = [
  {
    id: "1",
    nombre: "Implementación de nuevo sistema CRM",
    acciones_pendientes: 3,
    importancia: "alta",
  },
  {
    id: "3",
    nombre: "Planificación Q1 2024",
    acciones_pendientes: 2,
    importancia: "media",
  },
]

const ultimaReunion = {
  fecha: "2024-01-15",
  duracion: "1h 15min",
  temasTratados: 4,
  decisiones: 5,
  acciones: 8,
}

export function IniciarReunion() {
  const [asistentes, setAsistentes] = useState(asistentesDefault)
  const [temas, setTemas] = useState(temasOrdenDiaInicial)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const toggleAsistente = (id: string) => {
    setAsistentes(asistentes.map((a) => (a.id === id ? { ...a, presente: !a.presente } : a)))
  }

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === index) return

    const newTemas = [...temas]
    const draggedTema = newTemas[draggedIndex]
    newTemas.splice(draggedIndex, 1)
    newTemas.splice(index, 0, draggedTema)

    setTemas(newTemas)
    setDraggedIndex(index)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
    console.log(
      "[v0] New order:",
      temas.map((t, i) => `${i + 1}. ${t.nombre}`),
    )
  }

  return (
    <div className="space-y-6">
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-lg">Acceso Rápido - Última Reunión</CardTitle>
          <CardDescription>Consulta información de la reunión anterior</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Fecha</p>
              <p className="text-sm font-semibold">{new Date(ultimaReunion.fecha).toLocaleDateString("es-ES")}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Duración</p>
              <p className="text-sm font-semibold">{ultimaReunion.duracion}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Temas</p>
              <p className="text-sm font-semibold">{ultimaReunion.temasTratados}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Decisiones</p>
              <p className="text-sm font-semibold">{ultimaReunion.decisiones}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Acciones</p>
              <p className="text-sm font-semibold">{ultimaReunion.acciones}</p>
            </div>
          </div>
          <Link href="/dashboard/reuniones/ultima" className="mt-4 block">
            <Button variant="outline" size="sm" className="w-full sm:w-auto bg-transparent">
              Ver Detalles Completos
            </Button>
          </Link>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Nueva Reunión Semanal</CardTitle>
          <CardDescription>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Fecha:{" "}
              {new Date().toLocaleDateString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Asistentes */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-semibold">Asistentes</h3>
              <Badge variant="outline" className="ml-auto">
                {asistentes.filter((a) => a.presente).length} de {asistentes.length}
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground mb-3">
              Por defecto, todos los usuarios del grupo están seleccionados. Desmarca los que no asistirán.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {asistentes.map((asistente) => (
                <div
                  key={asistente.id}
                  className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent transition-colors"
                >
                  <Checkbox checked={asistente.presente} onCheckedChange={() => toggleAsistente(asistente.id)} />
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">{asistente.iniciales}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{asistente.nombre}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Orden del día */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-semibold">Orden del día</h3>
              <Badge variant="outline" className="ml-auto">
                {temas.length} temas
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground mb-3">
              Temas marcados como "Siguiente reunión". Arrastra para reordenar.
            </p>

            <div className="space-y-3">
              {temas.map((tema, index) => (
                <div
                  key={tema.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  className={`flex items-center gap-3 p-4 border rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-move ${
                    draggedIndex === index ? "opacity-50" : ""
                  }`}
                >
                  <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab active:cursor-grabbing" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-muted-foreground">#{index + 1}</span>
                      <h4 className="text-sm font-semibold">{tema.nombre}</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">{tema.acciones_pendientes} acciones pendientes</p>
                  </div>
                  <Badge variant={tema.importancia === "alta" ? "destructive" : "default"} className="flex-shrink-0">
                    {tema.importancia}
                  </Badge>
                </div>
              ))}
            </div>

            <p className="text-xs text-muted-foreground mt-3 flex items-center gap-2">
              <GripVertical className="h-4 w-4" />
              Arrastra los temas para cambiar el orden de discusión durante la reunión
            </p>
          </div>

          <Link href="/dashboard/reuniones/activa" className="block">
            <Button size="lg" className="w-full">
              <PlayCircle className="h-5 w-5 mr-2" />
              Iniciar Reunión
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
