"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Users, ChevronRight, Building2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock data - en producción vendría de la base de datos
const gruposUsuario = [
  {
    id: "1",
    nombre: "Equipo de Dirección",
    descripcion: "Desarrollo y estrategia de producto",
    miembros: 8,
    temasActivos: 5,
    reunionProxima: "Lunes 9:00 AM",
    rol: "Miembro",
  },
  {
    id: "2",
    nombre: "Equipo de IT",
    descripcion: "Infraestructura y tecnología",
    miembros: 6,
    temasActivos: 3,
    reunionProxima: "Martes 2:00 PM",
    rol: "Líder",
  },
  {
    id: "3",
    nombre: "Equipo de Business",
    descripcion: "Ventas y desarrollo de negocio",
    miembros: 12,
    temasActivos: 7,
    reunionProxima: "Miércoles 10:00 AM",
    rol: "Miembro",
  },
]

export default function GruposPage() {
  const router = useRouter()
  const [selectedGrupo, setSelectedGrupo] = useState<string | null>(null)

  const handleSelectGrupo = (grupoId: string) => {
    setSelectedGrupo(grupoId)
    // Guardar el grupo seleccionado en localStorage o estado global
    localStorage.setItem("grupoActivo", grupoId)
    // Redirigir al dashboard
    setTimeout(() => {
      router.push("/dashboard")
    }, 300)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Building2 className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Selecciona un Grupo</h1>
          <p className="text-muted-foreground">Elige el grupo de trabajo con el que deseas trabajar</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {gruposUsuario.map((grupo) => (
            <Card
              key={grupo.id}
              className={`cursor-pointer transition-all hover:shadow-lg hover:border-primary ${
                selectedGrupo === grupo.id ? "border-primary shadow-lg" : ""
              }`}
              onClick={() => handleSelectGrupo(grupo.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <Badge variant={grupo.rol === "Líder" ? "default" : "secondary"}>{grupo.rol}</Badge>
                </div>
                <CardTitle className="text-lg">{grupo.nombre}</CardTitle>
                <CardDescription className="text-sm">{grupo.descripcion}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Miembros</span>
                    <span className="font-medium">{grupo.miembros}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Temas activos</span>
                    <span className="font-medium">{grupo.temasActivos}</span>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground">Próxima reunión</p>
                    <p className="text-sm font-medium">{grupo.reunionProxima}</p>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Solo puedes ver y gestionar los temas de los grupos a los que perteneces
          </p>
        </div>
      </div>
    </div>
  )
}
