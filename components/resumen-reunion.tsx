"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, Calendar, Clock, Users, FileText, ArrowRight, Download } from "lucide-react"
import Link from "next/link"

const resumenData = {
  fecha: new Date().toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
  duracion: "45 minutos",
  asistentes: ["JD", "MS", "AL", "RP"],
  temasTratados: [
    {
      id: "1",
      nombre: "Implementación de nuevo sistema CRM",
      estado: "en-curso",
      importancia: "alta",
      nuevasDecisiones: 2,
      nuevasAcciones: 3,
    },
    {
      id: "2",
      nombre: "Planificación Q1 2024",
      estado: "en-curso",
      importancia: "media",
      nuevasDecisiones: 1,
      nuevasAcciones: 2,
    },
  ],
  proximaReunion: {
    fecha: "29 de Enero 2024",
    temasAgendados: 2,
  },
  estadisticas: {
    totalDecisiones: 3,
    totalAcciones: 5,
    temasAbiertos: 2,
    temasCerrados: 0,
  },
}

export function ResumenReunion() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header de éxito */}
      <Card className="border-2 border-green-500/20 bg-green-500/5">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <CardTitle className="text-2xl">Reunión Finalizada Exitosamente</CardTitle>
          <CardDescription className="text-base">
            La reunión ha sido cerrada y toda la información ha sido guardada
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Información general */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen General</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Fecha</p>
                <p className="text-sm font-semibold">{resumenData.fecha}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Duración</p>
                <p className="text-sm font-semibold">{resumenData.duracion}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <Users className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Asistentes</p>
                <div className="flex -space-x-2 mt-1">
                  {resumenData.asistentes.map((iniciales, idx) => (
                    <Avatar key={idx} className="h-6 w-6 border-2 border-background">
                      <AvatarFallback className="text-xs">{iniciales}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Temas Tratados</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{resumenData.temasTratados.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Nuevas Decisiones</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {resumenData.estadisticas.totalDecisiones}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Nuevas Acciones</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {resumenData.estadisticas.totalAcciones}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Temas Abiertos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">
              {resumenData.estadisticas.temasAbiertos}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Temas tratados */}
      <Card>
        <CardHeader>
          <CardTitle>Temas Tratados en esta Reunión</CardTitle>
          <CardDescription>Detalle de cada tema discutido</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {resumenData.temasTratados.map((tema, index) => (
            <div key={tema.id}>
              <div className="flex items-start justify-between gap-4 p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">Tema {index + 1}</Badge>
                    <Badge variant={tema.importancia === "alta" ? "destructive" : "default"}>{tema.importancia}</Badge>
                    <Badge variant="outline">{tema.estado}</Badge>
                  </div>
                  <h4 className="font-semibold mb-2">{tema.nombre}</h4>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>{tema.nuevasDecisiones} nuevas decisiones</span>
                    <span>{tema.nuevasAcciones} nuevas acciones</span>
                  </div>
                </div>
                <Link href={`/dashboard/temas/${tema.id}`}>
                  <Button variant="ghost" size="sm">
                    Ver Detalle
                  </Button>
                </Link>
              </div>
              {index < resumenData.temasTratados.length - 1 && <Separator className="my-4" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Próxima reunión */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Próxima Reunión Creada
              </CardTitle>
              <CardDescription className="mt-2">La siguiente reunión ha sido generada automáticamente</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 bg-background rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Fecha programada</p>
              <p className="font-semibold">{resumenData.proximaReunion.fecha}</p>
            </div>
            <div className="p-3 bg-background rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Temas en orden del día</p>
              <p className="font-semibold">{resumenData.proximaReunion.temasAgendados} temas abiertos</p>
            </div>
          </div>

          <div className="p-4 bg-background border border-primary/20 rounded-lg">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm leading-relaxed">
                Los <strong>{resumenData.estadisticas.temasAbiertos} temas</strong> que continúan en estado abierto han
                sido agregados automáticamente al orden del día de la próxima reunión.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Acciones */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="outline" className="flex-1 bg-transparent">
          <Download className="h-4 w-4 mr-2" />
          Descargar Acta
        </Button>
        <Link href="/dashboard/historico" className="flex-1">
          <Button variant="outline" className="w-full bg-transparent">
            <FileText className="h-4 w-4 mr-2" />
            Ver en Histórico
          </Button>
        </Link>
        <Link href="/dashboard" className="flex-1">
          <Button className="w-full">
            Volver al Dashboard
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
