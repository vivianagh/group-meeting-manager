"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { Users, Mail, CheckCircle2 } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState("")

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmittedEmail(email)
      setEmailSent(true)
    }
  }

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

  const handleTryAnotherEmail = () => {
    setEmailSent(false)
    setEmail("")
    setSubmittedEmail("")
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
        <CardContent className="space-y-6">
          {!emailSent ? (
            <>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Iniciar sesión</h3>
                  <p className="text-sm text-muted-foreground">
                    Ingresa tu correo y te enviaremos un enlace mágico para acceder
                  </p>
                </div>
                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    <Mail className="h-4 w-4 mr-2" />
                    Enviar enlace mágico
                  </Button>
                </form>
                <p className="text-xs text-center text-muted-foreground">
                  Solo usuarios autorizados pueden acceder a este grupo
                </p>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">o</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button variant="outline" className="w-full bg-transparent" size="lg" onClick={handleDemoLogin}>
                  Entrar en modo demo
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Modo demostración: Acceso instantáneo sin autenticación
                </p>
              </div>
            </>
          ) : (
            <div className="space-y-4 text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Revisa tu correo</h3>
                <p className="text-sm text-muted-foreground">
                  Hemos enviado un enlace de acceso a <strong>{submittedEmail}</strong>
                </p>
                <p className="text-sm text-muted-foreground">El enlace expirará en 15 minutos por seguridad</p>
              </div>
              <Button variant="outline" className="w-full bg-transparent" onClick={handleTryAnotherEmail}>
                Usar otro correo
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
