"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  const userName = user.user_metadata?.nombre || user.email?.split("@")[0] || "Usuario";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                L2H Community
              </h1>
              <p className="mt-1 text-sm text-gray-600">Dashboard de Control</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => router.push("/profile")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-sm"
              >
                👤 Mi Perfil
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium shadow-sm"
              >
                🚪 Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-md p-8 border-l-4 border-blue-600">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              ¡Bienvenido, {userName}! 👋
            </h2>
            <p className="text-gray-600 text-lg">
              Estás autenticado y conectado a L2H Community. Tu sesión es segura y activa.
            </p>
            <p className="text-green-600 font-semibold mt-4 flex items-center">
              ✓ Estado: Autenticado
            </p>
          </div>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-500 text-sm font-medium">Tu Email</h3>
                <p className="mt-2 text-lg font-semibold text-gray-900 break-all">
                  {user.email}
                </p>
              </div>
              <div className="text-3xl">📧</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-500 text-sm font-medium">Estado de Autenticación</h3>
                <p className="mt-2 text-lg font-semibold text-green-600">
                  ✓ Activo
                </p>
              </div>
              <div className="text-3xl">🟢</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-500 text-sm font-medium">Miembro desde</h3>
                <p className="mt-2 text-lg font-semibold text-gray-900">
                  {new Date(user.created_at || "").toLocaleDateString("es-ES")}
                </p>
              </div>
              <div className="text-3xl">📅</div>
            </div>
          </div>
        </div>

        {/* Acciones Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Acciones Rápidas</h3>
            <div className="space-y-3">
              <button
                onClick={() => router.push("/profile")}
                className="w-full px-4 py-3 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-100 transition font-medium text-left"
              >
                👤 Ver Mi Perfil
              </button>
              <button
                onClick={() => router.push("/change-password")}
                className="w-full px-4 py-3 bg-purple-50 text-purple-600 border border-purple-200 rounded-lg hover:bg-purple-100 transition font-medium text-left"
              >
                🔐 Cambiar Contraseña
              </button>
              <button
                onClick={() => router.push("/terms-and-conditions")}
                className="w-full px-4 py-3 bg-gray-50 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-100 transition font-medium text-left"
              >
                📋 Términos y Condiciones
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Información</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">ID de Usuario</label>
                <p className="mt-1 text-sm text-gray-600 break-all font-mono">{user.id}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Proveedor de Auth</label>
                <p className="mt-1 text-sm text-gray-600">Email / Contraseña</p>
              </div>
              <div className="pt-3 border-t">
                <p className="text-xs text-gray-500">
                  Tu sesión es segura. Los datos se sincronizan desde Supabase.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Estado de Verificación */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-green-900 mb-2">✓ Verificación Completa</h3>
          <p className="text-green-700">
            Tu cuenta está completamente configurada y verificada. Puedes acceder a todas las 
            características de L2H Community.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600 text-sm">
            © 2024 L2H Community. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
