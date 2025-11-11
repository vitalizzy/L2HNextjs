"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@/lib/types";

export function useAuth() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check current session on mount
    const checkAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        
        if (session?.user) {
          setUser(session.user as User);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error checking auth:", error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser(session.user as User);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [supabase]);

  const login = async (email: string, password: string) => {
    try {
      console.log("[useAuth.login] Starting login for email:", email);
      setIsLoading(true);
      
      console.log("[useAuth.login] Calling signInWithPassword...");
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log("[useAuth.login] signInWithPassword response:");
      console.log("[useAuth.login] - error:", error);
      console.log("[useAuth.login] - data:", data);
      console.log("[useAuth.login] - data.session:", data?.session);
      console.log("[useAuth.login] - data.user:", data?.user);

      if (error) {
        console.error("[useAuth.login] ❌ Error returned from Supabase:");
        console.error("[useAuth.login] - message:", error.message);
        console.error("[useAuth.login] - status:", error.status);
        
        // Mejores mensajes de error
        if (error.message.includes("Invalid login credentials")) {
          throw new Error("Email o contraseña incorrectos");
        }
        if (error.message.includes("Email not confirmed")) {
          throw new Error("Por favor confirma tu email antes de iniciar sesión");
        }
        throw error;
      }

      console.log("[useAuth.login] ✅ No error from Supabase");

      if (data?.session) {
        console.log("[useAuth.login] ✅ Session exists, setting authenticated state");
        setUser(data.user as User);
        setIsAuthenticated(true);
        
        console.log("[useAuth.login] ✅ Returning success: true");
        // Retorna success para que el componente maneje la redirección
        return { success: true };
      }
      
      console.error("[useAuth.login] ❌ No session in response");
      throw new Error("No se recibió sesión");
    } catch (error) {
      console.error("[useAuth.login] ❌ CATCH BLOCK - Login error:", error);
      console.error("[useAuth.login] ❌ Error details:", {
        message: error instanceof Error ? error.message : String(error),
        name: error instanceof Error ? error.name : "Unknown",
        stack: error instanceof Error ? error.stack : "N/A"
      });
      throw error;
    } finally {
      console.log("[useAuth.login] Finally block - setting isLoading to false");
      setIsLoading(false);
    }
  };

  const register = async (
    email: string,
    password: string,
    nombre: string
  ) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nombre,
          },
        },
      });

      if (error) {
        throw error;
      }

      if (data?.user) {
        setUser(data.user as User);
        // Don't set authenticated yet, wait for email confirmation
        return {
          success: true,
          message: "Registro exitoso. Por favor confirma tu email.",
        };
      }

      return {
        success: false,
        message: "Error desconocido en el registro",
      };
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      setUser(null);
      setIsAuthenticated(false);
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${typeof window !== 'undefined' ? window.location.origin : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password`,
      });

      if (error) {
        throw error;
      }

      return {
        success: true,
        message: "Instrucciones de recuperación enviadas a tu email",
      };
    } catch (error) {
      console.error("Reset password error:", error);
      throw error;
    }
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    resetPassword,
  };
}
