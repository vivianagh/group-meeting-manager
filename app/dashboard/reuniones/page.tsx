import { DashboardHeader } from "@/components/dashboard-header"
import { IniciarReunion } from "@/components/iniciar-reunion"
import { ReunionesAnteriores } from "@/components/reuniones-anteriores"

export default function ReunionesPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Gestión de Reuniones</h1>
          <p className="text-muted-foreground">Inicia una nueva reunión o consulta reuniones anteriores</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <IniciarReunion />
          </div>
          <div>
            <ReunionesAnteriores />
          </div>
        </div>
      </main>
    </div>
  )
}
