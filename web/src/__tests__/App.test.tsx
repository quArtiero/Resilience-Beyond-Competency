import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from '../App'

// Mock components to avoid complex dependencies in tests
jest.mock('../components/Header', () => ({
  Header: () => <div data-testid="header">Header</div>
}))

jest.mock('../components/Sidebar', () => ({
  Sidebar: () => <div data-testid="sidebar">Sidebar</div>
}))

jest.mock('../pages/Home', () => ({
  Home: () => <div data-testid="home">Home Page</div>
}))

jest.mock('../hooks/useAuth', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useAuth: () => ({
    user: null,
    isLoading: false,
    isAuthenticated: false,
    login: jest.fn(),
    register: jest.fn(),
    logout: jest.fn(),
  })
}))

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
})

const renderWithProviders = (component: React.ReactElement) => {
  const queryClient = createTestQueryClient()
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </QueryClientProvider>
  )
}

describe('App Component', () => {
  test('renders main layout components', () => {
    renderWithProviders(<App />)
    
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
    expect(screen.getByTestId('home')).toBeInTheDocument()
  })
})

// TODO: Add tests for routing
// TODO: Add tests for authentication flow
// TODO: Add tests for lesson navigation
// TODO: Add integration tests with React Query 