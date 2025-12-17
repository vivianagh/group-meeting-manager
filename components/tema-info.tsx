import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, AlertCircle } from "lucide-react"

interface TemaInfoProps {
  tema: {
    fecha_limite: string
    responsables: Array<{ iniciales: string; nombre: string }>
    acciones: Array<{ estado: string }>
  }
}

export function TemaInfo({ tema }: TemaInfoProps) {
  const accionesPendientes = tema.acciones.filter((a) => a.estado === "pendiente" || a.estado === "en-progreso").length
  const accionesCompletadas = tema.acciones.filter((a) => a.estado === "realizada").length

  const diasRestantes = Math.ceil(
    (new Date(tema.fecha_limite).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
  )

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Información del tema</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Fecha límite</p>
              <p className="text-sm text-muted-foreground">
                {new Date(tema.fecha_limite).toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              {diasRestantes > 0 && (
                <Badge variant="outline" className="mt-1 text-xs">
                  {diasRestantes} días restantes
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Users className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium mb-2">Responsables</p>
              <div className="space-y-2">
                {tema.responsables.map((responsable, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="text-xs">{responsable.iniciales}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">{responsable.nombre}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Progreso de acciones</p>
              <div className="mt-2 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Pendientes</span>
                  <span className="font-medium">{accionesPendientes}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Completadas</span>
                  <span className="font-medium">{accionesCompletadas}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
