// Tu endpoint correcto
const SHEETS_ENDPOINT = "https://script.google.com/macros/s/AKfycbzU0ycBwyMAzElKtYwktuiDBrKbY-APBoptTHTw9-PM4VTzi3qf3LNq8DOWuvnU1iXa/exec";

document.addEventListener("DOMContentLoaded", function() {
    const leadFormSimple = document.getElementById('leadFormSimple');
    if (leadFormSimple) {
        leadFormSimple.addEventListener('submit', function(e) {
            e.preventDefault();

            // Prepara los datos en formato x-www-form-urlencoded
            const params = new URLSearchParams();
            params.append('nombre', document.getElementById('leadNameSimple').value.trim());
            params.append('email', document.getElementById('leadEmailSimple').value.trim());
            params.append('mensaje', document.getElementById('leadMessageSimple').value.trim());
            params.append('source', document.getElementById('leadSourceSimple').value.trim());

            fetch(SHEETS_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: params.toString()
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
