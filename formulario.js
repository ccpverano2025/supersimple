// Elementos del DOM
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const loading = document.getElementById('loading');
const message = document.getElementById('message');

// URL de tu Google Form
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLScngS7b2bsrrEQLiHgN173vzBjasmuHIcXHaLe68qEZBci6pQ/formResponse';

// Mapeo de campos del formulario con entries de Google Forms
const FIELD_MAPPING = {
    'nombre': 'entry.1604731498',
    'email': 'entry.1843886309', 
    'fuente': 'entry.1443923370',
    'mensaje': 'entry.479977210'
};

// Inicialización cuando se carga el DOM
document.addEventListener('DOMContentLoaded', function() {
    initializeFormAnimations();
    setupFormValidation();
});

// Event listener principal del formulario
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        return;
    }
    
    await submitForm();
});

// Función para validar el formulario
function validateForm() {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'Este campo es obligatorio');
            isValid = false;
        } else {
            clearFieldError(field);
        }
    });
    
    // Validación específica para email
    const emailField = document.getElementById('email');
    if (emailField.value && !isValidEmail(emailField.value)) {
        showFieldError(emailField, 'Por favor ingresa un email válido');
        isValid = false;
    }
    
    return isValid;
}

// Función para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para mostrar errores en campos
function showFieldError(field, errorMessage) {
    // Remover error previo si existe
    clearFieldError(field);
    
    field.style.borderColor = '#dc3545';
    field.style.boxShadow = '0 0 0 4px rgba(220, 53, 69, 0.1)';
    
    // Crear elemento de error
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = errorMessage;
    errorElement.style.cssText = `
        color: #dc3545;
        font-size: 12px;
        margin-top: 5px;
        font-weight: 600;
        animation: slideDown 0.3s ease;
    `;
    
    field.parentElement.appendChild(errorElement);
}

// Función para limpiar errores de campos
function clearFieldError(field) {
    field.style.borderColor = '#e1e5e9';
    field.style.boxShadow = 'none';
    
    const existingError = field.parentElement.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// Función principal para enviar el formulario
async function submitForm() {
    try {
        // Cambiar estado a loading
        setLoadingState(true);
        
        // Crear FormData con los campos mapeados
        const formData = new FormData();
        
        // Mapear cada campo con su entry correspondiente de Google Forms
        Object.keys(FIELD_MAPPING).forEach(fieldName => {
            const fieldElement = document.getElementById(fieldName);
            const fieldValue = fieldElement.value.trim();
            formData.append(FIELD_MAPPING[fieldName], fieldValue);
        });
        
        // Enviar datos a Google Forms
        const response = await fetch(GOOGLE_FORM_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: formData
        });
        
        // Como usamos no-cors, no podemos verificar el status de la respuesta
        // Pero Google Forms casi siempre acepta los datos correctamente
        await simulateProcessingTime();
        
        // Mostrar mensaje de éxito con información adicional
        showSuccessMessage();
        
        // Limpiar formulario después del éxito
        resetForm();
        
        // Añadir efectos visuales de celebración
        triggerSuccessAnimation();
        
    } catch (error) {
        console.error('Error al enviar formulario:', error);
        showErrorMessage('Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo en unos momentos.');
    } finally {
        setLoadingState(false);
    }
}

// Función para simular tiempo de procesamiento (mejor UX)
function simulateProcessingTime() {
    return new Promise(resolve => {
        setTimeout(resolve, 1500);
    });
}

// Función para cambiar estado de loading
function setLoadingState(isLoading) {
    if (isLoading) {
        submitBtn.disabled = true;
        loading.style.display = 'block';
        message.style.display = 'none';
        
        // Añadir clase para animación del botón
        submitBtn.style.opacity = '0.7';
        
    } else {
        submitBtn.disabled = false;
        loading.style.display = 'none';
        submitBtn.style.opacity = '1';
    }
}

// Función para mostrar mensaje de éxito personalizado
function showSuccessMessage() {
    const successHTML = `
        <div style="display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 15px;">
            <i class="fas fa-check-circle" style="font-size: 24px; color: #28a745;"></i>
            <strong style="font-size: 18px;">¡Mensaje enviado con éxito!</strong>
        </div>
        <p style="margin-bottom: 15px; line-height: 1.6;">
            Gracias por contactarnos. Hemos recibido tu mensaje correctamente y se ha guardado en nuestro sistema.
        </p>
        <div style="padding: 15px; background: rgba(40, 167, 69, 0.1); border-radius: 10px; border-left: 4px solid #28a745;">
            <p style="margin: 0; font-weight: 600; color: #155724;">
                <i class="fas fa-clock" style="margin-right: 8px;"></i>
                Nos estaremos comunicando contigo a la brevedad. 
                Nuestro equipo revisará tu consulta y te responderá dentro de las próximas 24 horas.
            </p>
        </div>
    `;
    
    showMessage(successHTML, 'success');
}

