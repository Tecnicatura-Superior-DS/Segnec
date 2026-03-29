---
description: Flujo de trabajo para proponer, auditar y aprobar cambios (UI/UX -> Seguridad -> Usuario)
---
# Workflow: Secuencial Validado

Este flujo de trabajo garantiza que cada cambio en la aplicación web pase por filtros estrictos de usabilidad y ciberseguridad antes de impactar el código fuente.

1. **Fase 1: Agente_UIUX propone cambios**
   - El agente asume el rol de UI/UX.
   - Diseña e implementa maquetas (mockups) temporales, esquemas de diseño y componentes.
   - Audita rigurosamente tipografía, estándares de accesibilidad (a11y) y diseña sobre bases "Mobile-First" (Responsive Design).
   - Genera entregables: documentación de estilos, imágenes conceptuales (vía generador de imágenes) o código preliminar.

2. **Fase 2: Agente_Seguridad valida seguridad**
   - El agente asume el rol de Ciberseguridad sobre la propuesta de UI/UX.
   - Audita que la propuesta no introduzca vulnerabilidades del top 10 de OWASP (ej. XSS en formularios de frontend, validación insuficiente).
   - Revisa cualquier integración relacionada con pagos o paso de credenciales (SSL/TLS, configuraciones de cabeceras seguras).
   - Genera entregables: reportes de auditoría, scripts de hardening propuestos y detiene el proceso si hay "Hallazgos Críticos".

3. **Fase 3: Usuario aprueba implementación final**
   - Se notifica al usuario con el paquete completo: la propuesta estética/funcional + el veredicto de seguridad.
   - Solo cuando el usuario da su consentimiento afirmativo (aprobación final), los cambios se integran definitivamente a la rama principal o al entorno de producción.
