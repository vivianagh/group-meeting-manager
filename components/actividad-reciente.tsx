import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CheckCircle2, Plus, Edit, Clock } from "lucide-react"

const actividades = [
  {
    tipo: "accion_completada",
    usuario: "MS",
    descripcion: "completó la acción",
    detalle: "Revisar propuestas de proveedores",
    tema: "Implementación CRM",
    hace: "2 horas",
  },
  {
    tipo: "tema_nuevo",
    usuario: "AL",
    descripcion: "creó el tema",
    detalle: "Actualización de políticas",
    hace: "5 horas",
  },
  {
    tipo: "accion_nueva",
    usuario: "JD",
    descripcion: "añadió una acción en",
    detalle: "Planificación Q1",
    hace: "1 día",
  },
  {
    tipo: "estado_cambiado",
    usuario: "RP",
    descripcion: "marcó para próxima reunión",
    detalle: "Migración a la nube",
    hace: "1 día",
  },
  {
    tipo: "accion_completada",
    usuario: "MS",
    descripcion: "completó la acción",
    detalle: "Documento de requisitos",
    tema: "Sistema CRM",
    hace: "2 días",
  },
]

const iconos = {
  accion_completada: CheckCircle2,
  tema_nuevo: Plus,
  accion_nueva: Clock,
  estado_cambiado: Edit,
}

const colores = {
  accion_completada: "text-green-600",
  tema_nuevo: "text-blue-600",
  accion_nueva: "text-amber-600",
  estado_cambiado: "text-purple-600",
}

export function ActividadReciente() {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Actividad Reciente</CardTitle>
        <CardDescription>Cambios de la última semana</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {actividades.map((actividad, idx) => {
            const Icon = iconos[actividad.tipo]
            const color = colores[actividad.tipo]

            return (
              <div key={idx} className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className={`${color} bg-muted p-2 rounded-lg`}>
                    <Icon className="h-4 w-4" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Avatar className="h-5 w-5">
                      <AvatarFallback className="text-[10px]">{actividad.usuario}</AvatarFallback>
                    </Avatar>
                    <p className="text-sm">
                      <span className="font-medium">{actividad.usuario}</span>{" "}
                      <span className="text-muted-foreground">{actividad.descripcion}</span>
                    </p>
                  </div>
                  <p className="text-sm font-medium ml-7">{actividad.detalle}</p>
                  {actividad.tema && (
                    <Badge variant="outline" className="text-xs mt-1 ml-7">
                      {actividad.tema}
                    </Badge>
                  )}
                  <p className="text-xs text-muted-foreground mt-1 ml-7">{actividad.hace}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
