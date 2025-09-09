import axios from 'axios'

// API client configuration
export const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle auth errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear invalid token
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')
      // Redirect to login or refresh page
      window.location.reload()
    }
    return Promise.reject(error)
  }
)

// Types
export interface User {
  id: number
  email: string
  username: string
  role: 'user' | 'admin'
  is_active: boolean
  created_at: string
}

export interface Lesson {
  id: number
  slug: string
  title: string
  order: number
  module_number?: number
  is_unlocked?: boolean
  is_completed?: boolean
}

export interface LessonDetail extends Lesson {
  story: string
  reflection: string
  challenge: string
  quiz: string
  created_at: string
  updated_at: string
}

export interface Progress {
  total_lessons: number
  completed_lessons: number
  completion_percentage: number
  completed_lesson_ids: number[]
}

export interface AuthResponse {
  access_token: string
  token_type: string
}

export interface LoginData {
  username: string
  password: string
}

export interface RegisterData {
  email: string
  username: string
  password: string
}

export interface AdminUser extends User {
  completed_lessons_count: number
  total_lessons: number
  progress_percentage: number
  current_lesson_id: number | null
  current_lesson_title: string | null
  last_activity: string | null
}

export interface AdminDashboardStats {
  total_users: number
  total_lessons: number
  total_completions: number
  active_users: number
  completion_rate: number
}

// API functions
export const api = {
  // Auth endpoints
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/login', data)
    return response.data
  },

  register: async (data: RegisterData): Promise<User> => {
    const response = await apiClient.post('/auth/register', data)
    return response.data
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get('/auth/me')
    return response.data
  },

  // Lessons endpoints
  getLessons: async (): Promise<Lesson[]> => {
    const response = await apiClient.get('/lessons')
    return response.data
  },

  getLesson: async (id: number): Promise<LessonDetail> => {
    const response = await apiClient.get(`/lessons/${id}`)
    return response.data
  },

  completeLesson: async (id: number): Promise<void> => {
    await apiClient.post(`/lessons/${id}/complete`)
  },

  // Progress endpoint
  getProgress: async (): Promise<Progress> => {
    const response = await apiClient.get('/progress')
    return response.data
  },

  // Admin endpoints
  getAdminDashboard: async (): Promise<AdminDashboardStats> => {
    const response = await apiClient.get('/admin/dashboard')
    return response.data
  },

  getAdminUsers: async (): Promise<AdminUser[]> => {
    const response = await apiClient.get('/admin/users')
    return response.data
  },

  updateUser: async (userId: number, userData: Partial<AdminUser>): Promise<AdminUser> => {
    const response = await apiClient.put(`/admin/users/${userId}`, userData)
    return response.data
  },

  deleteUser: async (userId: number): Promise<void> => {
    await apiClient.delete(`/admin/users/${userId}`)
  },
} 