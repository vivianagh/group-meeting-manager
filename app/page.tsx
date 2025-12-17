"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Users } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()

  const handleDemoLogin = () => {
    // Mock login - in production this would use real authentication
    localStorage.setItem(
      "demo_user",
      JSON.stringify({
        nombre: "Carmen García",
        iniciales: "CG",
        email: "carmen@empresa.com",
      }),
    )
    router.push("/dashboard/grupos")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Gestión de Reuniones</CardTitle>
          <CardDescription>Sistema de gestión de temas y reuniones para grupos de trabajo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full" size="lg" onClick={handleDemoLogin}>
            Entrar en modo demo
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            Modo demostración: Acceso instantáneo sin autenticación
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
