"use client";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Política de Privacidad</h1>
        
        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">1. Introducción</h2>
            <p>
              L2H Community ("nosotros", "nuestro" o "la Plataforma") se compromete a proteger tu privacidad. 
              Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y almacenamos tu información.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">2. Información que Recopilamos</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-gray-900">Información Proporcionada Directamente:</h3>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>Nombre completo</li>
                  <li>Dirección de correo electrónico</li>
                  <li>Número de teléfono (opcional)</li>
                  <li>Información de perfil (foto, biografía)</li>
                  <li>Información de unidad/propiedad</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Información Recopilada Automáticamente:</h3>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>Dirección IP</li>
                  <li>Tipo de navegador y dispositivo</li>
                  <li>Páginas visitadas y tiempo de permanencia</li>
                  <li>Datos de interacción con la Plataforma</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">3. Cómo Utilizamos tu Información</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Proporcionar, mantener y mejorar el Servicio</li>
              <li>Procesar tu registro y gestionar tu cuenta</li>
              <li>Enviar comunicaciones relacionadas con la Plataforma</li>
              <li>Personalizar tu experiencia de usuario</li>
              <li>Analizar uso y tendencias para mejorar el Servicio</li>
              <li>Cumplir con obligaciones legales</li>
              <li>Prevenir fraude y actividades maliciosas</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">4. Compartición de Información</h2>
            <p>
              No vendemos ni alquilamos tu información personal a terceros. Sin embargo, podemos compartir información en los siguientes casos:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Con otros miembros de tu comunidad (según tu configuración de privacidad)</li>
              <li>Con proveedores de servicios que nos ayudan a operar la Plataforma</li>
              <li>Cuando sea requerido por ley o para proteger nuestros derechos</li>
              <li>En caso de fusión, adquisición o venta de activos</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">5. Seguridad de Datos</h2>
            <p>
              Implementamos medidas de seguridad técnicas, administrativas y físicas apropiadas para proteger tu información personal 
              contra acceso no autorizado, alteración, divulgación o destrucción. Utilizamos encriptación SSL/TLS para transmisión de datos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">6. Retención de Datos</h2>
            <p>
              Retenemos tu información personal mientras tu cuenta esté activa o según sea necesario para proporcionar el Servicio. 
              Puedes solicitar la eliminación de tu cuenta en cualquier momento. Algunos datos pueden retenerse por razones legales o comerciales legítimas.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">7. Tus Derechos de Privacidad</h2>
            <p>Tienes derecho a:</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Acceder a tu información personal</li>
              <li>Corregir información inexacta</li>
              <li>Solicitar la eliminación de tu información</li>
              <li>Retirar tu consentimiento para el procesamiento</li>
              <li>Optar por no recibir comunicaciones de marketing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">8. Cookies</h2>
            <p>
              Utilizamos cookies para mejorar tu experiencia en la Plataforma. Las cookies son pequeños archivos almacenados en tu dispositivo 
              que nos ayudan a recordar tus preferencias y rastrear el uso del Servicio. Puedes controlar las cookies a través de la configuración de tu navegador.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">9. Enlaces Externos</h2>
            <p>
              La Plataforma puede contener enlaces a sitios web externos. No somos responsables por la privacidad de estos sitios. 
              Te recomendamos revisar sus políticas de privacidad antes de compartir información personal.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">10. Cambios en la Política de Privacidad</h2>
            <p>
              Podemos actualizar esta Política de Privacidad ocasionalmente. Los cambios significativos serán notificados a través de 
              la Plataforma o por correo electrónico. Tu uso continuado del Servicio constituye aceptación de los cambios.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">11. Contacto</h2>
            <p>
              Si tienes preguntas sobre esta Política de Privacidad o nuestras prácticas de privacidad, contáctanos en:
            </p>
            <p className="mt-3 font-semibold">
              Email: <span className="font-normal">privacy@l2hcommunity.com</span>
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
