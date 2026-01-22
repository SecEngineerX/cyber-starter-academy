// script.js — Immersive animations: Particles background, GSAP reveals, button interactions, code copy

// Initialize Particles.js for futuristic matrix/code rain in hero
particlesJS('particles-js', {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: '#58a6ff' },
    shape: { type: 'circle', stroke: { width: 0, color: '#000000' } },
    opacity: { value: 0.5, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
    size: { value: 3, random: true, anim: { enable: false } },
    line_linked: { enable: false },
    move: { enable: true, speed: 2, direction: 'bottom', random: true, straight: false, out_mode: 'out', bounce: false, attract: { enable: false } }
  },
  interactivity: {
    detect_on: 'canvas',
    events: { onhover: { enable: true, mode: 'bubble' }, onclick: { enable: true, mode: 'repulse' }, resize: true },
    modes: { bubble: { distance: 250, size: 0, duration: 2, opacity: 0 }, repulse: { distance: 400, duration: 0.4 } }
  },
  retina_detect: true
});

// GSAP Hero Text Reveal: Staggered fade-in with glow
gsap.from('.hero-title', { duration: 1.5, y: 50, opacity: 0, ease: 'power3.out', delay: 0.5 });
gsap.from('.hero-subtitle', { duration: 1.5, y: 50, opacity: 0, ease: 'power3.out', delay: 1 });
gsap.from('.hero .btn', { duration: 1.5, y: 50, opacity: 0, ease: 'power3.out', delay: 1.5 });

// Elements
const discordBtn = document.getElementById('discord-btn');
const copyBtn = document.getElementById('copy-btn');
const inviteCode = document.getElementById('invite-code').textContent;
const messageBox = document.getElementById('message');

// Show message with GSAP animation
function showMessage(msg, type = 'info') {
  messageBox.textContent = msg;
  messageBox.classList.remove('success', 'error');
  messageBox.classList.add(type);
  gsap.fromTo(messageBox, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' });
  setTimeout(() => gsap.to(messageBox, { opacity: 0, scale: 0.9, duration: 0.6, ease: 'back.in(1.7)' }), 5000);
}

// Discord Button: Click with confetti and redirect
discordBtn.addEventListener('click', (e) => {
  e.preventDefault(); // Allow fallback if needed
  showMessage('Launching into Discord... 🚀', 'success');
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.5 },
    colors: ['#58a6ff', '#238636', '#ffffff'],
    shapes: ['square', 'circle'],
    scalar: 1.2
  });
  setTimeout(() => { window.location.href = discordBtn.href; }, 1500); // Delay for animation
});

// Copy Invite Code: With GSAP feedback
copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(inviteCode)
    .then(() => {
      showMessage('Invite code copied! Paste in Discord.', 'success');
      gsap.to(copyBtn, { scale: 1.1, duration: 0.3, yoyo: true, repeat: 1, ease: 'elastic.out(1, 0.3)' });
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 }, colors: ['#58a6ff'] });
    })
    .catch(() => showMessage('Copy failed. Select the code manually and copy.', 'error'));
});
