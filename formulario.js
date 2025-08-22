// Tu nuevo endpoint
const SHEETS_ENDPOINT = "https://script.google.com/macros/s/AKfycbyH2ik3IoJ4Cqzr3yDrTLjx0W4woXHz2101Ofdec8PtvPkoAHPUwB_8AS67sDTyfKrT/exec";

document.addEventListener("DOMContentLoaded", function() {
    const leadFormSimple = document.getElementById('leadFormSimple');
    if (leadFormSimple) {
        leadFormSimple.addEventListener('submit', function(e) {
            e.preventDefault();

            // Prepara los datos como un objeto JSON
            const data = {
                nombre: document.getElementById('leadNameSimple').value.trim(),
                email: document.getElementById('leadEmailSimple').value.trim(),
                mensaje: document.getElementById('leadMessageSimple').value.trim(),
                source: document.getElementById('leadSourceSimple').value.trim()
            };

            fetch(SHEETS_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8'
                },
                body: JSON.stringify(data)
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
