"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/auth"

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          console.error("Erro na autenticação:", error)
          router.push("/?error=auth_error")
          return
        }

        if (data.session) {
          const user = data.session.user
          const email = user.email

          // Verificar se é admin
          const { data: adminData } = await supabase
            .from("admins")
            .select("*")
            .eq("email", email)
            .eq("active", true)
            .single()

          if (adminData) {
            router.push("/admin-dashboard")
            return
          }

          // Verificar se é aluno
          const { data: studentData } = await supabase
            .from("student_users")
            .select("*")
            .eq("email", email)
            .eq("active", true)
            .single()

          if (studentData) {
            router.push("/student-dashboard")
            return
          }

          // Verificar se é responsável
          const { data: parentData } = await supabase
            .from("parent_users")
            .select("*")
            .eq("email", email)
            .eq("active", true)
            .single()

          if (parentData) {
            router.push("/parent-dashboard")
            return
          }

          // Se chegou até aqui, é um usuário do Google que precisa completar o cadastro
          // Vamos criar um registro básico na tabela parent_users
          if (user.user_metadata?.name) {
            await supabase.from("parent_users").insert([
              {
                email: email,
                name: user.user_metadata.name,
                auth_provider: "google",
              },
            ])
            router.push("/parent-dashboard")
          } else {
            router.push("/?error=incomplete_profile")
          }
        } else {
          router.push("/")
        }
      } catch (error) {
        console.error("Erro no callback:", error)
        router.push("/?error=callback_error")
      }
    }

    handleAuthCallback()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Finalizando login...</p>
      </div>
    </div>
  )
}
