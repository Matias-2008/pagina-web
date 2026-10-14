// ===== Configuración de EmailJS =====
// Reemplaza estas constantes con tus credenciales de EmailJS.
const EMAILJS_PUBLIC_KEY = "MENptUzqdTfkozbBZ";
const EMAILJS_SERVICE_ID = "service_8brbrbh";
const EMAILJS_TEMPLATE_ID = "template_jang35r";

emailjs.init(EMAILJS_PUBLIC_KEY);

const form = document.getElementById("emailForm");
const submitBtn = document.getElementById("submitBtn");
const notice = document.getElementById("formNotice");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fields = {
    nombre: {
        input: document.getElementById("nombre"),
        error: document.getElementById("error-nombre"),
        validate: (value) => value.trim() === "" ? "El nombre es obligatorio." : ""
    },
    correo: {
        input: document.getElementById("correo"),
        error: document.getElementById("error-correo"),
        validate: (value) => {
            if (value.trim() === "") return "El correo es obligatorio.";
            if (!emailRegex.test(value.trim())) return "Ingresa un correo válido.";
            return "";
        }
    },
    asunto: {
        input: document.getElementById("asunto"),
        error: document.getElementById("error-asunto"),
        validate: (value) => value.trim() === "" ? "El asunto es obligatorio." : ""
    },
    mensaje: {
        input: document.getElementById("mensaje"),
        error: document.getElementById("error-mensaje"),
        validate: (value) => {
            if (value.trim() === "") return "El mensaje es obligatorio.";
            if (value.trim().length < 10) return "El mensaje debe tener al menos 10 caracteres.";
            return "";
        }
    }
};

function setFieldError(field, message) {
    field.error.textContent = message;
    field.input.parentElement.classList.toggle("invalid", message !== "");
}

function validateField(field) {
    const message = field.validate(field.input.value);
    setFieldError(field, message);
    return message === "";
}

function validateForm() {
    let valid = true;
    Object.values(fields).forEach((field) => {
        if (!validateField(field)) valid = false;
    });
    return valid;
}

Object.values(fields).forEach((field) => {
    field.input.addEventListener("blur", () => validateField(field));
    field.input.addEventListener("input", () => {
        if (field.input.parentElement.classList.contains("invalid")) {
            validateField(field);
        }
    });
});

function showNotice(message, type) {
    notice.textContent = message;
    notice.className = "form-notice show " + type;
}

function hideNotice() {
    notice.className = "form-notice";
    notice.textContent = "";
}

function setLoading(isLoading) {
    submitBtn.disabled = isLoading;
    submitBtn.textContent = isLoading ? "Enviando..." : "Enviar correo";
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    hideNotice();

    if (!validateForm()) {
        showNotice("Revisa los campos marcados en rojo.", "error");
        return;
    }

    const params = {
        to_name: fields.nombre.input.value.trim(),
        to_email: fields.correo.input.value.trim(),
        subject: fields.asunto.input.value.trim(),
        message: fields.mensaje.input.value.trim()
    };

    setLoading(true);

    try {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params);
        showNotice("¡Correo enviado correctamente!", "success");
        form.reset();
    } catch (error) {
        console.error("Error al enviar el correo:", error);
        showNotice("Hubo un error al enviar el correo. Inténtalo de nuevo.", "error");
    } finally {
        setLoading(false);
    }
});
