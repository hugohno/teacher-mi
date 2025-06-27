"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { authService } from "@/lib/auth"

interface LogoutButtonProps {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  className?: string
}

export function LogoutButton({ variant = "outline", size = "sm", className }: LogoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      const { error } = await authService.signOut()

      if (error) {
        console.error("Erro ao fazer logout:", error)
        alert("Erro ao fazer logout. Tente novamente.")
      } else {
        router.push("/")
      }
    } catch (error) {
      console.error("Erro inesperado:", error)
      alert("Erro inesperado. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button variant={variant} size={size} onClick={handleLogout} disabled={isLoading} className={className}>
      <LogOut className="w-4 h-4 mr-2" />
      {isLoading ? "Saindo..." : "Sair"}
    </Button>
  )
}
