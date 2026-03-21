

const BASE_URL = import.meta.env.VITE_API_URL

// type

export interface Stats {
    total_songs: number
    total_listens: number
    signals: {
        positive: number
        skip: number
        partial: number
        repeat: number
    }
    most_played_artists: Record<string, number>
    most_played_songs: {
        title: string
        artist: string
        play_count: number
    }[]
}

export interface LoginRequest {
    username: string
    password: string
}

export interface LoginResponse {
    status: "success" | "failed"
    JWT?: string
    reason?: string
}

export interface CreateUserRequest {
    username: string
    password: string
    isAdmin: boolean
    admin: string
    adminPD: string
    email: string
    name: string
}

export interface CreateUserResponse {
    status: "success" | "failed"
    reason?: string
    username?: string
}

export interface AdminAuthRequest {
    admin: string
    adminPD: string
}

export interface User {
    username: string
    password: string
    isAdmin: boolean
}

export interface GetUsersResponse {
    status: "ok" | "failed"
    users?: User[]
    reason?: string
}

// API Calls

export async function fetchPing(): Promise<{ status: string }> {
    const res = await fetch(`${BASE_URL}/api/ping`)
    if (!res.ok) throw new Error("Ping failed")
    return res.json()
}

export async function fetchStats(): Promise<Stats> {
    const res = await fetch(`${BASE_URL}/api/stats`)
    if (!res.ok) throw new Error("Failed to fetch stats")
    return res.json()
}

export async function fetchLogin(data: LoginRequest): Promise<LoginResponse> {
    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    if (!res.ok) throw new Error("Login failed")
    return res.json()
}

export async function fetchCreateUser(data: CreateUserRequest): Promise<CreateUserResponse> {
    const res = await fetch(`${BASE_URL}/admin/create-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    if (!res.ok) throw new Error("Failed to create user")
    return res.json()
}

export async function fetchGetUsers(data: AdminAuthRequest): Promise<GetUsersResponse> {
    const res = await fetch(`${BASE_URL}/admin/get-users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    if (!res.ok) throw new Error("Failed to get users")
    return res.json()
}