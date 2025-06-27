// Configuração para integração com Google Calendar API
export interface GoogleCalendarConfig {
  clientId: string
  clientSecret: string
  redirectUri: string
  scopes: string[]
}

export interface CalendarEvent {
  id?: string
  summary: string
  description?: string
  start: {
    dateTime: string
    timeZone: string
  }
  end: {
    dateTime: string
    timeZone: string
  }
  attendees?: Array<{
    email: string
    displayName?: string
  }>
  reminders?: {
    useDefault: boolean
    overrides?: Array<{
      method: string
      minutes: number
    }>
  }
}

export class GoogleCalendarService {
  private config: GoogleCalendarConfig
  private accessToken: string | null = null

  constructor(config: GoogleCalendarConfig) {
    this.config = config
  }

  // Autenticar com Google
  async authenticate(): Promise<string> {
    const authUrl =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${this.config.clientId}&` +
      `redirect_uri=${this.config.redirectUri}&` +
      `scope=${this.config.scopes.join(" ")}&` +
      `response_type=code&` +
      `access_type=offline`

    return authUrl
  }

  // Trocar código por token de acesso
  async exchangeCodeForToken(code: string): Promise<void> {
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        code,
        grant_type: "authorization_code",
        redirect_uri: this.config.redirectUri,
      }),
    })

    const data = await response.json()
    this.accessToken = data.access_token
  }

  // Criar evento no calendário
  async createEvent(event: CalendarEvent): Promise<string> {
    if (!this.accessToken) {
      throw new Error("Não autenticado com Google Calendar")
    }

    const response = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    })

    const data = await response.json()
    return data.id
  }

  // Atualizar evento
  async updateEvent(eventId: string, event: CalendarEvent): Promise<void> {
    if (!this.accessToken) {
      throw new Error("Não autenticado com Google Calendar")
    }

    await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    })
  }

  // Deletar evento
  async deleteEvent(eventId: string): Promise<void> {
    if (!this.accessToken) {
      throw new Error("Não autenticado com Google Calendar")
    }

    await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    })
  }

  // Listar eventos
  async listEvents(timeMin?: string, timeMax?: string): Promise<CalendarEvent[]> {
    if (!this.accessToken) {
      throw new Error("Não autenticado com Google Calendar")
    }

    const params = new URLSearchParams({
      orderBy: "startTime",
      singleEvents: "true",
    })

    if (timeMin) params.append("timeMin", timeMin)
    if (timeMax) params.append("timeMax", timeMax)

    const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?${params}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    })

    const data = await response.json()
    return data.items || []
  }

  // Verificar disponibilidade
  async checkAvailability(start: string, end: string): Promise<boolean> {
    const events = await this.listEvents(start, end)
    return events.length === 0
  }
}

// Função helper para criar evento de aula
export function createClassEvent(
  studentName: string,
  parentEmail: string,
  teacherEmail: string,
  startTime: string,
  endTime: string,
  isOnline = false,
): CalendarEvent {
  return {
    summary: `Aula de Inglês - ${studentName}`,
    description: `Aula individual de inglês com Michelle Marques\n\nAluno: ${studentName}\nModalidade: ${isOnline ? "Online" : "Presencial"}`,
    start: {
      dateTime: startTime,
      timeZone: "America/Sao_Paulo",
    },
    end: {
      dateTime: endTime,
      timeZone: "America/Sao_Paulo",
    },
    attendees: [
      {
        email: parentEmail,
        displayName: `Responsável - ${studentName}`,
      },
      {
        email: teacherEmail,
        displayName: "Michelle Marques",
      },
    ],
    reminders: {
      useDefault: false,
      overrides: [
        {
          method: "email",
          minutes: 60, // 1 hora antes
        },
        {
          method: "popup",
          minutes: 15, // 15 minutos antes
        },
      ],
    },
  }
}
