import { DashboardHeader } from "@/components/dashboard-header"
import { ReunionActiva } from "@/components/reunion-activa"

export default function ReunionActivaPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <ReunionActiva />
      </main>
    </div>
  )
}
