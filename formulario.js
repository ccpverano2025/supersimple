const SHEETS_ENDPOINT = "https://script.google.com/macros/s/AKfycbyd4xZeCgmnXixSi6J5KplqOmPC5-gBveeK9R6HXwn6TVKPp2Ql6qokn0_wiM1hmxhy/exec";

function enviarFormulario(formId, source) {
    const nombre = document.getElementById(`leadName${source}`).value.trim();
    const email = document.getElementById(`leadEmail${source}`).value.trim();
    const mensaje = document.getElementById(`leadMessage${source}`).value.trim();

    fetch(SHEETS_ENDPOINT, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            nombre,
            email,
            mensaje,
            source: source.toLowerCase()
        })
    })
    .then(res => res.text())
    .then(res => {
        alert('¡Gracias por tu interés! Nos pondremos en contacto pronto.');
        document.getElementById(formId).reset();
    })
    .catch(err => {
        alert('Hubo un error al enviar la consulta. Intenta nuevamente.');
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const leadFormHero = document.getElementById('leadFormHero');
    if (leadFormHero) {
        leadFormHero.addEventListener('submit', function(e) {
            e.preventDefault();
            enviarFormulario('leadFormHero', 'Hero');
        });
    }

    const leadFormContact = document.getElementById('leadFormContact');
    if (leadFormContact) {
        leadFormContact.addEventListener('submit', function(e) {
            e.preventDefault();
            enviarFormulario('leadFormContact', 'Contact');
        });
    }
});
