"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Star,
  Trophy,
  BookOpen,
  Gamepad2,
  FileText,
  Play,
  Lock,
  CheckCircle,
  Target,
  Zap,
  Award,
  Brain,
  Sparkles,
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
  { title: "Meu Progresso", icon: Target, id: "progress" },
  { title: "Material de Estudo", icon: BookOpen, id: "materials" },
  { title: "Jogos Interativos", icon: Gamepad2, id: "games" },
  { title: "Atividades", icon: FileText, id: "activities" },
  { title: "Conquistas", icon: Trophy, id: "achievements" },
]

export default function StudentDashboard() {
  const [activeSection, setActiveSection] = useState("progress")

  const studentData = {
    name: "Ana Silva",
    level: "Básico I",
    progress: 75,
    avatar: "/placeholder.svg?height=60&width=60",
    points: 1450,
    streak: 12,
    nextLevel: "Básico II",
  }

  const achievements = [
    {
      id: 1,
      name: "Primeira Aula",
      description: "Completou sua primeira aula com Michelle",
      icon: Star,
      earned: true,
      color: "text-yellow-500",
    },
    {
      id: 2,
      name: "Vocabulário Master",
      description: "Aprendeu 50 palavras novas",
      icon: BookOpen,
      earned: true,
      color: "text-blue-500",
    },
    {
      id: 3,
      name: "Sequência de 10 dias",
      description: "Estudou por 10 dias seguidos",
      icon: Zap,
      earned: true,
      color: "text-orange-500",
    },
    {
      id: 4,
      name: "Jogo Expert",
      description: "Completou 15 jogos",
      icon: Gamepad2,
      earned: true,
      color: "text-purple-500",
    },
    {
      id: 5,
      name: "Super Aluno",
      description: "Completou 25 atividades",
      icon: Trophy,
      earned: false,
      color: "text-green-500",
    },
    {
      id: 6,
      name: "Cérebro Brilhante",
      description: "Aprovado na avaliação psicopedagógica",
      icon: Brain,
      earned: true,
      color: "text-teal-500",
    },
  ]

  const materials = [
    { id: 1, title: "Colors and Shapes", type: "Vídeo", duration: "5 min", completed: true, focus: "Visual" },
    { id: 2, title: "Family Members", type: "Áudio", duration: "3 min", completed: true, focus: "Auditivo" },
    { id: 3, title: "Numbers 1-20", type: "Exercício", duration: "10 min", completed: true, focus: "Cinestésico" },
    { id: 4, title: "Daily Routines", type: "Vídeo", duration: "7 min", completed: false, focus: "Visual" },
    { id: 5, title: "Animals Sounds", type: "Jogo", duration: "8 min", completed: false, focus: "Auditivo" },
  ]

  const games = [
    { id: 1, title: "Word Match", description: "Combine palavras com imagens", difficulty: "Fácil", completed: true },
    { id: 2, title: "Spelling Bee", description: "Pratique a ortografia", difficulty: "Médio", completed: true },
    { id: 3, title: "Grammar Quest", description: "Aventura gramatical", difficulty: "Médio", completed: false },
    { id: 4, title: "Memory Palace", description: "Técnica de memorização", difficulty: "Avançado", completed: false },
  ]

  const activities = [
    { id: 1, title: "Quiz: Colors", type: "Quiz", questions: 10, completed: true, score: 9 },
    { id: 2, title: "Complete the Sentences", type: "Exercício", questions: 15, completed: true, score: 13 },
    { id: 3, title: "Listening Practice", type: "Áudio", questions: 8, completed: false, score: null },
    { id: 4, title: "Speaking Challenge", type: "Oral", questions: 5, completed: false, score: null },
  ]

  const AppSidebar = () => (
    <Sidebar className="border-r-2 border-purple-100">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center relative">
            <span className="text-white font-bold text-sm">MM</span>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-2 h-2 text-white" />
            </div>
          </div>
          <div>
            <span className="font-bold text-lg text-gray-800">Michelle Marques</span>
            <p className="text-xs text-purple-600 font-medium">Sua Psicopedagoga</p>
          </div>
        </div>
        <div className="mt-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src={studentData.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-gradient-to-r from-purple-400 to-pink-400 text-white text-sm">
                AS
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm">{studentData.name}</p>
              <p className="text-xs text-gray-600">{studentData.level}</p>
            </div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600 font-semibold">Menu do Aluno</SidebarGroupLabel>
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
      case "progress":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Olá, {studentData.name}! 🌟</h2>
              <p className="text-gray-600">Continue assim com a Michelle, você está indo muito bem!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-2xl text-gray-800">{studentData.points}</h3>
                  <p className="text-gray-600">Pontos</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-red-50">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-2xl text-gray-800">{studentData.streak}</h3>
                  <p className="text-gray-600">Dias seguidos</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-blue-50">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-800">{studentData.level}</h3>
                  <p className="text-gray-600">Nível Atual</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-2 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-600" />
                  Seu Progresso com Michelle
                </CardTitle>
                <CardDescription>Você está quase no próximo nível!</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">{studentData.level}</span>
                    <span className="font-medium">{studentData.nextLevel}</span>
                  </div>
                  <Progress value={studentData.progress} className="h-4" />
                  <p className="text-center text-sm text-gray-600 mt-2">{studentData.progress}% completo</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <BookOpen className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                    <p className="text-sm font-medium">Vocabulário</p>
                    <p className="text-xs text-gray-600">90%</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <FileText className="w-6 h-6 text-green-500 mx-auto mb-1" />
                    <p className="text-sm font-medium">Gramática</p>
                    <p className="text-xs text-gray-600">75%</p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <Play className="w-6 h-6 text-purple-500 mx-auto mb-1" />
                    <p className="text-sm font-medium">Conversação</p>
                    <p className="text-xs text-gray-600">80%</p>
                  </div>
                  <div className="text-center p-3 bg-teal-50 rounded-lg">
                    <Brain className="w-6 h-6 text-teal-500 mx-auto mb-1" />
                    <p className="text-sm font-medium">Concentração</p>
                    <p className="text-xs text-gray-600">85%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-teal-200 bg-gradient-to-r from-teal-50 to-blue-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">Parabéns! 🎉</h3>
                    <p className="text-gray-600">
                      Michelle está muito orgulhosa do seu progresso! Você ganhou a conquista "Cérebro Brilhante"!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "materials":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Material de Estudo 📚</h2>
              <p className="text-gray-600">Materiais especiais preparados pela Michelle</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {materials.map((material) => (
                <Card
                  key={material.id}
                  className={`border-2 ${material.completed ? "border-green-200 bg-green-50" : "border-teal-200"}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            material.completed
                              ? "bg-gradient-to-r from-green-400 to-green-500"
                              : "bg-gradient-to-r from-teal-400 to-blue-400"
                          }`}
                        >
                          {material.completed ? (
                            <CheckCircle className="w-6 h-6 text-white" />
                          ) : (
                            <BookOpen className="w-6 h-6 text-white" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{material.title}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{material.type}</Badge>
                            <Badge variant="secondary">{material.focus}</Badge>
                            <span className="text-sm text-gray-600">{material.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button
                      className={`w-full ${
                        material.completed
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
                      }`}
                      disabled={material.completed}
                    >
                      {material.completed ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Concluído
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Começar
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-2 border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">Dica da Michelle! 💡</h3>
                    <p className="text-gray-600">
                      "Cada material foi escolhido especialmente para o seu estilo de aprendizagem. Continue
                      praticando!"
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "games":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Jogos Interativos 🎮</h2>
              <p className="text-gray-600">Jogos especiais criados pela Michelle para você!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {games.map((game) => (
                <Card
                  key={game.id}
                  className={`border-2 ${game.completed ? "border-green-200" : "border-purple-200"} hover:shadow-lg transition-shadow`}
                >
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
                          game.completed
                            ? "bg-gradient-to-r from-green-400 to-green-500"
                            : "bg-gradient-to-r from-purple-400 to-pink-400"
                        }`}
                      >
                        <Gamepad2 className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{game.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{game.description}</p>
                      <Badge
                        variant={
                          game.difficulty === "Fácil"
                            ? "default"
                            : game.difficulty === "Médio"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {game.difficulty}
                      </Badge>
                    </div>

                    <Button
                      className={`w-full ${
                        game.completed
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      }`}
                    >
                      {game.completed ? (
                        <>
                          <Trophy className="w-4 h-4 mr-2" />
                          Jogar Novamente
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Jogar
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case "activities":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Atividades 📝</h2>
              <p className="text-gray-600">Atividades preparadas especialmente pela Michelle!</p>
            </div>

            <div className="space-y-4">
              {activities.map((activity) => (
                <Card
                  key={activity.id}
                  className={`border-2 ${activity.completed ? "border-green-200 bg-green-50" : "border-orange-200"}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            activity.completed
                              ? "bg-gradient-to-r from-green-400 to-green-500"
                              : "bg-gradient-to-r from-orange-400 to-red-400"
                          }`}
                        >
                          {activity.completed ? (
                            <CheckCircle className="w-6 h-6 text-white" />
                          ) : (
                            <FileText className="w-6 h-6 text-white" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{activity.title}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{activity.type}</Badge>
                            <span className="text-sm text-gray-600">{activity.questions} questões</span>
                            {activity.completed && activity.score && (
                              <Badge className="bg-green-100 text-green-800">
                                {activity.score}/{activity.questions} ⭐
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <Button
                        className={`${
                          activity.completed
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                        }`}
                      >
                        {activity.completed ? (
                          <>
                            <Trophy className="w-4 h-4 mr-2" />
                            Ver Resultado
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Começar
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case "achievements":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Conquistas 🏆</h2>
              <p className="text-gray-600">Veja todas as suas conquistas com Michelle!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className={`border-2 ${
                    achievement.earned
                      ? "border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                        achievement.earned ? "bg-gradient-to-r from-yellow-400 to-orange-400" : "bg-gray-300"
                      }`}
                    >
                      {achievement.earned ? (
                        <achievement.icon className={`w-8 h-8 text-white`} />
                      ) : (
                        <Lock className="w-8 h-8 text-gray-500" />
                      )}
                    </div>
                    <h3 className={`font-bold text-lg mb-2 ${achievement.earned ? "text-gray-800" : "text-gray-500"}`}>
                      {achievement.name}
                    </h3>
                    <p className={`text-sm ${achievement.earned ? "text-gray-600" : "text-gray-400"}`}>
                      {achievement.description}
                    </p>
                    {achievement.earned && (
                      <Badge className="mt-3 bg-yellow-100 text-yellow-800">Conquistado! ⭐</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-2 border-teal-200 bg-gradient-to-r from-teal-50 to-blue-50">
              <CardContent className="p-6 text-center">
                <Trophy className="w-12 h-12 text-teal-500 mx-auto mb-4" />
                <h3 className="font-bold text-xl text-gray-800 mb-2">Continue estudando com Michelle!</h3>
                <p className="text-gray-600 mb-4">
                  Você já conquistou {achievements.filter((a) => a.earned).length} de {achievements.length} conquistas.
                  Michelle está muito orgulhosa de você!
                </p>
                <Progress
                  value={(achievements.filter((a) => a.earned).length / achievements.length) * 100}
                  className="h-3 mb-4"
                />
                <p className="text-sm text-gray-500">
                  {Math.round((achievements.filter((a) => a.earned).length / achievements.length) * 100)}% completo
                </p>
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
      <div className="flex min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <AppSidebar />
        <div className="flex-1">
          <header className="bg-white/90 backdrop-blur-sm border-b-2 border-purple-100 p-4">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-xl font-bold text-gray-800">Área do Aluno</h1>
                <p className="text-sm text-purple-600">Aprendendo com Michelle Marques - Psicopedagoga! 🌟</p>
              </div>
            </div>
          </header>
          <main className="p-6">{renderContent()}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
