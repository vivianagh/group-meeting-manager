import { DashboardHeader } from "@/components/dashboard-header"
import { HistoricoTemas } from "@/components/historico-temas"
import { FiltrosHistorico } from "@/components/filtros-historico"

export default function HistoricoPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Histórico de Temas</h1>
          <p className="text-muted-foreground">Temas cerrados y archivo de reuniones</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          <aside className="lg:col-span-1">
            <FiltrosHistorico />
          </aside>

          <div className="lg:col-span-3">
            <HistoricoTemas />
          </div>
        </div>
      </main>
    </div>
  )
}
