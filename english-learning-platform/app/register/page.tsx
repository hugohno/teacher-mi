"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Users, Star, BookOpen, Phone, MapPin, Instagram, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/auth"

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const router = useRouter()

  // Estados para cadastro de pais
  const [parentData, setParentData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  // Estados para cadastro de alunos
  const [studentData, setStudentData] = useState({
    name: "",
    email: "",
    age: "",
    parentEmail: "",
    password: "",
    confirmPassword: "",
  })

  const handleParentRegister = async () => {
    if (!parentData.name || !parentData.email || !parentData.password) {
      alert("Por favor, preencha todos os campos obrigatórios")
      return
    }

    if (parentData.password !== parentData.confirmPassword) {
      alert("As senhas não coincidem")
      return
    }

    if (parentData.password.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres")
      return
    }

    setIsLoading(true)
    try {
      // Criar usuário no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: parentData.email,
        password: parentData.password,
        options: {
          data: {
            name: parentData.name,
            user_type: "parent",
          },
        },
      })

      if (authError) throw authError

      // Salvar dados adicionais na tabela parent_users
      const { error: dbError } = await supabase.from("parent_users").insert([
        {
          email: parentData.email,
          name: parentData.name,
          phone: parentData.phone,
          auth_provider: "email",
        },
      ])

      if (dbError) throw dbError

      alert("Cadastro realizado com sucesso! Verifique seu email para confirmar a conta.")
      router.push("/")
    } catch (error) {
      console.error("Erro no cadastro:", error)
      alert("Erro no cadastro: " + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStudentRegister = async () => {
    if (
      !studentData.name ||
      !studentData.email ||
      !studentData.age ||
      !studentData.parentEmail ||
      !studentData.password
    ) {
      alert("Por favor, preencha todos os campos obrigatórios")
      return
    }

    if (studentData.password !== studentData.confirmPassword) {
      alert("As senhas não coincidem")
      return
    }

    if (studentData.password.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres")
      return
    }

    setIsLoading(true)
    try {
      // Verificar se o email do responsável existe
      const { data: parentExists } = await supabase
        .from("parent_users")
        .select("email")
        .eq("email", studentData.parentEmail)
        .single()

      if (!parentExists) {
        alert("Email do responsável não encontrado. O responsável deve se cadastrar primeiro.")
        setIsLoading(false)
        return
      }

      // Criar usuário no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: studentData.email,
        password: studentData.password,
        options: {
          data: {
            name: studentData.name,
            user_type: "student",
          },
        },
      })

      if (authError) throw authError

      // Salvar dados adicionais na tabela student_users
      const { error: dbError } = await supabase.from("student_users").insert([
        {
          email: studentData.email,
          name: studentData.name,
          age: Number.parseInt(studentData.age),
          parent_email: studentData.parentEmail,
          auth_provider: "email",
        },
      ])

      if (dbError) throw dbError

      alert("Cadastro realizado com sucesso! Verifique seu email para confirmar a conta.")
      router.push("/")
    } catch (error) {
      console.error("Erro no cadastro:", error)
      alert("Erro no cadastro: " + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleRegister = async () => {
    setIsGoogleLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        alert("Erro no cadastro com Google: " + error.message)
      }
    } catch (error) {
      console.error("Erro no cadastro com Google:", error)
      alert("Erro inesperado no cadastro com Google")
    } finally {
      setIsGoogleLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-teal-600 to-blue-600 rounded-full mb-4 relative">
            <div className="text-white font-bold text-2xl">MM</div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <BookOpen className="w-3 h-3 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1">Michelle Marques</h1>
          <p className="text-lg font-semibold text-teal-600 mb-2">Psicopedagoga</p>
          <p className="text-gray-600 text-sm">Criar nova conta</p>
        </div>

        <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl text-gray-800">Cadastro</CardTitle>
            <CardDescription>Crie sua conta para acessar a plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="parent" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="parent" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Responsável
                </TabsTrigger>
                <TabsTrigger value="student" className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Aluno
                </TabsTrigger>
              </TabsList>

              <TabsContent value="parent" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="parent-name">Nome Completo *</Label>
                  <Input
                    id="parent-name"
                    placeholder="Seu nome completo"
                    value={parentData.name}
                    onChange={(e) => setParentData({ ...parentData, name: e.target.value })}
                    className="border-2 border-teal-200 focus:border-teal-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parent-email">E-mail *</Label>
                  <Input
                    id="parent-email"
                    type="email"
                    placeholder="seu@email.com"
                    value={parentData.email}
                    onChange={(e) => setParentData({ ...parentData, email: e.target.value })}
                    className="border-2 border-teal-200 focus:border-teal-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parent-phone">Telefone</Label>
                  <Input
                    id="parent-phone"
                    placeholder="(11) 99999-9999"
                    value={parentData.phone}
                    onChange={(e) => setParentData({ ...parentData, phone: e.target.value })}
                    className="border-2 border-teal-200 focus:border-teal-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parent-password">Senha *</Label>
                  <Input
                    id="parent-password"
                    type="password"
                    placeholder="Mínimo 6 caracteres"
                    value={parentData.password}
                    onChange={(e) => setParentData({ ...parentData, password: e.target.value })}
                    className="border-2 border-teal-200 focus:border-teal-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parent-confirm-password">Confirmar Senha *</Label>
                  <Input
                    id="parent-confirm-password"
                    type="password"
                    placeholder="Digite a senha novamente"
                    value={parentData.confirmPassword}
                    onChange={(e) => setParentData({ ...parentData, confirmPassword: e.target.value })}
                    className="border-2 border-teal-200 focus:border-teal-400"
                  />
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
                  onClick={handleParentRegister}
                  disabled={isLoading}
                >
                  {isLoading ? "Cadastrando..." : "Cadastrar como Responsável"}
                </Button>
              </TabsContent>

              <TabsContent value="student" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="student-name">Nome Completo *</Label>
                  <Input
                    id="student-name"
                    placeholder="Nome do aluno"
                    value={studentData.name}
                    onChange={(e) => setStudentData({ ...studentData, name: e.target.value })}
                    className="border-2 border-purple-200 focus:border-purple-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="student-email">E-mail *</Label>
                  <Input
                    id="student-email"
                    type="email"
                    placeholder="aluno@email.com"
                    value={studentData.email}
                    onChange={(e) => setStudentData({ ...studentData, email: e.target.value })}
                    className="border-2 border-purple-200 focus:border-purple-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="student-age">Idade *</Label>
                  <Input
                    id="student-age"
                    type="number"
                    placeholder="8"
                    value={studentData.age}
                    onChange={(e) => setStudentData({ ...studentData, age: e.target.value })}
                    className="border-2 border-purple-200 focus:border-purple-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="student-parent-email">E-mail do Responsável *</Label>
                  <Input
                    id="student-parent-email"
                    type="email"
                    placeholder="responsavel@email.com"
                    value={studentData.parentEmail}
                    onChange={(e) => setStudentData({ ...studentData, parentEmail: e.target.value })}
                    className="border-2 border-purple-200 focus:border-purple-400"
                  />
                  <p className="text-xs text-gray-500">O responsável deve ter uma conta cadastrada</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="student-password">Senha *</Label>
                  <Input
                    id="student-password"
                    type="password"
                    placeholder="Mínimo 6 caracteres"
                    value={studentData.password}
                    onChange={(e) => setStudentData({ ...studentData, password: e.target.value })}
                    className="border-2 border-purple-200 focus:border-purple-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="student-confirm-password">Confirmar Senha *</Label>
                  <Input
                    id="student-confirm-password"
                    type="password"
                    placeholder="Digite a senha novamente"
                    value={studentData.confirmPassword}
                    onChange={(e) => setStudentData({ ...studentData, confirmPassword: e.target.value })}
                    className="border-2 border-purple-200 focus:border-purple-400"
                  />
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
                  onClick={handleStudentRegister}
                  disabled={isLoading}
                >
                  {isLoading ? "Cadastrando..." : "Cadastrar como Aluno"}
                </Button>
              </TabsContent>
            </Tabs>

            <div className="mt-6 space-y-3">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">Ou</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full border-2 border-gray-200 hover:bg-gray-50 bg-transparent"
                onClick={handleGoogleRegister}
                disabled={isGoogleLoading}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                {isGoogleLoading ? "Conectando..." : "Cadastrar com Google"}
              </Button>

              <div className="text-center">
                <Link href="/">
                  <Button variant="link" className="text-sm text-gray-600 hover:text-gray-800">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar ao Login
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <div className="mt-6 p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-teal-100">
          <div className="text-center mb-3">
            <h3 className="font-semibold text-gray-800">Contato</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <Phone className="w-4 h-4 text-teal-600" />
              <span>(11) 95752-3975</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <Instagram className="w-4 h-4 text-teal-600" />
              <span>@michellinha31</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4 text-teal-600" />
              <span className="text-center">Av. das Nações Unidas, 18801 - Santo Amaro, SP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
