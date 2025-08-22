# Formulario de Contacto para Google Forms

## Descripción del Proyecto

Este proyecto es una implementación sencilla de un formulario de contacto HTML/CSS/JS que envía datos directamente a un formulario de Google Forms. La principal ventaja de esta solución es que no requiere un backend personalizado ni un script de Google Apps, ya que la plataforma de Google Forms ya maneja las peticiones y almacena los datos en la hoja de cálculo vinculada.

## Componentes del Proyecto

El proyecto consta de tres archivos principales:

1.  **`index.html`**:
    * Contiene la estructura del formulario de contacto.
    * Usa campos de texto (`input` y `textarea`) con `name` específicos que coinciden con los nombres de entrada de Google Forms. Esto permite que los datos se envíen correctamente.

2.  **`estilos.css`**:
    * Proporciona el estilo visual del formulario, con un diseño limpio y moderno.
    * Mejora la experiencia del usuario con colores, sombras y transiciones.

3.  **`formulario.js`**:
    * Maneja la lógica de envío del formulario.
    * Utiliza la API `fetch` para enviar los datos a la URL de respuesta de Google Forms.
    * El método `POST` y el `mode: 'no-cors'` garantizan que la petición sea exitosa sin ser bloqueada por las políticas de seguridad del navegador.
    * Muestra un mensaje de estado al usuario para indicar si el envío fue exitoso o si hubo un error.

## Proceso de Implementación

1.  **Crear el Formulario**: Primero se crea un formulario en Google Forms y se obtienen los nombres de los campos (`entry.XXXXXX`) de la URL de respuesta.
2.  **Configurar los Archivos**: Los nombres de los campos se asignan a los atributos `name` de los campos en el `index.html`.
3.  **Escribir el Script**: El `formulario.js` captura el evento `submit` del formulario y utiliza `fetch` para enviar los datos a la URL de respuesta de Google Forms. La respuesta del servidor de Google no es necesaria para confirmar el envío, por lo que el `fetch` puede manejar la respuesta de forma simple.
4.  **Despliegue**: Los tres archivos (`index.html`, `estilos.css`, `formulario.js`) se colocan en el mismo directorio y se pueden hospedar en cualquier servidor web, incluyendo plataformas de alojamiento gratuito como GitHub Pages.

Este método es ideal para proyectos pequeños y formularios simples que no requieren validación avanzada del lado del servidor.