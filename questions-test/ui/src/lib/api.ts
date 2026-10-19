export type User = {
  id: number
  name: string | null
  email: string
  createdAt: string
}
export type AuthResponse = {
  user: User
}

export type ExcelImportError = {
  row: number
  message: string
}

export type ExcelImportResult = {
  imported: number
  failed: number
  errors: ExcelImportError[]
}

export type ExcelImportPreview = {
  valid: number
  failed: number
  rows: {
    row: number
    question: { code: string; text: string; category: string; type: string } | null
    errors: string[]
  }[]
}

export class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = "ApiError"
    this.status = status
  }
}

const API_BASE_URL = "/api"

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response

  try {
    const headers = new Headers(init?.headers)
    if (!(init?.body instanceof FormData)) {
      headers.set("Content-Type", "application/json")
    }

    response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      credentials: "include",
      headers,
    })
  } catch {
    throw new ApiError(0, "Tidak dapat terhubung ke server. Coba lagi.")
  }

  if (!response.ok) {
    let message = `Terjadi kesalahan (${response.status})`

    try {
      const data = (await response.json()) as { message?: string }
      if (data?.message) message = data.message
    } catch {
      // Respons bukan JSON — pakai pesan baku.
    }

    throw new ApiError(response.status, message)
  }

  if (response.status === 204) return undefined as T

  return (await response.json()) as T
}

export function login(input: { email: string; password: string }) {
  return request<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  })
}

export function register(input: {
  name?: string
  email: string
  password: string
}) {
  return request<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(input),
  })
}

export function logout() {
  return request<void>("/auth/logout", { method: "POST" })
}

export function getCurrentUser() {
  return request<User>("/users/me")
}

export function importQuestions(file: File) {
  const formData = new FormData()
  formData.append("file", file)

  return request<ExcelImportResult>("/questions/import", {
    method: "POST",
    body: formData,
  })
}

export function previewQuestionsImport(file: File) {
  const formData = new FormData()
  formData.append("file", file)

  return request<ExcelImportPreview>("/questions/import/preview", {
    method: "POST",
    body: formData,
  })
}
