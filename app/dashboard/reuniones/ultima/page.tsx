import { DashboardHeader } from "@/components/dashboard-header"
import { UltimaReunionDetalle } from "@/components/ultima-reunion-detalle"

export default function UltimaReunionPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <UltimaReunionDetalle />
      </main>
    </div>
  )
}
