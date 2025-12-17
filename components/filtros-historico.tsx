"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, X } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export function FiltrosHistorico() {
  const [importancia, setImportancia] = useState({
    alta: false,
    media: false,
    baja: false,
  })
  const [fechaDesde, setFechaDesde] = useState<Date>()
  const [fechaHasta, setFechaHasta] = useState<Date>()

  const limpiarFiltros = () => {
    setImportancia({ alta: false, media: false, baja: false })
    setFechaDesde(undefined)
    setFechaHasta(undefined)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Filtros</CardTitle>
          <Button variant="ghost" size="sm" onClick={limpiarFiltros}>
            <X className="h-4 w-4 mr-1" />
            Limpiar
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Importancia */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Importancia</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="alta"
                checked={importancia.alta}
                onCheckedChange={(checked) =>
                  setImportancia({
                    ...importancia,
                    alta: checked as boolean,
                  })
                }
              />
              <label htmlFor="alta" className="text-sm cursor-pointer">
                Alta
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="media"
                checked={importancia.media}
                onCheckedChange={(checked) =>
                  setImportancia({
                    ...importancia,
                    media: checked as boolean,
                  })
                }
              />
              <label htmlFor="media" className="text-sm cursor-pointer">
                Media
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="baja"
                checked={importancia.baja}
                onCheckedChange={(checked) =>
                  setImportancia({
                    ...importancia,
                    baja: checked as boolean,
                  })
                }
              />
              <label htmlFor="baja" className="text-sm cursor-pointer">
                Baja
              </label>
            </div>
          </div>
        </div>

        {/* Rango de fechas */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Fecha de cierre</Label>

          <div className="space-y-2">
            <div>
              <Label className="text-xs text-muted-foreground">Desde</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal mt-1 bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {fechaDesde ? format(fechaDesde, "PP", { locale: es }) : "Seleccionar"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={fechaDesde} onSelect={setFechaDesde} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">Hasta</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal mt-1 bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {fechaHasta ? format(fechaHasta, "PP", { locale: es }) : "Seleccionar"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={fechaHasta} onSelect={setFechaHasta} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        <Button className="w-full">Aplicar Filtros</Button>
      </CardContent>
    </Card>
  )
}