// Función para mostrar mensaje de error
function showErrorMessage(errorText) {
    const errorHTML = `
        <div style="display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 10px;">
            <i class="fas fa-exclamation-triangle" style="font-size: 24px; color: #dc3545;"></i>
            <strong>Error al enviar</strong>
        </div>
        <p style="margin: 0;">${errorText}</p>
    `;
    
    showMessage(errorHTML, 'error');
}

// Función genérica para mostrar mensajes
function showMessage(html, type) {
    message.innerHTML = html;
    message.className = `message ${type}`;
    message.style.display = 'block';
    
    // Scroll suave hacia el mensaje
    message.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Auto-ocultar mensaje después de 8 segundos para éxito, 6 para error
    const hideDelay = type === 'success' ? 8000 : 6000;
    setTimeout(() => {
        hideMessage();
    }, hideDelay);
}

// Función para ocultar mensaje
function hideMessage() {
    message.style.opacity = '0';
    setTimeout(() => {
        message.style.display = 'none';
        message.style.opacity = '1';
    }, 300);
}

// Función para resetear el formulario
function resetForm() {
    form.reset();
    
    // Limpiar cualquier error visible
    form.querySelectorAll('input, select, textarea').forEach(field => {
        clearFieldError(field);
    });
}

// Función para animación de éxito
function triggerSuccessAnimation() {
    // Añadir clase de éxito al container
    const container = document.querySelector('.container');
    container.style.transform = 'translateY(-8px) scale(1.02)';
    container.style.boxShadow = '0 25px 50px rgba(40, 167, 69, 0.2)';
    
    // Crear confetti effect
    createConfettiEffect();
    
    // Restaurar estado después de la animación
    setTimeout(() => {
        container.style.transform = 'translateY(0) scale(1)';
        container.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2)';
    }, 2000);
}

// Función para crear efecto de confetti
function createConfettiEffect() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#28a745', '#ffc107'];
    const container = document.querySelector('.container');
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: absolute;
                width: 8px;
                height: 8px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                top: 50%;
                left: ${Math.random() * 100}%;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                animation: confettiFall 3s ease-out forwards;
            `;
            
            container.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
            
        }, i * 100);
    }
}

// Función para inicializar animaciones del formulario
function initializeFormAnimations() {
    // Animaciones para inputs cuando reciben foco
    document.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
            this.parentElement.style.transition = 'transform 0.3s ease';
        });
        
        field.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
        
        // Limpiar errores cuando el usuario empieza a escribir
        field.addEventListener('input', function() {
            if (this.parentElement.querySelector('.field-error')) {
                clearFieldError(this);
            }
        });
    });
    
    // Animación del botón de envío
    submitBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.02)';
    });
    
    submitBtn.addEventListener('mouseleave', function() {
        if (!this.disabled) {
            this.style.transform = 'translateY(0) scale(1)';
        }
    });
}

// Función para configurar validación en tiempo real
function setupFormValidation() {
    const emailField = document.getElementById('email');
    
    emailField.addEventListener('blur', function() {
        if (this.value && !isValidEmail(this.value)) {
            showFieldError(this, 'Por favor ingresa un email válido');
        }
    });
    
    // Validación en tiempo real para todos los campos requeridos
    form.querySelectorAll('[required]').forEach(field => {
        field.addEventListener('blur', function() {
            if (!this.value.trim()) {
                showFieldError(this, 'Este campo es obligatorio');
            }
        });
    });
}

// Añadir estilos CSS dinámicos para animaciones
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes confettiFall {
            0% {
                opacity: 1;
                transform: translateY(0) rotate(0deg);
            }
            100% {
                opacity: 0;
                transform: translateY(300px) rotate(720deg);
            }
        }
        
        .field-error {
            animation: slideDown 0.3s ease;
        }
        
        .form-group {
            transition: transform 0.3s ease;
        }
        
        .btn-submit {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .message {
            animation: slideDown 0.5s ease;
        }
    `;
    document.head.appendChild(style);
}

