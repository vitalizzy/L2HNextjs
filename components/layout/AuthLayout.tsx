"use client";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Branding */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Community</h2>
          <p className="mt-2 text-gray-600">Gestiona tu comunidad de vecinos</p>
        </div>

        {/* Content */}
        {children}

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-500">
          <p>© 2024 Community. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
}
