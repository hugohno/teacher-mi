"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Users, Star, BookOpen, Phone, MapPin, Instagram } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

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
          <p className="text-gray-600 text-sm">Aprendendo inglês de forma personalizada</p>
        </div>

        <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl text-gray-800">Bem-vindo de volta!</CardTitle>
            <CardDescription>Acesse sua área personalizada</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="parent" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="parent" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Pais
                </TabsTrigger>
                <TabsTrigger value="student" className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Alunos
                </TabsTrigger>
              </TabsList>

              <TabsContent value="parent" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="parent-email">E-mail</Label>
                  <Input
                    id="parent-email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-2 border-teal-200 focus:border-teal-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parent-password">Senha</Label>
                  <Input
                    id="parent-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-2 border-teal-200 focus:border-teal-400"
                  />
                </div>
                <Link href="/parent-dashboard">
                  <Button className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200">
                    Entrar como Responsável
                  </Button>
                </Link>
              </TabsContent>

              <TabsContent value="student" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="student-email">E-mail</Label>
                  <Input
                    id="student-email"
                    type="email"
                    placeholder="aluno@email.com"
                    className="border-2 border-purple-200 focus:border-purple-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="student-password">Senha</Label>
                  <Input
                    id="student-password"
                    type="password"
                    placeholder="••••••••"
                    className="border-2 border-purple-200 focus:border-purple-400"
                  />
                </div>
                <Link href="/student-dashboard">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200">
                    Entrar como Aluno
                  </Button>
                </Link>
              </TabsContent>
            </Tabs>

            <div className="mt-6 space-y-3">
              <Button variant="outline" className="w-full border-2 border-gray-200 hover:bg-gray-50 bg-transparent">
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
                Entrar com Google
              </Button>

              <div className="text-center">
                <Button variant="link" className="text-sm text-gray-600 hover:text-gray-800">
                  Esqueci minha senha
                </Button>
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
