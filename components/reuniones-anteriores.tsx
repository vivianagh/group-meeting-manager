import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, FileText, ExternalLink } from "lucide-react"

const reunionesAnteriores = [
  {
    id: "1",
    fecha: "2024-01-08",
    duracion: "50 min",
    asistentes: 4,
    temasTratados: 3,
    decisiones: 4,
  },
  {
    id: "2",
    fecha: "2024-01-01",
    duracion: "45 min",
    asistentes: 4,
    temasTratados: 2,
    decisiones: 3,
  },
  {
    id: "3",
    fecha: "2023-12-25",
    duracion: "40 min",
    asistentes: 3,
    temasTratados: 2,
    decisiones: 2,
  },
]

export function ReunionesAnteriores() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Reuniones Anteriores</CardTitle>
        <CardDescription>Consulta reuniones pasadas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {reunionesAnteriores.map((reunion) => (
            <div key={reunion.id} className="p-4 border rounded-lg hover:bg-accent transition-colors group">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {new Date(reunion.fecha).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "short",
                    })}
                  </span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {reunion.duracion}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{reunion.asistentes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FileText className="h-3 w-3" />
                  <span>{reunion.temasTratados} temas</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>{reunion.decisiones} decisiones</span>
                </div>
              </div>

              <Button variant="ghost" size="sm" className="w-full text-xs group-hover:bg-background">
                Ver detalles
                <ExternalLink className="h-3 w-3 ml-2" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