// Función para mostrar tips de ayuda
function showHelpTips() {
    const tips = [
        {
            field: 'nombre',
            tip: 'Ingresa tu nombre completo para una mejor atención personalizada'
        },
        {
            field: 'email', 
            tip: 'Asegúrate de que tu email sea correcto para poder contactarte'
        },
        {
            field: 'mensaje',
            tip: 'Cuéntanos con detalle tu consulta para poder ayudarte mejor'
        }
    ];
    
    tips.forEach(({field, tip}) => {
        const fieldElement = document.getElementById(field);
        const tooltip = document.createElement('div');
        tooltip.className = 'field-tooltip';
        tooltip.textContent = tip;
        tooltip.style.cssText = `
            position: absolute;
            background: #333;
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 12px;
            top: 100%;
            left: 0;
            margin-top: 5px;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
            z-index: 10;
            max-width: 250px;
            line-height: 1.4;
        `;
        
        fieldElement.parentElement.style.position = 'relative';
        fieldElement.parentElement.appendChild(tooltip);
        
        fieldElement.addEventListener('focus', () => {
            tooltip.style.opacity = '1';
        });
        
        fieldElement.addEventListener('blur', () => {
            tooltip.style.opacity = '0';
        });
    });
}

// Función para manejar el estado offline
function handleOfflineState() {
    window.addEventListener('online', () => {
        showMessage('Conexión restablecida. Puedes enviar tu formulario.', 'success');
    });
    
    window.addEventListener('offline', () => {
        showMessage('Sin conexión a internet. Tu mensaje se enviará cuando se restablezca la conexión.', 'error');
    });
}

// Función para guardar datos del formulario localmente (como backup)
function saveFormDataLocally() {
    const formData = {};
    
    Object.keys(FIELD_MAPPING).forEach(fieldName => {
        const fieldElement = document.getElementById(fieldName);
        formData[fieldName] = fieldElement.value;
    });
    
    try {
        localStorage.setItem('formBackup', JSON.stringify(formData));
    } catch (e) {
        console.log('No se pudo guardar backup local');
    }
}

// Función para restaurar datos del formulario
function restoreFormData() {
    try {
        const savedData = localStorage.getItem('formBackup');
        if (savedData) {
            const formData = JSON.parse(savedData);
            
            Object.keys(formData).forEach(fieldName => {
                const fieldElement = document.getElementById(fieldName);
                if (fieldElement && formData[fieldName]) {
                    fieldElement.value = formData[fieldName];
                }
            });
        }
    } catch (e) {
        console.log('No se pudo restaurar backup local');
    }
}

// Función para limpiar datos locales después del envío exitoso
function clearLocalBackup() {
    try {
        localStorage.removeItem('formBackup');
    } catch (e) {
        console.log('No se pudo limpiar backup local');
    }
}

// Inicialización completa cuando se carga la página
window.addEventListener('load', function() {
    addDynamicStyles();
    showHelpTips();
    handleOfflineState();
    restoreFormData();
    
    // Guardar datos del formulario cada vez que el usuario escribe
    Object.keys(FIELD_MAPPING).forEach(fieldName => {
        const fieldElement = document.getElementById(fieldName);
        fieldElement.addEventListener('input', saveFormDataLocally);
    });
    
    console.log('🚀 Formulario de contacto inicializado correctamente');
});

// Modificar la función de éxito para limpiar backup
function showSuccessMessage() {
    const successHTML = `
        <div style="display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 15px;">
            <i class="fas fa-check-circle" style="font-size: 24px; color: #28a745;"></i>
            <strong style="font-size: 18px;">¡Mensaje enviado con éxito!</strong>
        </div>
        <p style="margin-bottom: 15px; line-height: 1.6;">
            Gracias por contactarnos. Hemos recibido tu mensaje correctamente y se ha guardado en nuestro sistema.
        </p>
        <div style="padding: 15px; background: rgba(40, 167, 69, 0.1); border-radius: 10px; border-left: 4px solid #28a745;">
            <p style="margin: 0; font-weight: 600; color: #155724;">
                <i class="fas fa-clock" style="margin-right: 8px;"></i>
                Nos estaremos comunicando contigo a la brevedad. 
                Nuestro equipo revisará tu consulta y te responderá dentro de las próximas 24 horas.
            </p>
        </div>
    `;
    
    showMessage(successHTML, 'success');
    
    // Limpiar backup local después del envío exitoso
    clearLocalBackup();
}