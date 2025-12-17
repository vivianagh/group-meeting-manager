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
import { CalendarIcon, ArrowLeft, CheckCircle2 } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function NuevoTemaForm() {
  const router = useRouter()
  const [fecha, setFecha] = useState<Date>()
  const [nombre, setNombre] = useState("")
  const [importancia, setImportancia] = useState("")
  const [responsables, setResponsables] = useState("")
  const [decisiones, setDecisiones] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Crear tema:", {
      nombre,
      importancia,
      fecha,
      responsables,
      decisiones,
    })

    // Show success message
    setShowSuccess(true)

    // Redirect after 1.5 seconds
    setTimeout(() => {
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div>
      <Link href="/dashboard">
        <Button variant="ghost" size="sm" className="mb-6 text-slate-600 hover:text-slate-900">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver al Dashboard
        </Button>
      </Link>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-slate-900">Información del Tema</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="nombre" className="text-slate-700">
                Nombre del tema *
              </Label>
              <Input
                id="nombre"
                placeholder="Ej: Implementación de nuevo sistema CRM"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                className="border-slate-200"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="importancia" className="text-slate-700">
                  Nivel de importancia *
                </Label>
                <Select value={importancia} onValueChange={setImportancia} required>
                  <SelectTrigger id="importancia" className="border-slate-200">
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
                <Label className="text-slate-700">Fecha límite *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-transparent border-slate-200"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-slate-500" />
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
              <Label htmlFor="responsables" className="text-slate-700">
                Responsables
              </Label>
              <Input
                id="responsables"
                placeholder="Nombres o iniciales separados por comas"
                value={responsables}
                onChange={(e) => setResponsables(e.target.value)}
                className="border-slate-200"
              />
              <p className="text-xs text-slate-500">Ej: Juan Pérez, María Sánchez</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="decisiones" className="text-slate-700">
                Decisiones iniciales (opcional)
              </Label>
              <Textarea
                id="decisiones"
                placeholder="Describe cualquier decisión ya tomada relacionada con este tema..."
                value={decisiones}
                onChange={(e) => setDecisiones(e.target.value)}
                rows={4}
                className="border-slate-200"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Link href="/dashboard" className="flex-1">
                <Button type="button" variant="outline" className="w-full bg-transparent border-slate-200">
                  Cancelar
                </Button>
              </Link>
              <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                Crear Tema
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {showSuccess && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-sm w-full border-slate-200 shadow-lg">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="mx-auto w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-200">
                  <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Tema creado exitosamente</h3>
                  <p className="text-sm text-slate-600 mt-1">Redirigiendo al dashboard...</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
