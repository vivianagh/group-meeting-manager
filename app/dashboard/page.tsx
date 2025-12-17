import { TemasActivos } from "@/components/temas-activos"
import { ActividadReciente } from "@/components/actividad-reciente"
import { StatsCards } from "@/components/stats-cards"
import { HistoricoTemas } from "@/components/historico-temas"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Vista general de temas y actividades del grupo</p>
        </div>

        <StatsCards />

        <div className="grid gap-8 lg:grid-cols-3 mt-8">
          <div className="lg:col-span-2">
            <TemasActivos />
          </div>
          <div>
            <ActividadReciente />
          </div>
        </div>

        <div className="mt-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight mb-2">Histórico de Temas</h2>
            <p className="text-muted-foreground">Temas cerrados y finalizados del grupo</p>
          </div>
          <HistoricoTemas />
        </div>
      </main>
    </div>
  )
}
