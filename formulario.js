document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('contactForm');
    const statusMessage = document.getElementById('statusMessage');
    const formUrl = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLScngS7b2bsrrEQLiHgN173vzBjasmuHIcXHaLe68qEZBci6pQ/formResponse';

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Crea un objeto con los datos del formulario usando los nombres de entrada de Google Forms
        const formData = new FormData(form);
        
        // Muestra un mensaje de "Enviando..."
        statusMessage.textContent = 'Enviando...';
        statusMessage.className = '';

        fetch(formUrl, {
            method: 'POST',
            body: formData,
            mode: 'no-cors' // Usa 'no-cors' para evitar errores del navegador
        })
        .then(() => {
            statusMessage.textContent = '¡Gracias! Tu mensaje ha sido enviado.';
            statusMessage.className = 'success';
            form.reset();
        })
        .catch(error => {
            console.error('Error al enviar el formulario:', error);
            statusMessage.textContent = 'Hubo un error. Intenta nuevamente.';
            statusMessage.className = 'error';
        });
    });
});