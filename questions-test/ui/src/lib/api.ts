export type User = {
  id: number
  name: string | null
  email: string
  createdAt: string
}

export type AuthResponse = {
  user: User
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
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...init?.headers,
      },
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
