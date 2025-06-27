import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export const authService = {
  // Login com Google
  async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    return { data, error }
  },

  // Login com email/senha
  async signInWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  },

  // Login específico para admin (verifica na tabela admins)
  async signInAsAdmin(email: string, password: string) {
    try {
      // Primeiro verificar se é um admin válido
      const { data: adminData, error: adminError } = await supabase
        .from("admins")
        .select("*")
        .eq("email", email)
        .eq("active", true)
        .single()

      if (adminError || !adminData) {
        return { data: null, error: { message: "Acesso de administrador não autorizado" } }
      }

      // Se o admin não tem senha definida, permitir login temporário
      if (!adminData.password_hash) {
        // Fazer login normal no Supabase Auth
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        return { data, error, isAdmin: true }
      }

      // TODO: Implementar verificação de senha com bcrypt
      // Por enquanto, fazer login normal no Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return { data: null, error }
      }

      return { data, error: null, isAdmin: true }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Criar conta com email/senha
  async signUpWithEmail(email: string, password: string, metadata?: any) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    })
    return { data, error }
  },

  // Logout
  async signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Obter usuário atual
  async getCurrentUser() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()
    return { user, error }
  },

  // Verificar se está logado
  async getSession() {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession()
    return { session, error }
  },

  // Escutar mudanças de autenticação
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback)
  },
}

export { supabase }
