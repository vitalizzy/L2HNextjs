import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <div className="text-center space-y-6 px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          L2H Community
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Gestiona tu comunidad de propiedades de forma sencilla y eficiente
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Link
            href="/login"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Iniciar Sesión
          </Link>
          <Link
            href="/register"
            className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
          >
            Registrarse
          </Link>
        </div>
        
        <div className="pt-12">
          <p className="text-gray-600 mb-4">Características principales:</p>
          <ul className="text-left inline-block space-y-2">
            <li className="text-gray-700">✅ Gestión de propietarios</li>
            <li className="text-gray-700">✅ Control de propiedades</li>
            <li className="text-gray-700">✅ Dashboard interactivo</li>
            <li className="text-gray-700">✅ Seguridad con Supabase</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
