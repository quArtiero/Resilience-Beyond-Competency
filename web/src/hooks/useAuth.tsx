import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api, User, LoginData, RegisterData } from '../api/client'
import { useNotifications } from '../components/NotificationSystem'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (data: LoginData) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const queryClient = useQueryClient()
  const { addNotification } = useNotifications()

  // Helper function to safely check localStorage
  const hasToken = () => {
    try {
      return typeof window !== 'undefined' && !!localStorage.getItem('access_token')
    } catch {
      return false
    }
  }

  // Check if user is logged in on mount
  const { data: currentUser, isLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: api.getCurrentUser,
    enabled: isInitialized && hasToken(),
    retry: 1,  // Retry once if token is valid but request fails
    staleTime: 1000 * 60 * 5,  // 5 minutes - don't refetch too aggressively
    cacheTime: 1000 * 60 * 30, // 30 minutes - keep in cache longer
  })

  // Initialize auth state on mount
  useEffect(() => {
    setIsInitialized(true)
  }, [])

  // Update user state when currentUser changes
  useEffect(() => {
    if (currentUser) {
      setUser(currentUser)
      localStorage.setItem('user', JSON.stringify(currentUser))
    }
  }, [currentUser])

  // Check for stored user on mount - run once on initialization
  useEffect(() => {
    if (isInitialized && !user) {
      const storedUser = localStorage.getItem('user')
      const storedToken = localStorage.getItem('access_token')
      
      if (storedUser && storedToken) {
        try {
          const parsedUser = JSON.parse(storedUser)
          console.log('Restoring user from localStorage:', parsedUser.username)
          setUser(parsedUser)
        } catch (error) {
          console.error('Error parsing stored user:', error)
          // Clear invalid stored data
          localStorage.removeItem('user')
          localStorage.removeItem('access_token')
        }
      }
    }
  }, [isInitialized, user])

  const loginMutation = useMutation({
    mutationFn: api.login,
    onSuccess: async (authResponse) => {
      console.log('Login successful, token received')
      localStorage.setItem('access_token', authResponse.access_token)
      try {
        // Fetch user data after successful login
        const userData = await api.getCurrentUser()
        console.log('User data fetched:', userData)
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
        queryClient.invalidateQueries({ queryKey: ['currentUser'] })
        queryClient.invalidateQueries({ queryKey: ['progress'] })
        queryClient.invalidateQueries({ queryKey: ['lessons'] })
        addNotification({
          type: 'success',
          title: 'Welcome back!',
          message: `Successfully signed in as ${userData.username}`
        })
      } catch (error) {
        console.error('Error fetching user data after login:', error)
        throw error
      }
    },
    onError: (error) => {
      console.error('Login error:', error)
      addNotification({
        type: 'error',
        title: 'Sign in failed',
        message: (error as any).response?.data?.detail || 'Please check your credentials and try again'
      })
    }
  })

  const registerMutation = useMutation({
    mutationFn: api.register,
    onSuccess: (userData) => {
      // Registration successful but user is not logged in yet
      // They need to login separately to get a token
      console.log('Registration successful for:', userData.username)
      addNotification({
        type: 'success',
        title: 'Account created!',
        message: `Welcome ${userData.username}! Please sign in to continue.`
      })
    },
    onError: (error) => {
      console.error('Registration error:', error)
      addNotification({
        type: 'error',
        title: 'Registration failed',
        message: (error as any).response?.data?.detail || 'Please try again with different details'
      })
    }
  })

  const login = async (data: LoginData) => {
    await loginMutation.mutateAsync(data)
  }

  const register = async (data: RegisterData) => {
    await registerMutation.mutateAsync(data)
  }

  const logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
    setUser(null)
    queryClient.clear()
  }

  const value: AuthContextType = {
    user,
    isLoading: (isLoading && hasToken()) || loginMutation.isPending || registerMutation.isPending,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 