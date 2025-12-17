"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, ArrowLeft } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import Link from "next/link"

export function NuevoTemaForm() {
  const [fecha, setFecha] = useState<Date>()
  const [nombre, setNombre] = useState("")
  const [importancia, setImportancia] = useState("")
  const [responsables, setResponsables] = useState("")
  const [decisiones, setDecisiones] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Crear tema:", {
      nombre,
      importancia,
      fecha,
      responsables,
      decisiones,
    })
    // Redirect to dashboard after creation
  }

  return (
    <div>
      <Link href="/dashboard">
        <Button variant="ghost" size="sm" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver al Dashboard
        </Button>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Información del Tema</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre del tema *</Label>
              <Input
                id="nombre"
                placeholder="Ej: Implementación de nuevo sistema CRM"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="importancia">Nivel de importancia *</Label>
                <Select value={importancia} onValueChange={setImportancia} required>
                  <SelectTrigger id="importancia">
                    <SelectValue placeholder="Seleccionar..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alta">Alta</SelectItem>
                    <SelectItem value="media">Media</SelectItem>
                    <SelectItem value="baja">Baja</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Fecha límite *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {fecha ? format(fecha, "PP", { locale: es }) : "Seleccionar fecha"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={fecha} onSelect={setFecha} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="responsables">Responsables</Label>
              <Input
                id="responsables"
                placeholder="Nombres o iniciales separados por comas"
                value={responsables}
                onChange={(e) => setResponsables(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Ej: Juan Pérez, María Sánchez</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="decisiones">Decisiones iniciales (opcional)</Label>
              <Textarea
                id="decisiones"
                placeholder="Describe cualquier decisión ya tomada relacionada con este tema..."
                value={decisiones}
                onChange={(e) => setDecisiones(e.target.value)}
                rows={4}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Link href="/dashboard" className="flex-1">
                <Button type="button" variant="outline" className="w-full bg-transparent">
                  Cancelar
                </Button>
              </Link>
              <Button type="submit" className="flex-1">
                Crear Tema
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
