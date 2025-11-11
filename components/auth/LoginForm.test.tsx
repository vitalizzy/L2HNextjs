import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginForm } from './LoginForm'
import { useAuth } from '@/hooks/useAuth'

// Mock the useAuth hook
jest.mock('@/hooks/useAuth')
// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: any) => (
    <a href={href}>{children}</a>
  )
})

const mockLogin = jest.fn()

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
    })
  })

  it('renders login form correctly', () => {
    render(<LoginForm />)
    
    expect(screen.getByRole('heading', { name: /Iniciar Sesión/i })).toBeInTheDocument()
    expect(screen.getByPlaceholderText('ejemplo@correo.com')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('••••••')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Iniciar Sesión/i })).toBeInTheDocument()
  })

  it('renders register and forgot password links', () => {
    render(<LoginForm />)
    
    expect(screen.getByText('Registrate aquí')).toBeInTheDocument()
    expect(screen.getByText('Recuperarla')).toBeInTheDocument()
  })

  it('updates email input value', async () => {
    render(<LoginForm />)
    const emailInput = screen.getByPlaceholderText('ejemplo@correo.com') as HTMLInputElement
    
    await userEvent.type(emailInput, 'test@example.com')
    
    expect(emailInput.value).toBe('test@example.com')
  })

  it('updates password input value', async () => {
    render(<LoginForm />)
    const passwordInput = screen.getByPlaceholderText('••••••') as HTMLInputElement
    
    await userEvent.type(passwordInput, 'password123')
    
    expect(passwordInput.value).toBe('password123')
  })

  it('calls login with correct credentials', async () => {
    mockLogin.mockResolvedValueOnce(undefined)
    render(<LoginForm />)
    
    const emailInput = screen.getByPlaceholderText('ejemplo@correo.com')
    const passwordInput = screen.getByPlaceholderText('••••••')
    const submitButton = screen.getByRole('button', { name: /Iniciar Sesión/i })
    
    await userEvent.type(emailInput, 'test@example.com')
    await userEvent.type(passwordInput, 'password123')
    await userEvent.click(submitButton)
    
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123')
    })
  })
})
