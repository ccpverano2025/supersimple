// URL de tu Google Apps Script Web App (ya probada)
/// const SHEETS_ENDPOINT = "https://script.google.com/macros/s/AKfycbxKbsJW5xsehpGShiIhs8NU9qL34G8RuwBe7H0jVTBUwSR7TpSVDxPhxc348o2FLezZ/exec";



// URL de tu Google Apps Script Web App
///const SHEETS_ENDPOINT = "https://script.google.com/macros/s/AKfycbyd4xZeCgmnXixSi6J5KplqOmPC5-gBveeK9R6HXwn6TVKPp2Ql6qokn0_wiM1hmxhy/exec";
// const SHEETS_ENDPOINT = "https://script.google.com/macros/s/AKfycby_Pst-iuuVwMTQyc1J2XIPDAquKxlh5IuFVNxog16y1DydSkhvQtWQKqfNH2IHlGx_/exec";

const SHEETS_ENDPOINT = "https://script.google.com/macros/s/AKfycbyWsjv11eS4DZVnDok_KB18IVnLNHDVATTW2KcvSWiHj_hSMIu5rbauPblDB51QEJIL/exec";

// Toda la lógica JavaScript aquí
document.addEventListener("DOMContentLoaded", function() {
    const leadFormSimple = document.getElementById('leadFormSimple');
    if (leadFormSimple) {
        leadFormSimple.addEventListener('submit', function(e) {
            e.preventDefault();
            const nombre = document.getElementById('leadNameSimple').value.trim();
            const email = document.getElementById('leadEmailSimple').value.trim();
            const mensaje = document.getElementById('leadMessageSimple').value.trim();
            const source = document.getElementById('leadSourceSimple').value.trim();

            fetch(SHEETS_ENDPOINT, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    nombre,
                    email,
                    mensaje,
                    source
                })
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
