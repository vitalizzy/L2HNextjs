import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RegisterForm } from './RegisterForm'
import { useAuth } from '@/hooks/useAuth'

// Mock the useAuth hook
jest.mock('@/hooks/useAuth')
// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

const mockRegister = jest.fn()

describe('RegisterForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useAuth as jest.Mock).mockReturnValue({
      register: mockRegister,
    })
  })

  it('renders register form correctly', () => {
    render(<RegisterForm />)
    
    expect(screen.getByRole('heading', { name: /Registrate/i })).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Tu nombre completo')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('ejemplo@correo.com')).toBeInTheDocument()
    expect(screen.getAllByPlaceholderText('••••••')).toHaveLength(2)
    expect(screen.getByRole('button', { name: /Registrate/i })).toBeInTheDocument()
  })

  it('renders terms and conditions links', () => {
    render(<RegisterForm />)
    
    const links = screen.getAllByText('términos y condiciones')
    expect(links).toHaveLength(1)
    expect(screen.getByText('política de privacidad')).toBeInTheDocument()
  })

  it('renders login link', () => {
    render(<RegisterForm />)
    
    expect(screen.getByText('Inicia sesión')).toBeInTheDocument()
  })

  it('updates form fields correctly', async () => {
    render(<RegisterForm />)
    
    const nombreInput = screen.getByPlaceholderText('Tu nombre completo') as HTMLInputElement
    const emailInput = screen.getByPlaceholderText('ejemplo@correo.com') as HTMLInputElement
    const passwordInputs = screen.getAllByPlaceholderText('••••••') as HTMLInputElement[]
    
    await userEvent.type(nombreInput, 'Juan Pérez')
    await userEvent.type(emailInput, 'juan@example.com')
    await userEvent.type(passwordInputs[0], 'password123')
    await userEvent.type(passwordInputs[1], 'password123')
    
    expect(nombreInput.value).toBe('Juan Pérez')
    expect(emailInput.value).toBe('juan@example.com')
    expect(passwordInputs[0].value).toBe('password123')
    expect(passwordInputs[1].value).toBe('password123')
  })

  it('calls register with correct data', async () => {
    mockRegister.mockResolvedValueOnce(undefined)
    render(<RegisterForm />)
    
    const nombreInput = screen.getByPlaceholderText('Tu nombre completo')
    const emailInput = screen.getByPlaceholderText('ejemplo@correo.com')
    const passwordInputs = screen.getAllByPlaceholderText('••••••')
    const gdprCheckbox = screen.getByRole('checkbox')
    const submitButton = screen.getByRole('button', { name: /Registrate/i })
    
    await userEvent.type(nombreInput, 'Juan Pérez')
    await userEvent.type(emailInput, 'test@example.com')
    await userEvent.type(passwordInputs[0], 'password123')
    await userEvent.type(passwordInputs[1], 'password123')
    await userEvent.click(gdprCheckbox)
    await userEvent.click(submitButton)
    
    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith('test@example.com', 'password123', 'Juan Pérez')
    })
  })

  it('handles registration errors gracefully', async () => {
    const error = new Error('Email already exists')
    mockRegister.mockRejectedValueOnce(error)
    render(<RegisterForm />)
    
    const nombreInput = screen.getByPlaceholderText('Tu nombre completo')
    const emailInput = screen.getByPlaceholderText('ejemplo@correo.com')
    const passwordInputs = screen.getAllByPlaceholderText('••••••')
    const gdprCheckbox = screen.getByRole('checkbox')
    const submitButton = screen.getByRole('button', { name: /Registrate/i })
    
    await userEvent.type(nombreInput, 'Juan Pérez')
    await userEvent.type(emailInput, 'test@example.com')
    await userEvent.type(passwordInputs[0], 'password123')
    await userEvent.type(passwordInputs[1], 'password123')
    await userEvent.click(gdprCheckbox)
    await userEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Email already exists')).toBeInTheDocument()
    }, { timeout: 10000 })
  })
})
