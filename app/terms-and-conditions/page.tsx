"use client";

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Términos y Condiciones</h1>
        
        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">1. Aceptación de Términos</h2>
            <p>
              Al acceder y utilizar esta plataforma de gestión comunitaria (&quot;Servicio&quot;), aceptas estar vinculado por estos Términos y Condiciones. 
              Si no estás de acuerdo con cualquier parte de estos términos, no debes usar este Servicio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">2. Descripción del Servicio</h2>
            <p>
              L2H Community es una plataforma digital diseñada para facilitar la gestión y comunicación dentro de comunidades de propiedades. 
              Proporciona herramientas para coordinación, mensajería y administración comunitaria.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">3. Responsabilidades del Usuario</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Eres responsable de mantener la confidencialidad de tu contraseña y cuenta</li>
              <li>Aceptas no compartir tu cuenta con terceros no autorizados</li>
              <li>Eres responsable de todas las actividades que ocurran bajo tu cuenta</li>
              <li>Te comprometes a usar el Servicio únicamente para propósitos legales</li>
              <li>No transmitirás contenido ilegal, ofensivo o perjudicial</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">4. Contenido del Usuario</h2>
            <p>
              Al enviar contenido a través del Servicio, concedes a L2H Community una licencia mundial, no exclusiva y libre de regalías 
              para usar, reproducir y modificar ese contenido en conexión con el Servicio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">5. Limitación de Responsabilidad</h2>
            <p>
              EN LA MEDIDA MÁXIMA PERMITIDA POR LA LEY, L2H COMMUNITY NO SERÁ RESPONSABLE POR DAÑOS INDIRECTOS, INCIDENTALES, 
              ESPECIALES, CONSECUENTES O PUNITIVOS, INCLUSO SI SE HA ADVERTIDO DE LA POSIBILIDAD DE TALES DAÑOS.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">6. Modificación de Términos</h2>
            <p>
              Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento. Los cambios entrarán en vigor 
              inmediatamente después de su publicación. Tu uso continuado del Servicio constituye aceptación de los términos modificados.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">7. Terminación de Servicio</h2>
            <p>
              Podemos terminar o suspender tu acceso al Servicio inmediatamente, sin previo aviso, si violas cualquier disposición de 
              estos Términos y Condiciones.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">8. Ley Aplicable</h2>
            <p>
              Estos Términos y Condiciones se rigen por las leyes aplicables. Cualquier disputa será resuelta en los tribunales competentes 
              de la jurisdicción correspondiente.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">9. Contacto</h2>
            <p>
              Si tienes preguntas sobre estos Términos y Condiciones, contáctanos en: <span className="font-semibold">info@l2hcommunity.com</span>
            </p>
          </section>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
