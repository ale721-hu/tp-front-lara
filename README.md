# WhatsAPPX

Aplicación de mensajería en tiempo real inspirada en WhatsApp, desarrollada con **React** y **Vite**.

## Características principales

- **Lista de Chats:** Búsqueda y selección de conversaciones activas.
- **Vista de Chat:** Encabezado con estado del usuario (`ChatHeader`), lista de mensajes (`MessageList`) e interfaz para enviar textos (`MessageComposer`).
- **Estado Vacío:** Manejo de pantallas de bienvenida cuando no hay chats seleccionados (`EmptyState`).

## Tecnologías utilizadas

- [React](https://react.dev/) - Librería para la interfaz de usuario.
- [Vite](https://vitejs.dev/) - Empaquetador y entorno de desarrollo rápido.
- [ESLint](https://eslint.org/) - Linter para mantener la calidad del código.

## Comandos de desarrollo

Para ejecutar el proyecto en tu entorno local:

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview
```