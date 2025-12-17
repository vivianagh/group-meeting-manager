"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Plus, CheckCircle2, Clock, PlayCircle, XCircle, ListTodo, MessageSquare } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface Accion {
  id: string
  descripcion: string
  asignado: string
  estado: string
  notas: string
}

interface TemaAccionesProps {
  acciones: Accion[]
  temaId: string
}

const estadoConfig = {
  pendiente: {
    label: "Pendiente",
    variant: "outline" as const,
    icon: Clock,
    color: "text-slate-500",
  },
  "en-progreso": {
    label: "En Progreso",
    variant: "default" as const,
    icon: PlayCircle,
    color: "text-blue-600",
  },
  realizada: {
    label: "Realizada",
    variant: "secondary" as const,
    icon: CheckCircle2,
    color: "text-emerald-600",
  },
  cancelada: {
    label: "Cancelada",
    variant: "destructive" as const,
    icon: XCircle,
    color: "text-red-600",
  },
}

export function TemaAcciones({ acciones: accionesIniciales, temaId }: TemaAccionesProps) {
  const [acciones, setAcciones] = useState<Accion[]>(accionesIniciales)
  const [isAdding, setIsAdding] = useState(false)
  const [nuevaAccion, setNuevaAccion] = useState({
    descripcion: "",
    asignado: "",
  })
  const [editingNotes, setEditingNotes] = useState<string | null>(null)
  const [tempNotes, setTempNotes] = useState("")

  const handleAdd = () => {
    if (nuevaAccion.descripcion && nuevaAccion.asignado) {
      const nuevaAccionObj: Accion = {
        id: Date.now().toString(),
        descripcion: nuevaAccion.descripcion,
        asignado: nuevaAccion.asignado.toUpperCase(),
        estado: "pendiente",
        notas: "",
      }

      setAcciones([nuevaAccionObj, ...acciones])
      setNuevaAccion({ descripcion: "", asignado: "" })
      setIsAdding(false)
    }
  }

  const handleEstadoChange = (accionId: string, nuevoEstado: string) => {
    setAcciones(acciones.map((accion) => (accion.id === accionId ? { ...accion, estado: nuevoEstado } : accion)))
  }

  const handleSaveNotes = (accionId: string) => {
    setAcciones(acciones.map((accion) => (accion.id === accionId ? { ...accion, notas: tempNotes } : accion)))
    setEditingNotes(null)
    setTempNotes("")
  }

  const handleEditNotes = (accionId: string, currentNotes: string) => {
    setEditingNotes(accionId)
    setTempNotes(currentNotes)
  }

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-slate-900">Próximas Acciones</CardTitle>
            <CardDescription className="text-slate-600">Tareas para avanzar este tema</CardDescription>
          </div>
          {!isAdding && (
            <Button size="sm" onClick={() => setIsAdding(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Añadir acción
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {isAdding && (
            <div className="p-4 border-2 border-dashed border-slate-300 rounded-lg space-y-3">
              <Input
                placeholder="Descripción de la tarea..."
                value={nuevaAccion.descripcion}
                onChange={(e) =>
                  setNuevaAccion({
                    ...nuevaAccion,
                    descripcion: e.target.value,
                  })
                }
                className="border-slate-200"
              />
              <Input
                placeholder="Persona asignada (iniciales)..."
                value={nuevaAccion.asignado}
                onChange={(e) =>
                  setNuevaAccion({
                    ...nuevaAccion,
                    asignado: e.target.value,
                  })
                }
                maxLength={3}
                className="border-slate-200"
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700">
                  Guardar
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setIsAdding(false)
                    setNuevaAccion({ descripcion: "", asignado: "" })
                  }}
                  className="border-slate-200"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}

          {acciones.length === 0 && !isAdding ? (
            <div className="text-center py-8 text-slate-500">
              <ListTodo className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No hay acciones registradas aún</p>
            </div>
          ) : (
            acciones.map((accion) => {
              const config = estadoConfig[accion.estado as keyof typeof estadoConfig]
              const Icon = config.icon

              return (
                <div
                  key={accion.id}
                  className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-all bg-white"
                >
                  <div className="flex items-start gap-3">
                    <div className={`${config.color} p-2 rounded-lg bg-slate-50 flex-shrink-0 border border-slate-200`}>
                      <Icon className="h-4 w-4" />
                    </div>

                    <div className="flex-1 min-w-0 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-slate-900">{accion.descripcion}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6 border border-slate-200">
                          <AvatarFallback className="text-xs bg-blue-50 text-blue-700">
                            {accion.asignado}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-slate-600">Asignado a {accion.asignado}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-600">Estado:</span>
                        <Select value={accion.estado} onValueChange={(value) => handleEstadoChange(accion.id, value)}>
                          <SelectTrigger className="h-8 w-[160px] border-slate-200">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pendiente">
                              <div className="flex items-center gap-2">
                                <Clock className="h-3 w-3" />
                                Pendiente
                              </div>
                            </SelectItem>
                            <SelectItem value="en-progreso">
                              <div className="flex items-center gap-2">
                                <PlayCircle className="h-3 w-3" />
                                En Progreso
                              </div>
                            </SelectItem>
                            <SelectItem value="realizada">
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-3 w-3" />
                                Realizada
                              </div>
                            </SelectItem>
                            <SelectItem value="cancelada">
                              <div className="flex items-center gap-2">
                                <XCircle className="h-3 w-3" />
                                Cancelada
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        {editingNotes === accion.id ? (
                          <div className="space-y-2">
                            <Textarea
                              placeholder="Añadir notas..."
                              value={tempNotes}
                              onChange={(e) => setTempNotes(e.target.value)}
                              className="min-h-[60px] text-sm border-slate-200"
                            />
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => handleSaveNotes(accion.id)}
                                className="bg-blue-50 text-blue-700 hover:bg-blue-100"
                              >
                                Guardar
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setEditingNotes(null)
                                  setTempNotes("")
                                }}
                                className="border-slate-200"
                              >
                                Cancelar
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <>
                            {accion.notas && (
                              <div className="bg-blue-50 p-3 rounded border border-blue-100 text-xs text-slate-700">
                                <div className="flex items-start gap-2">
                                  <MessageSquare className="h-3 w-3 mt-0.5 flex-shrink-0 text-blue-600" />
                                  <p className="flex-1">{accion.notas}</p>
                                </div>
                              </div>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 text-xs text-slate-600 hover:text-slate-900"
                              onClick={() => handleEditNotes(accion.id, accion.notas)}
                            >
                              <MessageSquare className="h-3 w-3 mr-1" />
                              {accion.notas ? "Editar notas" : "Añadir notas"}
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </CardContent>
    </Card>
  )
}
