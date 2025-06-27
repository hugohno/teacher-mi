"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogoutButton } from "@/components/logout-button"
import { Clock, User, BookOpen, Bell, Home, DollarSign, CalendarDays, Brain, Heart, MessageCircle } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const sidebarItems = [
  { title: "Visão Geral", icon: Home, id: "overview" },
  { title: "Dados do Aluno", icon: User, id: "child-data" },
  { title: "Plano Individual", icon: BookOpen, id: "plan" },
  { title: "Horário das Aulas", icon: CalendarDays, id: "schedule" },
  { title: "Financeiro", icon: DollarSign, id: "financial" },
  { title: "Comunicação", icon: MessageCircle, id: "communication" },
  { title: "Notificações", icon: Bell, id: "notifications" },
]

export default function ParentDashboard() {
  const [activeSection, setActiveSection] = useState("overview")

  const childrenData = [
    {
      id: 1,
      name: "Ana Silva",
      age: 8,
      level: "Básico I",
      progress: 75,
      avatar: "/placeholder.svg?height=40&width=40",
      teacher: "Michelle Marques",
      nextClass: "Amanhã às 15:00",
      psychopedagogicalNotes: "Excelente desenvolvimento na área de concentração e memória visual.",
    },
    {
      id: 2,
      name: "João Silva",
      age: 12,
      level: "Intermediário",
      progress: 85,
      avatar: "/placeholder.svg?height=40&width=40",
      teacher: "Michelle Marques",
      nextClass: "Hoje às 16:30",
      psychopedagogicalNotes: "Demonstra facilidade para aprendizagem auditiva. Recomendo mais atividades orais.",
    },
  ]

  const upcomingClasses = [
    {
      date: "Hoje",
      time: "16:30",
      student: "João Silva",
      teacher: "Michelle Marques",
      type: "Online",
      focus: "Conversação",
    },
    {
      date: "Amanhã",
      time: "15:00",
      student: "Ana Silva",
      teacher: "Michelle Marques",
      type: "Presencial",
      focus: "Vocabulário",
    },
    {
      date: "Quinta",
      time: "16:30",
      student: "João Silva",
      teacher: "Michelle Marques",
      type: "Online",
      focus: "Gramática",
    },
  ]

  const payments = [
    { month: "Dezembro 2024", amount: "R$ 180,00", status: "Pendente", dueDate: "15/12/2024" },
    { month: "Novembro 2024", amount: "R$ 180,00", status: "Pago", dueDate: "15/11/2024" },
    { month: "Outubro 2024", amount: "R$ 180,00", status: "Pago", dueDate: "15/10/2024" },
  ]

  const AppSidebar = () => (
    <Sidebar className="border-r-2 border-teal-100">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-teal-600 to-blue-600 rounded-full flex items-center justify-center relative">
            <span className="text-white font-bold text-sm">MM</span>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <BookOpen className="w-2 h-2 text-white" />
            </div>
          </div>
          <div>
            <span className="font-bold text-lg text-gray-800">Michelle Marques</span>
            <p className="text-xs text-teal-600 font-medium">Psicopedagoga</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600 font-semibold">Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveSection(item.id)}
                    isActive={activeSection === item.id}
                    className="w-full justify-start"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Visão Geral</h2>
              <p className="text-gray-600">Acompanhe o desenvolvimento dos seus filhos com Michelle Marques</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {childrenData.map((child) => (
                <Card key={child.id} className="border-2 border-teal-100 hover:border-teal-200 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={child.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gradient-to-r from-teal-400 to-blue-400 text-white">
                          {child.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{child.name}</CardTitle>
                        <CardDescription>
                          {child.age} anos • {child.level}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progresso Geral</span>
                        <span className="font-semibold">{child.progress}%</span>
                      </div>
                      <Progress value={child.progress} className="h-2" />
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Brain className="w-4 h-4 text-teal-600" />
                      <span>Acompanhamento Psicopedagógico</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{child.nextClass}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-2 border-green-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-green-600" />
                  Próximas Aulas com Michelle
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingClasses.slice(0, 3).map((class_, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div>
                          <p className="font-medium">{class_.student}</p>
                          <p className="text-sm text-gray-600">
                            {class_.date} às {class_.time} • Foco: {class_.focus}
                          </p>
                        </div>
                      </div>
                      <Badge variant={class_.type === "Online" ? "default" : "secondary"}>{class_.type}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">Abordagem Psicopedagógica</h3>
                    <p className="text-gray-600">
                      Michelle utiliza técnicas especializadas para potencializar o aprendizado de cada aluno de forma
                      única e personalizada.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      // Outras seções permanecem iguais...
      default:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Seção em Desenvolvimento</h2>
              <p className="text-gray-600">Esta funcionalidade será implementada em breve.</p>
            </div>
          </div>
        )
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50">
        <AppSidebar />
        <div className="flex-1">
          <header className="bg-white/90 backdrop-blur-sm border-b-2 border-teal-100 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <div>
                  <h1 className="text-xl font-bold text-gray-800">Área dos Pais</h1>
                  <p className="text-sm text-teal-600">Acompanhamento com Michelle Marques - Psicopedagoga</p>
                </div>
              </div>
              <LogoutButton />
            </div>
          </header>
          <main className="p-6">{renderContent()}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
