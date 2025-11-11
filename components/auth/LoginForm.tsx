"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      // Validar email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Email inválido");
      }

      // Validar contraseña
      if (password.length < 6) {
        throw new Error("La contraseña debe tener al menos 6 caracteres");
      }

      // Mostrar mensaje de carga
      setSuccess("Iniciando sesión...");

      // Llamar al login
      const result = await login(email, password);
      
      if (result?.success) {
        // Esperar un poco para asegurar que la sesión se sincronizó
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Redireccionar al dashboard
        router.push("/dashboard");
      }
    } catch (err) {
      if (err instanceof Error) {
        // Mapear errores comunes de Supabase
        if (err.message.includes("Invalid login credentials")) {
          setError("❌ Email o contraseña incorrectos");
        } else if (err.message.includes("Email not confirmed")) {
          setError("⚠️ Por favor confirma tu email. Revisa tu bandeja de entrada.");
        } else {
          setError(`❌ ${err.message}`);
        }
      } else {
        setError("❌ Error al iniciar sesión");
      }
      setSuccess(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Iniciar Sesión</h1>
      <p className="text-gray-600 text-sm mb-6">Accede a tu cuenta de L2H Community</p>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded flex items-start">
          <span className="mr-2">🔴</span>
          <div>
            <p className="font-semibold">Error</p>
            <p>{error}</p>
          </div>
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded flex items-start">
          <span className="mr-2">⏳</span>
          <div>
            <p className="font-semibold">{success}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="tu@correo.com"
            disabled={isLoading}
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="••••••"
            disabled={isLoading}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition"
        >
          {isLoading ? "⏳ Iniciando sesión..." : "✓ Iniciar Sesión"}
        </button>
      </form>

      <div className="mt-6 space-y-3 text-sm">
        <div className="text-center text-gray-600 pb-3 border-b">
          ¿No tienes cuenta?{" "}
          <button
            type="button"
            onClick={() => router.push("/register")}
            className="text-blue-600 hover:underline font-semibold cursor-pointer"
          >
            Regístrate aquí
          </button>
        </div>

        <div className="text-center text-gray-600">
          ¿Olvidaste tu contraseña?{" "}
          <button
            type="button"
            onClick={() => router.push("/forgot-password")}
            className="text-blue-600 hover:underline font-semibold cursor-pointer"
          >
            Recuperarla
          </button>
        </div>
      </div>
    </div>
  );
}
