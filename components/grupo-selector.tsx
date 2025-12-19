"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data - en producción vendría de la base de datos
const gruposUsuario = [
  { id: "1", nombre: "Equipo de Dirección", rol: "Miembro" },
  { id: "2", nombre: "Equipo de IT", rol: "Líder" },
  { id: "3", nombre: "Equipo de Business", rol: "Miembro" },
]

export function GrupoSelector() {
  const [grupoActivo, setGrupoActivo] = useState(gruposUsuario[0])

  const handleCambiarGrupo = (grupo: (typeof gruposUsuario)[0]) => {
    setGrupoActivo(grupo)
    localStorage.setItem("grupoActivo", grupo.id)
    // Aquí recargarías los datos del nuevo grupo
    window.location.reload()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-64 justify-between bg-transparent">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium">{grupoActivo.nombre}</span>
              <span className="text-xs text-muted-foreground">{grupoActivo.rol}</span>
            </div>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        <DropdownMenuLabel>Cambiar grupo de trabajo</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {gruposUsuario.map((grupo) => (
          <DropdownMenuItem key={grupo.id} onClick={() => handleCambiarGrupo(grupo)} className="cursor-pointer">
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col">
                <span className="text-sm font-medium">{grupo.nombre}</span>
                <span className="text-xs text-muted-foreground">{grupo.rol}</span>
              </div>
              {grupoActivo.id === grupo.id && <Check className="h-4 w-4" />}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
