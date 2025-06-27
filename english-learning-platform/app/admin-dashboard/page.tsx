"use client"

import { createClient } from "@supabase/supabase-js"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LogoutButton } from "@/components/logout-button"
import {
  Settings,
  Users,
  CreditCard,
  Calendar,
  FileText,
  Edit,
  Trash2,
  Plus,
  DollarSign,
  Database,
  Shield,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Atualizar as importações para incluir adminService
import { adminService } from "@/lib/supabase"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

const sidebarItems = [
  { title: "Configurações Gerais", icon: Settings, id: "settings" },
  { title: "Administradores", icon: Shield, id: "admins" },
  { title: "Gerenciar Alunos", icon: Users, id: "students" },
  { title: "Planos e Preços", icon: CreditCard, id: "plans" },
  { title: "Provas e Avaliações", icon: FileText, id: "exams" },
  { title: "Formas de Pagamento", icon: DollarSign, id: "payments" },
  { title: "Agenda Google", icon: Calendar, id: "calendar" },
  { title: "Relatórios", icon: Database, id: "reports" },
]

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("settings")

  // Estados para dados
  const [admins, setAdmins] = useState([])
  const [students, setStudents] = useState([])
  const [plans, setPlans] = useState([])
  const [paymentMethods, setPaymentMethods] = useState([])
  const [exams, setExams] = useState([])
  const [loading, setLoading] = useState(false)

  // Estados para formulários (sem admin)
  const [newStudent, setNewStudent] = useState({
    name: "",
    age: "",
    email: "",
    parentName: "",
    parentPhone: "",
    parentEmail: "",
    level: "",
    plan: "",
    notes: "",
  })

  const [newPlan, setNewPlan] = useState({
    name: "",
    description: "",
    pricePerClass: "",
    classesPerMonth: "",
    duration: "",
    features: "",
  })

  const [newPaymentMethod, setNewPaymentMethod] = useState({
    name: "",
    description: "",
    discount: "",
    active: true,
  })

  const [newExam, setNewExam] = useState({
    title: "",
    description: "",
    level: "",
    questions: "",
    timeLimit: "",
    file: null,
  })

  // Estados para controlar os diálogos (sem admin)
  const [dialogStates, setDialogStates] = useState({
    student: false,
    plan: false,
    exam: false,
    payment: false,
  })

  // Função para abrir/fechar diálogos
  const toggleDialog = (type: string, isOpen: boolean) => {
    setDialogStates((prev) => ({ ...prev, [type]: isOpen }))
  }

  // Função para resetar formulários e fechar diálogos
  const resetAndCloseDialog = (type: string) => {
    switch (type) {
      case "student":
        setNewStudent({
          name: "",
          age: "",
          email: "",
          parentName: "",
          parentPhone: "",
          parentEmail: "",
          level: "",
          plan: "",
          notes: "",
        })
        break
      case "plan":
        setNewPlan({
          name: "",
          description: "",
          pricePerClass: "",
          classesPerMonth: "",
          duration: "",
          features: "",
        })
        break
      case "exam":
        setNewExam({
          title: "",
          description: "",
          level: "",
          questions: "",
          timeLimit: "",
          file: null,
        })
        break
      case "payment":
        setNewPaymentMethod({
          name: "",
          description: "",
          discount: "",
          active: true,
        })
        break
    }
    toggleDialog(type, false)
  }

  // Carregar dados do Supabase
  useEffect(() => {
    loadAdmins()
    loadStudents()
    loadPlans()
    loadPaymentMethods()
    loadExams()
  }, [])

  // Atualizar a função loadAdmins para usar o novo serviço
  const loadAdmins = async () => {
    try {
      const { data, error } = await adminService.getAll()
      if (error) throw error
      if (data) setAdmins(data)
    } catch (error) {
      console.error("Erro ao carregar administradores:", error)
    }
  }

  const loadStudents = async () => {
    try {
      const { data, error } = await supabase.from("students").select("*").order("created_at", { ascending: false })
      if (error) throw error
      if (data) setStudents(data)
    } catch (error) {
      console.error("Erro ao carregar alunos:", error)
    }
  }

  const loadPlans = async () => {
    try {
      const { data, error } = await supabase.from("plans").select("*").order("created_at", { ascending: false })
      if (error) throw error
      if (data) setPlans(data)
    } catch (error) {
      console.error("Erro ao carregar planos:", error)
    }
  }

  const loadPaymentMethods = async () => {
    try {
      const { data, error } = await supabase
        .from("payment_methods")
        .select("*")
        .order("created_at", { ascending: false })
      if (error) throw error
      if (data) setPaymentMethods(data)
    } catch (error) {
      console.error("Erro ao carregar formas de pagamento:", error)
    }
  }

  const loadExams = async () => {
    try {
      const { data, error } = await supabase.from("exams").select("*").order("created_at", { ascending: false })
      if (error) throw error
      if (data) setExams(data)
    } catch (error) {
      console.error("Erro ao carregar provas:", error)
    }
  }

  // Atualizar a função toggleAdminStatus para usar o novo serviço
  const toggleAdminStatus = async (adminId: number, currentStatus: boolean) => {
    try {
      const { error } = await adminService.toggleStatus(adminId, !currentStatus)

      if (error) throw error

      await loadAdmins()
      alert(`Administrador ${!currentStatus ? "ativado" : "desativado"} com sucesso!`)
    } catch (error) {
      console.error("Erro ao alterar status do administrador:", error)
      alert("Erro ao alterar status do administrador")
    }
  }

  // Outras funções permanecem iguais...
  const saveStudent = async () => {
    if (!newStudent.name || !newStudent.age || !newStudent.parentName || !newStudent.parentEmail) {
      alert("Por favor, preencha todos os campos obrigatórios")
      return
    }

    setLoading(true)
    try {
      const { data, error } = await supabase.from("students").insert([
        {
          name: newStudent.name,
          age: Number.parseInt(newStudent.age),
          email: newStudent.email,
          parent_name: newStudent.parentName,
          parent_phone: newStudent.parentPhone,
          parent_email: newStudent.parentEmail,
          level: newStudent.level,
          plan: newStudent.plan,
          notes: newStudent.notes,
          status: "Ativo",
          start_date: new Date().toISOString().split("T")[0],
        },
      ])

      if (error) throw error

      await loadStudents()
      resetAndCloseDialog("student")
      alert("Aluno cadastrado com sucesso!")
    } catch (error) {
      console.error("Erro ao cadastrar aluno:", error)
      alert("Erro ao cadastrar aluno: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  const savePlan = async () => {
    if (!newPlan.name || !newPlan.pricePerClass || !newPlan.classesPerMonth) {
      alert("Por favor, preencha todos os campos obrigatórios")
      return
    }

    setLoading(true)
    try {
      const features = newPlan.features.split("\n").filter((f) => f.trim())
      const monthlyPrice = Number.parseFloat(newPlan.pricePerClass) * Number.parseInt(newPlan.classesPerMonth)

      const { data, error } = await supabase.from("plans").insert([
        {
          name: newPlan.name,
          description: newPlan.description,
          price_per_class: Number.parseFloat(newPlan.pricePerClass),
          monthly_price: monthlyPrice,
          classes_per_month: Number.parseInt(newPlan.classesPerMonth),
          duration: Number.parseInt(newPlan.duration) || 60,
          features: features,
          active: true,
        },
      ])

      if (error) throw error

      await loadPlans()
      resetAndCloseDialog("plan")
      alert("Plano cadastrado com sucesso!")
    } catch (error) {
      console.error("Erro ao cadastrar plano:", error)
      alert("Erro ao cadastrar plano: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  const savePaymentMethod = async () => {
    if (!newPaymentMethod.name) {
      alert("Por favor, preencha o nome da forma de pagamento")
      return
    }

    setLoading(true)
    try {
      const { data, error } = await supabase.from("payment_methods").insert([
        {
          name: newPaymentMethod.name,
          description: newPaymentMethod.description,
          discount: Number.parseFloat(newPaymentMethod.discount) || 0,
          active: newPaymentMethod.active,
        },
      ])

      if (error) throw error

      await loadPaymentMethods()
      resetAndCloseDialog("payment")
      alert("Forma de pagamento cadastrada com sucesso!")
    } catch (error) {
      console.error("Erro ao cadastrar forma de pagamento:", error)
      alert("Erro ao cadastrar forma de pagamento: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  const saveExam = async () => {
    if (!newExam.title || !newExam.level || !newExam.questions) {
      alert("Por favor, preencha todos os campos obrigatórios")
      return
    }

    setLoading(true)
    try {
      let fileUrl = null

      if (newExam.file) {
        const fileExt = newExam.file.name.split(".").pop()
        const fileName = `${Date.now()}.${fileExt}`

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("exam-files")
          .upload(fileName, newExam.file)

        if (uploadError) throw uploadError

        const { data: urlData } = supabase.storage.from("exam-files").getPublicUrl(fileName)
        fileUrl = urlData.publicUrl
      }

      const { data, error } = await supabase.from("exams").insert([
        {
          title: newExam.title,
          description: newExam.description,
          level: newExam.level,
          questions: Number.parseInt(newExam.questions),
          time_limit: Number.parseInt(newExam.timeLimit) || 30,
          file_url: fileUrl,
          active: true,
        },
      ])

      if (error) throw error

      await loadExams()
      resetAndCloseDialog("exam")
      alert("Prova cadastrada com sucesso!")
    } catch (error) {
      console.error("Erro ao cadastrar prova:", error)
      alert("Erro ao cadastrar prova: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  const AppSidebar = () => (
    <Sidebar className="border-r-2 border-indigo-100">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center relative">
            <span className="text-white font-bold text-sm">MM</span>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center">
              <Settings className="w-2 h-2 text-white" />
            </div>
          </div>
          <div>
            <span className="font-bold text-lg text-gray-800">Painel Admin</span>
            <p className="text-xs text-indigo-600 font-medium">Michelle Marques</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600 font-semibold">Administração</SidebarGroupLabel>
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
      case "admins":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Administradores</h2>
                <p className="text-gray-600">Gerencie os administradores do sistema</p>
              </div>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800">
                  <strong>Nota:</strong> Administradores são gerenciados diretamente no banco de dados.
                </p>
              </div>
            </div>

            <Card className="border-2 border-indigo-100">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>E-mail</TableHead>
                      <TableHead>Função</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Criado em</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {admins.map((admin) => (
                      <TableRow key={admin.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-gradient-to-r from-indigo-400 to-purple-400 text-white text-xs">
                                {admin.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{admin.name}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{admin.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{admin.role}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={admin.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                            {admin.active ? "Ativo" : "Inativo"}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(admin.created_at).toLocaleDateString("pt-BR")}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={admin.active}
                              onCheckedChange={() => toggleAdminStatus(admin.id, admin.active)}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )

      // Outras seções permanecem iguais, mas sem a opção de cadastrar admin...
      case "students":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Gerenciar Alunos</h2>
                <p className="text-gray-600">Cadastre e gerencie os dados dos seus alunos</p>
              </div>
              <Dialog open={dialogStates.student} onOpenChange={(open) => toggleDialog("student", open)}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Aluno
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Cadastrar Novo Aluno</DialogTitle>
                    <DialogDescription>Preencha os dados do aluno e responsável</DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-800">Dados do Aluno</h4>
                      <div>
                        <Label htmlFor="student-name">Nome Completo *</Label>
                        <Input
                          id="student-name"
                          placeholder="Nome do aluno"
                          value={newStudent.name}
                          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="student-age">Idade *</Label>
                        <Input
                          id="student-age"
                          type="number"
                          placeholder="8"
                          value={newStudent.age}
                          onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="student-email">E-mail do Aluno</Label>
                        <Input
                          id="student-email"
                          type="email"
                          placeholder="aluno@email.com"
                          value={newStudent.email}
                          onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="student-level">Nível</Label>
                        <Select
                          value={newStudent.level}
                          onValueChange={(value) => setNewStudent({ ...newStudent, level: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o nível" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Básico I">Básico I</SelectItem>
                            <SelectItem value="Básico II">Básico II</SelectItem>
                            <SelectItem value="Intermediário">Intermediário</SelectItem>
                            <SelectItem value="Avançado">Avançado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="student-plan">Plano</Label>
                        <Select
                          value={newStudent.plan}
                          onValueChange={(value) => setNewStudent({ ...newStudent, plan: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o plano" />
                          </SelectTrigger>
                          <SelectContent>
                            {plans.map((plan) => (
                              <SelectItem key={plan.id} value={plan.name}>
                                {plan.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-800">Dados do Responsável</h4>
                      <div>
                        <Label htmlFor="parent-name">Nome do Responsável *</Label>
                        <Input
                          id="parent-name"
                          placeholder="Nome do responsável"
                          value={newStudent.parentName}
                          onChange={(e) => setNewStudent({ ...newStudent, parentName: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="parent-phone">Telefone</Label>
                        <Input
                          id="parent-phone"
                          placeholder="(11) 99999-9999"
                          value={newStudent.parentPhone}
                          onChange={(e) => setNewStudent({ ...newStudent, parentPhone: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="parent-email">E-mail *</Label>
                        <Input
                          id="parent-email"
                          type="email"
                          placeholder="email@exemplo.com"
                          value={newStudent.parentEmail}
                          onChange={(e) => setNewStudent({ ...newStudent, parentEmail: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="student-notes">Observações Psicopedagógicas</Label>
                        <Textarea
                          id="student-notes"
                          placeholder="Observações sobre o aluno..."
                          value={newStudent.notes}
                          onChange={(e) => setNewStudent({ ...newStudent, notes: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => resetAndCloseDialog("student")}>
                      Cancelar
                    </Button>
                    <Button
                      className="bg-gradient-to-r from-green-600 to-teal-600"
                      onClick={saveStudent}
                      disabled={loading}
                    >
                      {loading ? "Salvando..." : "Salvar Aluno"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Card className="border-2 border-blue-100">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Aluno</TableHead>
                      <TableHead>Responsável</TableHead>
                      <TableHead>Nível</TableHead>
                      <TableHead>Plano</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-400 text-white text-xs">
                                {student.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{student.name}</p>
                              <p className="text-sm text-gray-600">{student.age} anos</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{student.parent_name}</p>
                            <p className="text-sm text-gray-600">{student.parent_phone}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{student.level}</Badge>
                        </TableCell>
                        <TableCell>{student.plan}</TableCell>
                        <TableCell>
                          <Badge className={student.status === "Ativo" ? "bg-green-100 text-green-800" : ""}>
                            {student.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700 bg-transparent"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Configurações Gerais</h2>
              <p className="text-gray-600">Personalize a identidade visual e informações da plataforma</p>
            </div>
            <Card className="border-2 border-indigo-100">
              <CardContent className="p-6 text-center">
                <Settings className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
                <h3 className="font-bold text-xl text-gray-800 mb-2">Configurações em Desenvolvimento</h3>
                <p className="text-gray-600">Esta seção será implementada em breve.</p>
              </CardContent>
            </Card>
          </div>
        )
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <AppSidebar />
        <div className="flex-1">
          <header className="bg-white/90 backdrop-blur-sm border-b-2 border-indigo-100 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <div>
                  <h1 className="text-xl font-bold text-gray-800">Painel Administrativo</h1>
                  <p className="text-sm text-indigo-600">Gerencie sua plataforma educacional</p>
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
