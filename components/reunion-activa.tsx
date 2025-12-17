"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, Users, CheckCircle2, ArrowRight, FileText, Plus, History, AlertCircle, ArrowLeft } from "lucide-react"
import { TemaDecisiones } from "@/components/tema-decisiones"
import { TemaAcciones } from "@/components/tema-acciones"
import Link from "next/link"

const temasReunion = [
  {
    id: "1",
    nombre: "Implementación de nuevo sistema CRM",
    importancia: "alta",
    estado: "en-curso",
    responsables: ["JD", "MS"],
    decisiones: [
      {
        id: "1",
        texto: "Se ha decidido usar Salesforce como plataforma principal",
        fecha: "2024-01-05",
        autor: "JD",
      },
    ],
    acciones: [
      {
        id: "1",
        descripcion: "Revisar propuestas de proveedores",
        asignado: "MS",
        estado: "realizada",
        notas: "",
      },
      {
        id: "2",
        descripcion: "Preparar documento de requisitos técnicos",
        asignado: "JD",
        estado: "en-progreso",
        notas: "",
      },
    ],
  },
  {
    id: "3",
    nombre: "Planificación Q1 2024",
    importancia: "media",
    estado: "en-espera",
    responsables: ["RP", "JD"],
    decisiones: [],
    acciones: [
      {
        id: "1",
        descripcion: "Definir objetivos del trimestre",
        asignado: "RP",
        estado: "pendiente",
        notas: "",
      },
    ],
  },
]

