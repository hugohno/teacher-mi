"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Calendar,
  Clock,
  CreditCard,
  User,
  BookOpen,
  Bell,
  Home,
  DollarSign,
  CalendarDays,
  Users,
  Star,
  CheckCircle,
  AlertCircle,
  Download,
  Brain,
  Heart,
  Phone,
  MessageCircle,
  MapPin,
} from "lucide-react"
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

      case "child-data":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Dados dos Alunos</h2>
              <p className="text-gray-600">Acompanhamento psicopedagógico detalhado</p>
            </div>

            {childrenData.map((child) => (
              <Card key={child.id} className="border-2 border-purple-100">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={child.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gradient-to-r from-purple-400 to-pink-400 text-white text-lg">
                        {child.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-xl">{child.name}</CardTitle>
                      <CardDescription className="text-base">{child.age} anos</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-800">Informações Acadêmicas</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Nível Atual:</span>
                          <Badge variant="outline">{child.level}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Psicopedagoga:</span>
                          <span className="font-medium">{child.teacher}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Progresso Geral:</span>
                          <span className="font-medium">{child.progress}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-800">Avaliações Recentes</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                          <span className="text-sm">Vocabulário</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">9.0</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                          <span className="text-sm">Gramática</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">8.5</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-purple-50 rounded">
                          <span className="text-sm">Conversação</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">9.2</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                    <h4 className="font-semibold text-teal-800 mb-2 flex items-center gap-2">
                      <Brain className="w-4 h-4" />
                      Observações Psicopedagógicas - Michelle Marques
                    </h4>
                    <p className="text-sm text-teal-700">{child.psychopedagogicalNotes}</p>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Plano de Desenvolvimento Individual</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Foco em atividades visuais para reforçar a memória</li>
                      <li>• Exercícios de concentração antes das aulas</li>
                      <li>• Uso de jogos educativos para manter o engajamento</li>
                      <li>• Acompanhamento semanal do progresso</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )

      case "plan":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Plano Individual</h2>
              <p className="text-gray-600">Aulas personalizadas com Michelle Marques</p>
            </div>

            <Card className="border-2 border-orange-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-orange-600" />
                  Plano Psicopedagógico Individual
                </CardTitle>
                <CardDescription>Aulas personalizadas • Acompanhamento especializado</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Detalhes do Plano</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Valor por Aula:</span>
                          <span className="font-bold text-lg text-green-600">R$ 45,00</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Pacote Mensal:</span>
                          <span className="font-bold text-lg text-green-600">R$ 180,00</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Frequência:</span>
                          <span className="font-medium">4 aulas/mês</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duração:</span>
                          <span className="font-medium">60 minutos</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Aulas Restantes (Dezembro)</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Ana Silva</span>
                            <span className="font-medium">2 de 4 aulas</span>
                          </div>
                          <Progress value={50} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>João Silva</span>
                            <span className="font-medium">1 de 4 aulas</span>
                          </div>
                          <Progress value={25} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                  <h4 className="font-semibold text-teal-800 mb-2">Metodologia Psicopedagógica</h4>
                  <ul className="text-sm text-teal-700 space-y-1">
                    <li>• Avaliação inicial das habilidades e dificuldades</li>
                    <li>• Plano de ensino personalizado para cada aluno</li>
                    <li>• Técnicas de neuroaprendizagem aplicadas ao inglês</li>
                    <li>• Acompanhamento contínuo do desenvolvimento</li>
                    <li>• Relatórios mensais para os pais</li>
                  </ul>
                </div>

                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">Políticas do Plano</h4>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• Cancelamento de aulas com até 24h de antecedência</li>
                    <li>• Remarcação gratuita até 2 vezes por mês</li>
                    <li>• Aulas de reposição em caso de falta da professora</li>
                    <li>• Material didático incluso no valor</li>
                    <li>• Desconto de 10% para pagamento trimestral</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "communication":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Comunicação</h2>
              <p className="text-gray-600">Mantenha contato direto com Michelle Marques</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-2 border-teal-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-teal-600" />
                    Contato Direto
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                      <Phone className="w-4 h-4 mr-2" />
                      (11) 95752-3975
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-pink-200 text-pink-600 hover:bg-pink-50 bg-transparent"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                      @michellinha31
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    Localização
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">
                      <strong>Endereço:</strong>
                      <br />
                      Av. das Nações Unidas, 18801
                      <br />
                      Santo Amaro, SP
                      <br />
                      5º andar, conjunto 519
                    </p>
                    <Button variant="outline" className="w-full bg-transparent">
                      <MapPin className="w-4 h-4 mr-2" />
                      Ver no Mapa
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-2 border-purple-100">
              <CardHeader>
                <CardTitle>Mensagens Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">MM</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">Michelle Marques</p>
                      <p className="text-sm text-gray-600">
                        "Olá! Ana teve um excelente desempenho na aula de hoje. Ela está progredindo muito bem no
                        vocabulário de cores e formas."
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Hoje às 17:30</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">MM</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">Michelle Marques</p>
                      <p className="text-sm text-gray-600">
                        "Lembrete: João tem aula amanhã às 16:30. Preparei atividades especiais de conversação para
                        ele!"
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Ontem às 19:15</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "schedule":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Horário das Aulas</h2>
              <p className="text-gray-600">Gerencie as aulas com Michelle Marques</p>
            </div>

            <Card className="border-2 border-green-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-green-600" />
                  Próximas Aulas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingClasses.map((class_, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border-2 border-gray-100 rounded-lg hover:border-green-200 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-teal-400 rounded-full flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold">{class_.student}</p>
                          <p className="text-sm text-gray-600">
                            {class_.date} às {class_.time} • Foco: {class_.focus}
                          </p>
                          <p className="text-sm text-gray-500">Michelle Marques</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={class_.type === "Online" ? "default" : "secondary"}>{class_.type}</Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-blue-600 border-blue-200 hover:bg-blue-50 bg-transparent"
                        >
                          Remarcar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                        >
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-teal-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-teal-600" />
                  Disponibilidade - Michelle Marques
                </CardTitle>
                <CardDescription>Horários disponíveis para agendamento</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-3 text-teal-700">Manhã</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Segunda a Sexta</span>
                        <span className="text-green-600">09:00 - 12:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sábado</span>
                        <span className="text-green-600">09:00 - 11:00</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-3 text-teal-700">Tarde</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Segunda a Sexta</span>
                        <span className="text-green-600">14:00 - 18:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sábado</span>
                        <span className="text-gray-400">Indisponível</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-teal-50 rounded-lg">
                  <p className="text-sm text-teal-700">
                    <strong>Nota:</strong> Aulas online e presenciais disponíveis. Entre em contato para agendar
                    horários especiais.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "financial":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Financeiro</h2>
              <p className="text-gray-600">Gerencie seus pagamentos</p>
            </div>

            <Card className="border-2 border-red-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  Mensalidade Atual
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-bold text-lg">R$ 180,00</p>
                    <p className="text-sm text-gray-600">Vencimento: 15/12/2024</p>
                    <Badge variant="destructive" className="mt-1">
                      Pendente
                    </Badge>
                  </div>
                  <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Pagar Agora
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-gray-600" />
                  Histórico de Pagamentos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {payments.map((payment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {payment.status === "Pago" ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-red-500" />
                        )}
                        <div>
                          <p className="font-medium">{payment.month}</p>
                          <p className="text-sm text-gray-600">Vencimento: {payment.dueDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="font-bold">{payment.amount}</p>
                          <Badge variant={payment.status === "Pago" ? "default" : "destructive"}>
                            {payment.status}
                          </Badge>
                        </div>
                        {payment.status === "Pago" && (
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-teal-100">
              <CardHeader>
                <CardTitle>Formas de Pagamento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg text-center">
                    <CreditCard className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                    <h4 className="font-semibold">PIX</h4>
                    <p className="text-sm text-gray-600">Desconto de 5%</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <CreditCard className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <h4 className="font-semibold">Cartão</h4>
                    <p className="text-sm text-gray-600">Débito ou Crédito</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <h4 className="font-semibold">Dinheiro</h4>
                    <p className="text-sm text-gray-600">Presencial</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "notifications":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Notificações</h2>
              <p className="text-gray-600">Configure seus lembretes e alertas</p>
            </div>

            <Card className="border-2 border-purple-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-purple-600" />
                  Configurações de Lembretes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Lembrete de Aulas</h4>
                      <p className="text-sm text-gray-600">Receber notificação 1 hora antes da aula</p>
                    </div>
                    <Button variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Ativado
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Vencimento da Mensalidade</h4>
                      <p className="text-sm text-gray-600">Lembrete 3 dias antes do vencimento</p>
                    </div>
                    <Button variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Ativado
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Relatório de Progresso</h4>
                      <p className="text-sm text-gray-600">Relatório semanal por WhatsApp</p>
                    </div>
                    <Button variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Ativado
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Mensagens da Michelle</h4>
                      <p className="text-sm text-gray-600">Notificações de mensagens da professora</p>
                    </div>
                    <Button variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Ativado
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-100">
              <CardHeader>
                <CardTitle>Notificações Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-sm">Aula confirmada</p>
                      <p className="text-sm text-gray-600">João Silva - Hoje às 16:30 com Michelle Marques</p>
                      <p className="text-xs text-gray-500">Há 2 horas</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-sm">Mensalidade próxima do vencimento</p>
                      <p className="text-sm text-gray-600">Vencimento em 3 dias - R$ 180,00</p>
                      <p className="text-xs text-gray-500">Ontem</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-sm">Relatório de progresso</p>
                      <p className="text-sm text-gray-600">Ana Silva teve excelente desempenho esta semana</p>
                      <p className="text-xs text-gray-500">2 dias atrás</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-sm">Mensagem da Michelle</p>
                      <p className="text-sm text-gray-600">"Preparei atividades especiais para a próxima aula!"</p>
                      <p className="text-xs text-gray-500">3 dias atrás</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return <div>Seção não encontrada</div>
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50">
        <AppSidebar />
        <div className="flex-1">
          <header className="bg-white/90 backdrop-blur-sm border-b-2 border-teal-100 p-4">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-xl font-bold text-gray-800">Área dos Pais</h1>
                <p className="text-sm text-teal-600">Acompanhamento com Michelle Marques - Psicopedagoga</p>
              </div>
            </div>
          </header>
          <main className="p-6">{renderContent()}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
