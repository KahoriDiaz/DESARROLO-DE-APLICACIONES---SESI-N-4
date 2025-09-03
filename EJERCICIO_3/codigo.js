const lengthInput = document.getElementById('length');
const includeUppercaseCheckbox = document.getElementById('include-uppercase');
const includeLowercaseCheckbox = document.getElementById('include-lowercase');
const includeNumbersCheckbox = document.getElementById('include-numbers');
const includeSymbolsCheckbox = document.getElementById('include-symbols');
const generateButton = document.getElementById('generate-button');
const passwordModal = document.getElementById('password-modal');
const closeModalButton = document.getElementById('close-modal');
const generatedPasswordSpan = document.getElementById('generated-password');

const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

function generarContrasena() {
    const longitud = parseInt(lengthInput.value);
    
    let caracteresPermitidos = '';
    
    if (includeUppercaseCheckbox.checked) {
        caracteresPermitidos += uppercaseChars;
    }
    if (includeLowercaseCheckbox.checked) {
        caracteresPermitidos += lowercaseChars;
    }
    if (includeNumbersCheckbox.checked) {
        caracteresPermitidos += numberChars;
    }
    if (includeSymbolsCheckbox.checked) {
        caracteresPermitidos += symbolChars;
    }

    if (caracteresPermitidos.length === 0) {
        alert('Por favor, selecciona al menos un tipo de caracter.');
        return; 
    }

    let contrasenaFinal = '';

    for (let i = 0; i < longitud; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteresPermitidos.length);
        contrasenaFinal += caracteresPermitidos[indiceAleatorio];
    }
    
    generatedPasswordSpan.textContent = contrasenaFinal;
    passwordModal.style.display = 'flex';
    startConfetti();
}

generateButton.addEventListener('click', generarContrasena);

closeModalButton.addEventListener('click', () => {
    passwordModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === passwordModal) {
        passwordModal.style.display = 'none';
    }
});

const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let confettiParticles = [];

function startConfetti() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    confettiParticles = []; 
    
    for (let i = 0; i < 150; i++) {
        confettiParticles.push({
            x: Math.random() * canvas.width,
            y: -Math.random() * canvas.height, 
            color: `hsl(${Math.random() * 360}, 100%, 70%)`, 
            size: Math.random() * 5 + 5,
            speed: Math.random() * 3 + 2,
            angle: Math.random() * Math.PI * 2
        });
    }
    animateConfetti(); 
}

let animationFrameId;
function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    let allParticlesOffScreen = true;

    confettiParticles.forEach(p => {
        p.y += p.speed;
        p.x += Math.sin(p.y * 0.1) * 2; 

        // Dibujamos la partícula
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size * 1.5);

        if (p.y < canvas.height) {
            allParticlesOffScreen = false;
        }
    });

    if (allParticlesOffScreen) {
        cancelAnimationFrame(animationFrameId);
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
    } else {
        animationFrameId = requestAnimationFrame(animateConfetti);
    }
}