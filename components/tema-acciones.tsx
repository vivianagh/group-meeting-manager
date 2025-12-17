"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Plus, CheckCircle2, Clock, PlayCircle, XCircle, ListTodo } from "lucide-react"

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
    color: "text-muted-foreground",
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
    color: "text-green-600",
  },
  cancelada: {
    label: "Cancelada",
    variant: "destructive" as const,
    icon: XCircle,
    color: "text-destructive",
  },
}

export function TemaAcciones({ acciones: accionesIniciales, temaId }: TemaAccionesProps) {
  const [acciones, setAcciones] = useState<Accion[]>(accionesIniciales)
  const [isAdding, setIsAdding] = useState(false)
  const [nuevaAccion, setNuevaAccion] = useState({
    descripcion: "",
    asignado: "",
  })

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
      console.log("[v0] Action added:", nuevaAccionObj)
      setNuevaAccion({ descripcion: "", asignado: "" })
      setIsAdding(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Próximas Acciones</CardTitle>
            <CardDescription>Tareas para avanzar este tema</CardDescription>
          </div>
          {!isAdding && (
            <Button size="sm" onClick={() => setIsAdding(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Añadir acción
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {isAdding && (
            <div className="p-4 border-2 border-dashed rounded-lg space-y-3">
              <Input
                placeholder="Descripción de la tarea..."
                value={nuevaAccion.descripcion}
                onChange={(e) =>
                  setNuevaAccion({
                    ...nuevaAccion,
                    descripcion: e.target.value,
                  })
                }
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
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleAdd}>
                  Guardar
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setIsAdding(false)
                    setNuevaAccion({ descripcion: "", asignado: "" })
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}

          {acciones.length === 0 && !isAdding ? (
            <div className="text-center py-8 text-muted-foreground">
              <ListTodo className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">No hay acciones registradas aún</p>
            </div>
          ) : (
            acciones.map((accion) => {
              const config = estadoConfig[accion.estado as keyof typeof estadoConfig]
              const Icon = config.icon

              return (
                <div key={accion.id} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className={`${config.color} p-2 rounded-lg bg-muted flex-shrink-0`}>
                      <Icon className="h-4 w-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className="text-sm font-medium">{accion.descripcion}</p>
                        <Badge variant={config.variant} className="text-xs flex-shrink-0">
                          {config.label}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">{accion.asignado}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">Asignado a {accion.asignado}</span>
                      </div>

                      {accion.notas && <p className="text-xs text-muted-foreground mt-2 pl-8">{accion.notas}</p>}
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
