"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { FileText, MessageSquare, Plus } from "lucide-react"

interface Decision {
  id: string
  texto: string
  fecha: string
  autor: string
}

interface TemaDecisionesProps {
  decisiones: Decision[]
  temaId: string
  fromReunion?: boolean
}

export function TemaDecisiones({ decisiones: decisionesIniciales, temaId, fromReunion = false }: TemaDecisionesProps) {
  const [decisiones, setDecisiones] = useState<Decision[]>(decisionesIniciales)
  const [isAdding, setIsAdding] = useState(false)
  const [nuevaDecision, setNuevaDecision] = useState("")
  const [notasDecision, setNotasDecision] = useState<Record<string, string>>({})
  const [editandoNota, setEditandoNota] = useState<string | null>(null)

  const handleAdd = () => {
    if (nuevaDecision.trim()) {
      const nuevaDecisionObj: Decision = {
        id: Date.now().toString(),
        texto: nuevaDecision,
        fecha: new Date().toISOString(),
        autor: "JD",
      }

      setDecisiones([nuevaDecisionObj, ...decisiones])
      setNuevaDecision("")
      setIsAdding(false)
    }
  }

  const handleAddNota = (decisionId: string) => {
    if (notasDecision[decisionId]?.trim()) {
      setEditandoNota(null)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Decisiones</CardTitle>
            <CardDescription>Decisiones tomadas en reuniones anteriores</CardDescription>
          </div>
          {fromReunion && !isAdding && (
            <Button size="sm" onClick={() => setIsAdding(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Añadir decisión
            </Button>
          )}
          {!fromReunion && (
            <p className="text-xs text-muted-foreground">Solo se pueden añadir decisiones durante una reunión</p>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isAdding && (
            <div className="p-4 border-2 border-dashed rounded-lg space-y-3">
              <Textarea
                placeholder="Escribe la decisión tomada..."
                value={nuevaDecision}
                onChange={(e) => setNuevaDecision(e.target.value)}
                rows={3}
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
                    setNuevaDecision("")
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}

          {decisiones.length === 0 && !isAdding ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">No hay decisiones registradas aún</p>
            </div>
          ) : (
            decisiones.map((decision) => (
              <div key={decision.id} className="p-4 border rounded-lg bg-muted/30 space-y-3">
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback className="text-xs">{decision.autor}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm leading-relaxed">{decision.texto}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <span className="font-medium">{decision.autor}</span>
                      <span>•</span>
                      <span>{new Date(decision.fecha).toLocaleDateString("es-ES")}</span>
                    </div>
                  </div>
                </div>

                <div className="ml-11 space-y-2">
                  {editandoNota === decision.id ? (
                    <div className="space-y-2">
                      <Input
                        placeholder="Añadir nota a esta decisión..."
                        value={notasDecision[decision.id] || ""}
                        onChange={(e) => setNotasDecision({ ...notasDecision, [decision.id]: e.target.value })}
                      />
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleAddNota(decision.id)}>
                          Guardar nota
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => setEditandoNota(null)}>
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 text-xs"
                      onClick={() => setEditandoNota(decision.id)}
                    >
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Añadir nota
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
