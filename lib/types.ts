// User types
export interface User {
  id: string;
  email: string;
  user_metadata?: {
    nombre?: string;
  };
  created_at?: string;
}

// Propietario (Owner) types
export interface Propietario {
  id: string;
  user_id: string;
  nombre: string;
  email: string;
  telefono?: string;
  bloque?: string;
  portal?: string;
  planta?: string;
  letra?: string;
  tipo_propietario?: "Dueno" | "PropertyManager" | "Inquilino";
  created_at?: string;
  updated_at?: string;
}

// Propiedad (Property) types
export interface Propiedad {
  id: string;
  propietario_id: string;
  bloque: string;
  portal: string;
  planta: string;
  letra: string;
  tipo?: string;
  created_at?: string;
  updated_at?: string;
}

// Auth form types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  nombre: string;
  email: string;
  password: string;
  confirmPassword: string;
  gdprAccept: boolean;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
