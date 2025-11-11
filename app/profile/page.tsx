"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function ProfilePage() {
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
      router.push("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header/Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">L2H Community</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">{user.email}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Welcome Message */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            ¡Bienvenido, {user.user_metadata?.nombre || user.email}! 👋
          </h2>
          <p className="text-xl text-gray-600">
            Te encuentras en tu área personal de L2H Community. Desde aquí puedes gestionar tu perfil y acceder a todas las herramientas de tu comunidad.
          </p>
        </div>

        {/* User Profile Menu */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Info Card */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {user.email?.charAt(0).toUpperCase()}
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Mi Perfil</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
            <button
              onClick={() => router.push("/profile/edit")}
              className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Editar Perfil
            </button>
          </div>

          {/* Change Password Card */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                🔐
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Seguridad</h3>
                <p className="text-sm text-gray-600">Cambiar contraseña</p>
              </div>
            </div>
            <button
              onClick={() => router.push("/change-password")}
              className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Cambiar Contraseña
            </button>
          </div>

          {/* Community Card */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                👥
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Comunidad</h3>
                <p className="text-sm text-gray-600">Mi comunidad</p>
              </div>
            </div>
            <button
              onClick={() => router.push("/dashboard")}
              className="w-full mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
            >
              Ver Dashboard
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Acciones Rápidas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="px-4 py-3 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition font-semibold">
              📧 Mensaje a Comunidad
            </button>
            <button className="px-4 py-3 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition font-semibold">
              📋 Ver Eventos
            </button>
            <button className="px-4 py-3 bg-yellow-100 text-yellow-700 rounded-md hover:bg-yellow-200 transition font-semibold">
              💬 Ver Anuncios
            </button>
            <button className="px-4 py-3 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition font-semibold">
              ⚙️ Configuración
            </button>
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-8 bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
          <h4 className="font-semibold text-blue-900 mb-2">💡 Consejo</h4>
          <p className="text-blue-800">
            Completa tu perfil para que otros miembros de la comunidad puedan identificarte fácilmente.
          </p>
        </div>
      </div>
    </div>
  );
}
