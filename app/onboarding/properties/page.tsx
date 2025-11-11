"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useProperties } from "@/hooks/useProperties";

export default function OnboardingPropertiesPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { properties, isLoading, addProperty, getProperties, deleteProperty } =
    useProperties();

  const [bloque, setBloque] = useState("");
  const [portal, setPortal] = useState("");
  const [planta, setPlanta] = useState("");
  const [letra, setLetra] = useState("");
  const [tipo, setTipo] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push("/login");
      return;
    }

    console.log("[OnboardingProperties] User authenticated, fetching properties");
    loadProperties();
  }, [user, isAuthenticated, router]);

  const loadProperties = async () => {
    if (!user?.id) return;

    try {
      await getProperties(user.id);
    } catch (err) {
      console.error("[OnboardingProperties] Error loading properties:", err);
      setError("Error al cargar viviendas");
    }
  };

  const handleAddProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      if (!user?.id) {
        throw new Error("Usuario no identificado");
      }

      if (!bloque || !portal || !planta || !letra || !tipo) {
        throw new Error("Todos los campos son obligatorios");
      }

      console.log("[OnboardingProperties] Adding property:", {
        bloque,
        portal,
        planta,
        letra,
        tipo,
      });

      await addProperty(user.id, {
        bloque,
        portal,
        planta,
        letra,
        tipo: tipo as "Dueno" | "PropertyManager" | "Inquilino",
      });

      setSuccess("✅ Vivienda agregada exitosamente");
      setBloque("");
      setPortal("");
      setPlanta("");
      setLetra("");
      setTipo("");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al agregar vivienda";
      console.error("[OnboardingProperties] Error:", message);
      setError(`❌ ${message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProperty = async (propertyId: string) => {
    try {
      await deleteProperty(propertyId);
      setSuccess("✅ Vivienda eliminada");
    } catch (err) {
      setError("❌ Error al eliminar vivienda");
    }
  };

  const handleContinue = () => {
    if (properties.length > 0) {
      router.push("/dashboard");
    } else {
      setError("❌ Debes agregar al menos una vivienda");
    }
  };

  const handleLogout = async () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-lg mb-4">
              <span className="text-3xl">🏠</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Agregar Tu Vivienda</h1>
            <p className="text-gray-600">Completa los datos de tu inmueble para acceder a la plataforma</p>
          </div>

          {/* Alerts */}
          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-start gap-3">
              <span>🔴</span>
              <div>
                <p className="font-semibold">Error</p>
                <p>{error}</p>
              </div>
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-start gap-3">
              <span>✅</span>
              <div>
                <p className="font-semibold">Éxito</p>
                <p>{success}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleAddProperty} className="space-y-6 mb-8">
            {/* Bloque */}
            <div>
              <label htmlFor="bloque" className="block text-sm font-semibold text-gray-700 mb-2">
                🏢 Bloque <span className="text-red-500">*</span>
              </label>
              <select
                id="bloque"
                value={bloque}
                onChange={(e) => setBloque(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Selecciona el número de bloque</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <option key={num} value={num.toString()}>
                    Bloque {num}
                  </option>
                ))}
              </select>
            </div>

            {/* Portal y Planta */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="portal" className="block text-sm font-semibold text-gray-700 mb-2">
                  🚪 Portal <span className="text-red-500">*</span>
                </label>
                <select
                  id="portal"
                  value={portal}
                  onChange={(e) => setPortal(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Selecciona el portal</option>
                  <option value="1">Portal 1</option>
                  <option value="2">Portal 2</option>
                </select>
              </div>

              <div>
                <label htmlFor="planta" className="block text-sm font-semibold text-gray-700 mb-2">
                  📍 Planta <span className="text-red-500">*</span>
                </label>
                <select
                  id="planta"
                  value={planta}
                  onChange={(e) => setPlanta(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Selecciona la planta</option>
                  <option value="Bajo">Bajo</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="Ático">Ático</option>
                </select>
              </div>
            </div>

            {/* Letra y Tipo */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="letra" className="block text-sm font-semibold text-gray-700 mb-2">
                  Ⓜ️ Letra <span className="text-red-500">*</span>
                </label>
                <select
                  id="letra"
                  value={letra}
                  onChange={(e) => setLetra(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Selecciona la letra</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </select>
              </div>

              <div>
                <label htmlFor="tipo" className="block text-sm font-semibold text-gray-700 mb-2">
                  👤 Tipo de Propietario <span className="text-red-500">*</span>
                </label>
                <select
                  id="tipo"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Selecciona tu rol</option>
                  <option value="Dueno">Dueño</option>
                  <option value="PropertyManager">Property Manager</option>
                  <option value="Inquilino">Inquilino</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
            >
              {isSubmitting ? "⏳ Agregando..." : "➕ Agregar Vivienda"}
            </button>
          </form>

          {/* Properties List */}
          {properties.length > 0 && (
            <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">
                ✅ Viviendas agregadas ({properties.length})
              </h3>
              <div className="space-y-3">
                {properties.map((prop) => (
                  <div
                    key={prop.id}
                    className="flex justify-between items-center p-3 bg-white rounded border border-gray-200"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">
                        Bloque {prop.bloque}, Portal {prop.portal}, Planta {prop.planta}-{prop.letra}
                      </p>
                      <p className="text-sm text-gray-600">Tipo: {prop.tipo}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteProperty(prop.id)}
                      className="text-red-600 hover:bg-red-100 px-3 py-1 rounded text-sm font-semibold transition"
                    >
                      ❌ Eliminar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Continue Section */}
          {properties.length > 0 && (
            <div className="mb-8 p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-green-800 font-semibold mb-4">
                ✅ ¡Listo! Ya puedes acceder al dashboard
              </p>
              <button
                onClick={handleContinue}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                ➡️ Ir al Dashboard
              </button>
            </div>
          )}

          {/* Skip/Help Section */}
          <div className="border-t pt-6">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                {properties.length === 0
                  ? "⚠️ Necesitas al menos una vivienda para continuar"
                  : "✅ Puedes agregar más viviendas más tarde"}
              </p>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:bg-red-100 px-4 py-2 rounded text-sm font-semibold transition"
              >
                🚪 Salir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
