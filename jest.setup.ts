// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    }
  },
  useSearchParams() {
    return {
      get: jest.fn(),
    }
  },
  usePathname() {
    return ''
  },
}))

// Mock Supabase
jest.mock('@/lib/supabase/client', () => ({
  createClient: jest.fn(() => ({
    auth: {
      signUp: jest.fn(),
      signInWithPassword: jest.fn(),
      signOut: jest.fn(),
      onAuthStateChange: jest.fn(),
      getUser: jest.fn(),
    },
  })),
}))

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockImage(props: any) {
    return require('react').createElement('img', props)
  },
}))
