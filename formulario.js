// Tu nuevo endpoint GET
const SHEETS_ENDPOINT = "https://script.google.com/macros/s/AKfycbysEu6pLwTkrDD1y420XxXJrgaNWG5tNg48OBfk0x0K0KBkJDKIkk-dYSfBcXIR4ZT0/exec";

document.addEventListener("DOMContentLoaded", function() {
    const leadFormSimple = document.getElementById('leadFormSimple');
    if (leadFormSimple) {
        leadFormSimple.addEventListener('submit', function(e) {
            e.preventDefault();

            // Prepara los datos como un objeto para la URL
            const data = {
                nombre: document.getElementById('leadNameSimple').value.trim(),
                email: document.getElementById('leadEmailSimple').value.trim(),
                mensaje: document.getElementById('leadMessageSimple').value.trim(),
                source: document.getElementById('leadSourceSimple').value.trim()
            };

            // Crea la URL con los parámetros
            const url = `${SHEETS_ENDPOINT}?${new URLSearchParams(data).toString()}`;

            fetch(url, {
                method: 'GET' // Cambiamos a GET
            })
            .then(res => res.text())
            .then(res => {
                alert('¡Gracias por tu interés! Nos pondremos en contacto pronto.');
                leadFormSimple.reset();
            })
            .catch(err => {
                alert('Hubo un error al enviar la consulta. Intenta nuevamente.');
            });
        });
    }
});
