import { DashboardHeader } from "@/components/dashboard-header"
import { ResumenReunion } from "@/components/resumen-reunion"

export default function ResumenReunionPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <ResumenReunion />
      </main>
    </div>
  )
}
