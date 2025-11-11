"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export function RegisterForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
    gdprAccept: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState<string | null>(null);
  const [redirectCountdown, setRedirectCountdown] = useState(0);
  const router = useRouter();
  const { register } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Countdown para redirigir a login después del registro
  useEffect((): (() => void) | void => {
    if (!registeredEmail) {
      return;
    }
    
    if (redirectCountdown > 0) {
      const timer = setTimeout(() => {
        setRedirectCountdown(redirectCountdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
    
    if (redirectCountdown === 0) {
      router.push("/login");
    }
  }, [registeredEmail, redirectCountdown, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      // Validar nombre
      if (!formData.nombre.trim()) {
        throw new Error("El nombre es requerido");
      }

      if (formData.nombre.trim().length < 3) {
        throw new Error("El nombre debe tener al menos 3 caracteres");
      }

      // Validar email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error("Email inválido");
      }

      // Validar contraseña
      if (formData.password.length < 6) {
        throw new Error("La contraseña debe tener al menos 6 caracteres");
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error("Las contraseñas no coinciden");
      }

      // Validar GDPR
      if (!formData.gdprAccept) {
        throw new Error("Debes aceptar los términos y políticas de privacidad");
      }

      // Mostrar mensaje de carga
      setSuccess("Registrándote...");

      // Llamar al registro
      const result = await register(formData.email, formData.password, formData.nombre);
      
      if (result?.success) {
        // Guardar el email registrado y mostrar pantalla de confirmación
        setRegisteredEmail(formData.email);
        setSuccess(null);
        
        // Iniciar countdown de 5 segundos para redirigir a login
        setRedirectCountdown(5);
      }
    } catch (err) {
      if (err instanceof Error) {
        // Mapear errores comunes de Supabase
        if (err.message.includes("already registered")) {
          setError("❌ Este email ya está registrado. Intenta con otro.");
        } else if (err.message.includes("invalid")) {
          setError(`❌ ${err.message}`);
        } else {
          setError(`❌ ${err.message}`);
        }
      } else {
        setError("❌ Error al registrar");
      }
      setSuccess(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Pantalla de confirmación de email */}
      {registeredEmail ? (
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-green-100 p-4">
              <svg
                className="h-12 w-12 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Cuenta Creada!</h2>
          <p className="text-gray-600 text-sm mb-6">
            Hemos enviado un email de confirmación a:
          </p>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-900 font-semibold break-all">{registeredEmail}</p>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6 text-left">
            <h3 className="font-semibold text-amber-900 mb-2 flex items-center">
              <svg
                className="h-5 w-5 mr-2 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Por favor, verifica tu email
            </h3>
            <ul className="text-amber-900 text-sm space-y-2">
              <li>✓ Busca en tu bandeja de entrada</li>
              <li>✓ Revisa la carpeta de spam o correo no deseado</li>
              <li>✓ Haz clic en el enlace de confirmación para activar tu cuenta</li>
            </ul>
          </div>

          <p className="text-gray-600 text-sm mb-6">
            Una vez confirmes tu email, podrás acceder a tu cuenta.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-center">
            <p className="text-blue-900 font-semibold">Redirigiendo a login en {redirectCountdown} segundos...</p>
          </div>

          <button
            onClick={() => router.push("/login")}
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition mb-3"
          >
            Ir a Iniciar Sesión Ahora
          </button>

          <button
            onClick={() => {
              setRegisteredEmail(null);
              setRedirectCountdown(0);
              setFormData({
                nombre: "",
                email: "",
                password: "",
                confirmPassword: "",
                gdprAccept: false,
              });
            }}
            className="w-full bg-gray-200 text-gray-700 py-2 rounded-md font-semibold hover:bg-gray-300 transition"
          >
            Crear Otra Cuenta
          </button>
        </div>
      ) : (
        <>
          {/* Formulario de registro */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Crear Cuenta</h1>
          <p className="text-gray-600 text-sm mb-6">Únete a L2H Community hoy</p>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded flex items-start">
          <span className="mr-2">🔴</span>
          <div>
            <p className="font-semibold">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded flex items-start">
          <span className="mr-2">✓</span>
          <div>
            <p className="font-semibold">Éxito</p>
            <p className="text-sm">{success}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
            Nombre Completo
          </label>
          <input
            id="nombre"
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Juan Pérez"
            disabled={isLoading}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
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
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Al menos 6 caracteres"
            disabled={isLoading}
            required
          />
          <p className="text-xs text-gray-500 mt-1">Mínimo 6 caracteres</p>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirmar Contraseña
          </label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Repite la contraseña"
            disabled={isLoading}
            required
          />
        </div>

        <div className="flex items-start space-x-2 pt-2">
          <input
            id="gdprAccept"
            type="checkbox"
            name="gdprAccept"
            checked={formData.gdprAccept}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1 flex-shrink-0"
            disabled={isLoading}
            required
          />
          <label htmlFor="gdprAccept" className="block text-sm text-gray-700">
            Acepto los{" "}
            <button
              type="button"
              onClick={() => router.push("/terms-and-conditions")}
              className="text-blue-600 hover:underline cursor-pointer font-medium"
            >
              términos y condiciones
            </button>{" "}
            y la{" "}
            <button
              type="button"
              onClick={() => router.push("/privacy-policy")}
              className="text-blue-600 hover:underline cursor-pointer font-medium"
            >
              política de privacidad
            </button>
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition mt-4"
        >
          {isLoading ? "⏳ Registrando..." : "✓ Registrate"}
        </button>
      </form>

          <div className="mt-6 text-center border-t pt-4">
            <p className="text-sm text-gray-600">
              ¿Ya tienes cuenta?{" "}
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="text-blue-600 hover:underline font-semibold cursor-pointer"
              >
                Inicia sesión
              </button>
            </p>
          </div>
        </>
      )}
    </div>
  );
}
