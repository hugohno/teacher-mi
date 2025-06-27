import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos TypeScript para as tabelas
export interface Student {
  id: number
  name: string
  age: number
  email: string
  parent_name: string
  parent_phone: string
  parent_email: string
  level: string
  plan: string
  status: string
  start_date: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface Plan {
  id: number
  name: string
  description: string
  price_per_class: number
  monthly_price: number
  classes_per_month: number
  duration: number
  features: string[]
  active: boolean
  created_at: string
  updated_at: string
}

export interface PaymentMethod {
  id: number
  name: string
  description: string
  discount: number
  active: boolean
  created_at: string
  updated_at: string
}

export interface Exam {
  id: number
  title: string
  description: string
  level: string
  questions: number
  time_limit: number
  file_url?: string
  active: boolean
  created_at: string
  updated_at: string
}

export interface Class {
  id: number
  student_id: number
  teacher_name: string
  date: string
  start_time: string
  end_time: string
  type: string
  status: string
  focus?: string
  notes?: string
  google_event_id?: string
  created_at: string
  updated_at: string
}

export interface Payment {
  id: number
  student_id: number
  amount: number
  due_date: string
  payment_date?: string
  status: string
  payment_method?: string
  month_reference: string
  created_at: string
  updated_at: string
}

// Adicionar interface para Admin
export interface Admin {
  id: number
  email: string
  name: string
  password_hash?: string
  role: string
  active: boolean
  created_at: string
  updated_at: string
}

// Funções helper para operações no banco
export const studentService = {
  async getAll() {
    const { data, error } = await supabase.from("students").select("*").order("created_at", { ascending: false })
    return { data, error }
  },

  async create(student: Omit<Student, "id" | "created_at" | "updated_at">) {
    const { data, error } = await supabase.from("students").insert([student]).select()
    return { data, error }
  },

  async update(id: number, updates: Partial<Student>) {
    const { data, error } = await supabase.from("students").update(updates).eq("id", id).select()
    return { data, error }
  },

  async delete(id: number) {
    const { error } = await supabase.from("students").delete().eq("id", id)
    return { error }
  },
}

export const planService = {
  async getAll() {
    const { data, error } = await supabase.from("plans").select("*").order("created_at", { ascending: false })
    return { data, error }
  },

  async create(plan: Omit<Plan, "id" | "created_at" | "updated_at">) {
    const { data, error } = await supabase.from("plans").insert([plan]).select()
    return { data, error }
  },

  async update(id: number, updates: Partial<Plan>) {
    const { data, error } = await supabase.from("plans").update(updates).eq("id", id).select()
    return { data, error }
  },

  async delete(id: number) {
    const { error } = await supabase.from("plans").delete().eq("id", id)
    return { error }
  },
}

export const examService = {
  async getAll() {
    const { data, error } = await supabase.from("exams").select("*").order("created_at", { ascending: false })
    return { data, error }
  },

  async create(exam: Omit<Exam, "id" | "created_at" | "updated_at">) {
    const { data, error } = await supabase.from("exams").insert([exam]).select()
    return { data, error }
  },

  async uploadFile(file: File) {
    const fileExt = file.name.split(".").pop()
    const fileName = `${Date.now()}.${fileExt}`

    const { data, error } = await supabase.storage.from("exam-files").upload(fileName, file)

    if (error) return { data: null, error }

    const { data: urlData } = supabase.storage.from("exam-files").getPublicUrl(fileName)

    return { data: urlData.publicUrl, error: null }
  },
}

// Adicionar serviço para administradores
export const adminService = {
  async getAll() {
    const { data, error } = await supabase.from("admins").select("*").order("created_at", { ascending: false })
    return { data, error }
  },

  async getByEmail(email: string) {
    const { data, error } = await supabase.from("admins").select("*").eq("email", email).eq("active", true).single()
    return { data, error }
  },

  async updatePassword(id: number, passwordHash: string) {
    const { data, error } = await supabase.from("admins").update({ password_hash: passwordHash }).eq("id", id).select()
    return { data, error }
  },

  async toggleStatus(id: number, active: boolean) {
    const { data, error } = await supabase.from("admins").update({ active }).eq("id", id).select()
    return { data, error }
  },

  async create(admin: Omit<Admin, "id" | "created_at" | "updated_at">) {
    const { data, error } = await supabase.from("admins").insert([admin]).select()
    return { data, error }
  },
}
