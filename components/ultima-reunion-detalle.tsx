"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, Users, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react"
import Link from "next/link"

const ultimaReunionData = {
  fecha: "15 de Enero 2024",
  duracion: "1h 15min",
  asistentes: [
    { iniciales: "JD", nombre: "Juan Pérez" },
    { iniciales: "MS", nombre: "María Sánchez" },
    { iniciales: "AL", nombre: "Ana López" },
    { iniciales: "RP", nombre: "Roberto Pérez" },
  ],
  temas: [
    {
      id: "1",
      nombre: "Revisión de presupuesto Q4 2023",
      decisiones: [
        { texto: "Aprobar incremento del 10% para el área de marketing", autor: "JD" },
        { texto: "Congelar contrataciones hasta Q2 2024", autor: "MS" },
      ],
      acciones: [
        { descripcion: "Presentar propuesta detallada de marketing", responsable: "MS", estado: "realizada" },
        { descripcion: "Revisar estructura de costos actual", responsable: "JD", estado: "realizada" },
      ],
    },
    {
      id: "2",
      nombre: "Implementación de nuevo sistema CRM",
      decisiones: [{ texto: "Elegir Salesforce como plataforma principal", autor: "JD" }],
      acciones: [
        { descripcion: "Contactar proveedores certificados", responsable: "AL", estado: "en-progreso" },
        { descripcion: "Preparar documento de requisitos", responsable: "JD", estado: "pendiente" },
      ],
    },
  ],
  estadisticas: {
    totalDecisiones: 5,
    totalAcciones: 8,
    accionesCompletadas: 5,
    accionesPendientes: 3,
  },
}

export function UltimaReunionDetalle() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Última Reunión</h1>
          <p className="text-muted-foreground">Consulta las decisiones y acciones de la reunión anterior</p>
        </div>
        <Link href="/dashboard/reuniones">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
        </Link>
      </div>

      {/* Información general */}
      <Card>
        <CardHeader>
          <CardTitle>Reunión Semanal - {ultimaReunionData.fecha}</CardTitle>
          <CardDescription>Resumen general de la reunión</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Fecha</p>
                <p className="text-sm font-semibold">{ultimaReunionData.fecha}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Duración</p>
                <p className="text-sm font-semibold">{ultimaReunionData.duracion}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <Users className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Asistentes</p>
                <div className="flex -space-x-2 mt-1">
                  {ultimaReunionData.asistentes.map((asistente, idx) => (
                    <Avatar key={idx} className="h-6 w-6 border-2 border-background" title={asistente.nombre}>
                      <AvatarFallback className="text-xs">{asistente.iniciales}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Temas Tratados</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{ultimaReunionData.temas.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Decisiones</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {ultimaReunionData.estadisticas.totalDecisiones}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Acciones Realizadas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {ultimaReunionData.estadisticas.accionesCompletadas}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Acciones Pendientes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">
              {ultimaReunionData.estadisticas.accionesPendientes}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detalles de temas */}
      <Card>
        <CardHeader>
          <CardTitle>Temas Tratados</CardTitle>
          <CardDescription>Decisiones y acciones por cada tema</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {ultimaReunionData.temas.map((tema, index) => (
            <div key={tema.id}>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-3">{tema.nombre}</h3>

                  {/* Decisiones */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      Decisiones ({tema.decisiones.length})
                    </h4>
                    <div className="space-y-2">
                      {tema.decisiones.map((decision, idx) => (
                        <div key={idx} className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                          <p className="text-sm mb-1">{decision.texto}</p>
                          <p className="text-xs text-muted-foreground">Por {decision.autor}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Acciones */}
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      Próximas Acciones ({tema.acciones.length})
                    </h4>
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
                              accion.estado === "realizada"
                                ? "default"
                                : accion.estado === "en-progreso"
                                  ? "secondary"
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
              </div>
              {index < ultimaReunionData.temas.length - 1 && <Separator className="my-6" />}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