export function ReunionActiva() {
  const [temaActual, setTemaActual] = useState(0)
  const [showFinalizarDialog, setShowFinalizarDialog] = useState(false)
  const [showNuevoTemaDialog, setShowNuevoTemaDialog] = useState(false)
  const [showHistoricoDialog, setShowHistoricoDialog] = useState(false)

  const tema = temasReunion[temaActual]
  const progreso = ((temaActual + 1) / temasReunion.length) * 100

  return (
    <div className="space-y-6">
      {/* Header de la reunión */}
      <Card className="border-2 border-primary">
        <CardHeader>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
                <Badge variant="destructive">Reunión en curso</Badge>
              </div>
              <CardTitle className="text-2xl">Reunión Semanal - {new Date().toLocaleDateString("es-ES")}</CardTitle>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-mono">45 min</span>
              </div>

              <Button variant="outline" size="sm" onClick={() => setShowHistoricoDialog(true)}>
                <History className="h-4 w-4 mr-2" />
                Ver Histórico
              </Button>

              <Button variant="outline" size="sm" onClick={() => setShowNuevoTemaDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Añadir Tema
              </Button>
              {/* </CHANGE> */}

              <Button variant="default" size="sm" onClick={() => setShowFinalizarDialog(true)}>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Finalizar Reunión
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Tema {temaActual + 1} de {temasReunion.length}
              </span>
              <span className="font-medium">{Math.round(progreso)}% completado</span>
            </div>
            <Progress value={progreso} className="h-2" />

            <div className="flex items-center gap-2 pt-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground mr-2">Asistentes:</span>
              <div className="flex -space-x-2">
                {["JD", "MS", "AL", "RP"].map((iniciales, idx) => (
                  <Avatar key={idx} className="h-6 w-6 border-2 border-background">
                    <AvatarFallback className="text-xs">{iniciales}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tema actual */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge>Tema {temaActual + 1}</Badge>
                <Badge variant={tema.importancia === "alta" ? "destructive" : "default"}>{tema.importancia}</Badge>
                <Badge variant="outline">{tema.estado}</Badge>
                {/* </CHANGE> */}
              </div>
              <CardTitle className="text-xl">{tema.nombre}</CardTitle>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                disabled={temaActual === 0}
                onClick={() => setTemaActual(Math.max(0, temaActual - 1))}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Anterior
              </Button>
              <Button
                disabled={temaActual === temasReunion.length - 1}
                onClick={() => setTemaActual(Math.min(temasReunion.length - 1, temaActual + 1))}
              >
                Siguiente
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>

          <CardDescription className="mt-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium">Cambiar estado del tema:</span>
              <Select defaultValue={tema.estado}>
                <SelectTrigger className="w-[180px] h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en-espera">En espera</SelectItem>
                  <SelectItem value="en-curso">En curso</SelectItem>
                  <SelectItem value="resuelto">Resuelto</SelectItem>
                  <SelectItem value="cerrado">Cerrado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardDescription>
          {/* </CHANGE> */}
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="acciones" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="acciones">Acciones</TabsTrigger>
              <TabsTrigger value="decisiones">Decisiones</TabsTrigger>
            </TabsList>

            <TabsContent value="acciones" className="mt-6">
              <TemaAcciones acciones={tema.acciones} temaId={tema.id} />
            </TabsContent>

            <TabsContent value="decisiones" className="mt-6">
              <TemaDecisiones decisiones={tema.decisiones} temaId={tema.id} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {showNuevoTemaDialog && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-lg w-full">
            <CardHeader>
              <CardTitle>Añadir Nuevo Tema</CardTitle>
              <CardDescription>Este tema se agregará a la lista general y a esta reunión</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nombre-tema">Nombre del tema</Label>
                <Input id="nombre-tema" placeholder="Ej: Revisión de presupuesto anual" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="descripcion-tema">Descripción</Label>
                <Textarea id="descripcion-tema" placeholder="Describe brevemente el tema..." rows={3} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="importancia">Importancia</Label>
                  <Select defaultValue="media">
                    <SelectTrigger id="importancia">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baja">Baja</SelectItem>
                      <SelectItem value="media">Media</SelectItem>
                      <SelectItem value="alta">Alta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="responsable">Responsable</Label>
                  <Select defaultValue="jd">
                    <SelectTrigger id="responsable">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jd">Juan Pérez</SelectItem>
                      <SelectItem value="ms">María Sánchez</SelectItem>
                      <SelectItem value="al">Ana López</SelectItem>
                      <SelectItem value="rp">Roberto Pérez</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => setShowNuevoTemaDialog(false)}
                >
                  Cancelar
                </Button>
                <Button className="flex-1" onClick={() => setShowNuevoTemaDialog(false)}>
                  Añadir Tema
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      {/* </CHANGE> */}

      {showHistoricoDialog && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Consultar Reuniones Anteriores</CardTitle>
              <CardDescription>Revisa decisiones y acciones de reuniones pasadas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Card className="border-muted">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base">Reunión Semanal - 15 de Enero 2024</CardTitle>
                        <CardDescription className="text-xs">1h 15min - 4 temas tratados</CardDescription>
                      </div>
                      <Button variant="ghost" size="sm">
                        Ver Detalles
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground text-xs">Decisiones</p>
                        <p className="font-semibold">5</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Acciones</p>
                        <p className="font-semibold">8</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Asistentes</p>
                        <p className="font-semibold">4</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-muted">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base">Reunión Semanal - 8 de Enero 2024</CardTitle>
                        <CardDescription className="text-xs">55min - 3 temas tratados</CardDescription>
                      </div>
                      <Button variant="ghost" size="sm">
                        Ver Detalles
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground text-xs">Decisiones</p>
                        <p className="font-semibold">3</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Acciones</p>
                        <p className="font-semibold">6</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Asistentes</p>
                        <p className="font-semibold">4</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => setShowHistoricoDialog(false)}
                >
                  Cerrar
                </Button>
                <Link href="/dashboard/historico" className="flex-1">
                  <Button className="w-full">Ver Todas las Reuniones</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      {/* </CHANGE> */}

      {/* Dialog de finalizar */}
      {showFinalizarDialog && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>Finalizar Reunión</CardTitle>
              <CardDescription>Revisa el resumen antes de cerrar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm p-3 bg-muted/50 rounded-lg">
                  <span className="text-muted-foreground">Temas tratados</span>
                  <span className="font-semibold">{temasReunion.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm p-3 bg-muted/50 rounded-lg">
                  <span className="text-muted-foreground">Duración</span>
                  <span className="font-semibold">45 minutos</span>
                </div>
                <div className="flex items-center justify-between text-sm p-3 bg-muted/50 rounded-lg">
                  <span className="text-muted-foreground">Nuevas decisiones</span>
                  <span className="font-semibold">3</span>
                </div>
                <div className="flex items-center justify-between text-sm p-3 bg-muted/50 rounded-lg">
                  <span className="text-muted-foreground">Nuevas acciones</span>
                  <span className="font-semibold">5</span>
                </div>
                <div className="flex items-center justify-between text-sm p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                  <span className="text-amber-700 dark:text-amber-400 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Temas que siguen abiertos
                  </span>
                  <span className="font-semibold text-amber-700 dark:text-amber-400">2</span>
                </div>
                {/* </CHANGE> */}
              </div>

              <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold mb-1 text-primary">Próxima reunión</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Se creará automáticamente la siguiente reunión. Los <strong>2 temas</strong> que continúan
                      abiertos pasarán al orden del día de la nueva reunión. El registro de esta reunión se conservará
                      en el histórico.
                    </p>
                  </div>
                </div>
              </div>
              {/* </CHANGE> */}

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => setShowFinalizarDialog(false)}
                >
                  Cancelar
                </Button>
                <Link href="/dashboard/reuniones/resumen" className="flex-1">
                  <Button className="w-full">Confirmar y Finalizar</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
