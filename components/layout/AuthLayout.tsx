"use client";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mb-3">
            <span className="text-xl font-bold text-white">L2H</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Community</h2>
          <p className="mt-2 text-gray-600 text-sm">Gestiona tu comunidad de forma sencilla</p>
        </div>

        {/* Content */}
        {children}

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-500">
          <p>© 2024 L2H Community. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
}
