import { DashboardHeader } from "@/components/dashboard-header"
import { TemaHeader } from "@/components/tema-header"
import { TemaDecisiones } from "@/components/tema-decisiones"
import { TemaAcciones } from "@/components/tema-acciones"
import { TemaInfo } from "@/components/tema-info"

// Mock data - in real app this would come from database
const getTema = (id: string) => ({
  id,
  nombre: "Implementación de nuevo sistema CRM",
  importancia: "alta",
  fecha_limite: "2024-01-15",
  responsables: [
    { iniciales: "JD", nombre: "Juan Pérez" },
    { iniciales: "MS", nombre: "María Sánchez" },
  ],
  estado: "siguiente-reunion",
  decisiones: [
    {
      id: "1",
      texto: "Se ha decidido usar Salesforce como plataforma principal",
      fecha: "2024-01-05",
      autor: "JD",
    },
    {
      id: "2",
      texto: "Presupuesto aprobado: $50,000 para implementación inicial",
      fecha: "2024-01-03",
      autor: "RP",
    },
  ],
  acciones: [
    {
      id: "1",
      descripcion: "Revisar propuestas de proveedores",
      asignado: "MS",
      estado: "realizada",
      notas: "Se evaluaron 3 proveedores diferentes",
    },
    {
      id: "2",
      descripcion: "Preparar documento de requisitos técnicos",
      asignado: "JD",
      estado: "en-progreso",
      notas: "",
    },
    {
      id: "3",
      descripcion: "Coordinar reunión con equipo de IT",
      asignado: "AL",
      estado: "pendiente",
      notas: "",
    },
  ],
})

export default function TemaDetailPage({ params }: { params: { id: string } }) {
  const tema = getTema(params.id)

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <TemaHeader tema={tema} params={params} />

        <div className="grid gap-6 lg:grid-cols-3 mt-6">
          <div className="lg:col-span-2 space-y-6">
            <TemaDecisiones decisiones={tema.decisiones} temaId={tema.id} params={params} />
            <TemaAcciones acciones={tema.acciones} temaId={tema.id} params={params} />
          </div>

          <div>
            <TemaInfo tema={tema} />
          </div>
        </div>
      </main>
    </div>
  )
}
