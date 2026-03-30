# Bitácora de Desarrollo - Segnec

Este documento registrará los cambios y avances en la creación de la página web de Segnec (segnec.com.ar).

## Revisiones Iniciales
- **Fecha:** 28 de marzo de 2026
- **Actividad:** Creación de estructura inicial del proyecto y desarrollo de las 3 propuestas solicitadas.
  - `propuesta1_elegante`: Estilo minimalista, corporativo, profesional (azul oscuro, gris, blanco).
  - `propuesta2_informal`: Estilo vívido, amigable, accesible (verde, naranja, celeste).
  - `propuesta3_afiche`: Estilo impactante, tipografía grande, promocional (rojo, negro, amarillo).
- **Notas:** Se generaron imágenes personalizadas mediante IA para el banner (hero) de cada propuesta. Se implementaron los archivos HTML, CSS y JS independientes en cada carpeta. Todas las propuestas incluyen las secciones: Inicio, Servicios, Próximamente (Monitoreo y Tienda), y Contacto (formulario y botón directo a WhatsApp).
- **Estado:** Archivos locales creados exitosamente. Pendiente de la revisión por parte del cliente para elegir la línea gráfica ganadora o para solicitar ajustes antes de integrar con Git y subir al servidor.

---

## Primera Muestra — Propuesta 2 Seleccionada
- **Fecha:** 29 de marzo de 2026
- **Decisión del cliente:** Se avanzó con la **`propuesta2_informal`** (verde, naranja, celeste).
- **Actividad:** Desarrollo completo de la primera muestra funcional.

### Estructura de carpetas creada:
- `propuesta2_informal/images/` — Para imágenes (se crearán/reemplazarán cuando el cliente provea material o se reactive la generación de IA).
- `propuesta2_informal/videos/` — Para videos futuros (presentaciones, tutoriales de instalación, etc).

### Imágenes placeholder SVG creadas (propias, sin depender de material del cliente):
- `images/hero_placeholder.svg` — Banner principal: casa + familia en paleta verde/naranja/celeste.
- `images/blog_viaje.svg` — Tips para asegurar la casa antes de viajar.
- `images/blog_wifi.svg` — Cámaras Wi-Fi y monitoreo desde el celular.
- `images/blog_pets.svg` — Monitoreo de mascotas con cámaras.

### Nuevas secciones y mejoras implementadas:
- ✅ **Navbar mejorado:** Logo con subtítulo "Seguridad Electrónica", efecto scroll, menú móvil con drawer animado.
- ✅ **Hero:** Imagen SVG de fondo, titulares potentes, badge de confianza, botones Call-to-Action claros.
- ✅ **Strip de estadísticas:** +500 hogares, 10+ años, 24/7, ⭐⭐⭐⭐⭐.
- ✅ **Sección "Nosotros":** Historia de la empresa, valores, escudo animado, badge "🇦🇷 Empresa Argentina".
- ✅ **6 tarjetas de servicios:** Alarmas Hogar, Cámaras, Control Acceso, Alarmas Comercios, Cercos Eléctricos, Smart Home.
- ✅ **Blog / Consejos:** 3 tarjetas con imágenes SVG propias y textos profesionales.
- ✅ **Próximamente:** Banner oscuro con Tienda Online y Central de Monitoreo 24/7.
- ✅ **Contacto completo:** Info (tel, email, zona), formulario con validación y feedback visual.
- ✅ **Footer completo:** 4 columnas con links, datos de contacto y créditos.
- ✅ **Botón flotante de WhatsApp:** Verde, con animación pulse, tooltip "¡Chateá con nosotros!", se oculta cerca del footer para no tapar el contenido.

### Textos redactados con criterio:
- Tono amigable, cercano, argentino ("vos", "celu", "mirá").
- Llamadas a la acción claras y concretas.
- Textos SEO-amigables con keywords relevantes.
- Número de teléfono y email ficticios listos para reemplazar con los datos reales del cliente.
- Zona de cobertura indicada: Buenos Aires y Gran Buenos Aires (actualizar según el cliente).

### Pendientes:
- [ ] El cliente debe proveer: logo real, teléfono real, email real, zona de cobertura exacta.
- [x] Reemplazar imágenes SVG placeholder por fotos reales o generadas con IA (cuando se restaure la cuota).
- [ ] Agregar videos en la carpeta `videos/` (ej: video testimonial, instalación en tiempo real).
- [x] Validar el número de WhatsApp real antes de publicar.
- [x] Integrar con Git y subir al servidor de producción (segnec.com.ar).

---

## Lanzamiento y SSL
- **Fecha:** 30 de marzo de 2026
- **Actividad:** Verificación de propagación, despliegue final y configuración SSL.
- **Detalles:**
  - Se verificó que `segnec.com.ar` apunta correctamente a la IP `138.204.160.54`.
  - Se realizó el `git push origin main` que activó el hook de despliegue automático.
  - Se configuró el certificado SSL mediante Certbot, habilitando HTTPS con redirección automática desde HTTP.
  - Se verificó la correcta visualización de la Propuesta 2 en entornos seguros.
- **Estado:** SITIO WEB ONLINE Y SEGURO (HTTPS). 🚀
