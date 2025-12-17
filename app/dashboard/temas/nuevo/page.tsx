import { NuevoTemaForm } from "@/components/nuevo-tema-form"

export default function NuevoTemaPage() {
  return (
    <main className="container mx-auto px-8 py-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Crear Nuevo Tema</h1>
        <p className="text-muted-foreground">Añade un nuevo tema para gestionar en las reuniones</p>
      </div>

      <NuevoTemaForm />
    </main>
  )
}
