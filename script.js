/* ═══════════════════════════════════════
   SEGNEC — script.js
   ═══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    /* ─── Navbar: scroll shadow ─── */
    const navbar = document.getElementById('navbar');
    const onScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 30);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ─── Active nav link on scroll ─── */
    const sections  = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.nav-links a, .mobile-bottom-nav .nav-item');
    const observer  = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.4 });
    sections.forEach(s => observer.observe(s));

    /* ─── Animate service cards on scroll ─── */
    const animateOnScroll = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity    = '1';
                entry.target.style.transform  = 'translateY(0)';
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.service-card, .blog-card, .stat-item').forEach((el, i) => {
        el.style.opacity   = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`;
        animateOnScroll.observe(el);
    });

    /* ─── Contact form: actual submission via PHP ─── */
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', async e => {
            e.preventDefault();
            const btn = document.getElementById('submit-form-btn');
            const originalText = btn.innerHTML;
            
            // UI Feedback: Sending...
            btn.disabled = true;
            btn.innerHTML = 'Enviando...';

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('/api/contacto', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (result.status === 'success') {
                    // Success UI
                    btn.textContent = '✅ ¡Mensaje enviado!';
                    btn.style.background = 'var(--green)';
                    form.reset();
                } else {
                    // Error from server
                    throw new Error(result.message || 'Error en el servidor');
                }
            } catch (error) {
                console.error('Error:', error);
                btn.textContent = '❌ Error';
                btn.style.background = 'var(--error, #f44336)';
                
                let errorMsg = 'Hubo un error al enviar tu consulta.';
                if (error.message.includes('API Key')) {
                    errorMsg = 'Error de configuración: falta la API Key de Resend en Vercel.';
                } else if (error.message.includes('Resend')) {
                    errorMsg = 'El servidor de correos (Resend) rechazó el envío. Verificá si el dominio está validado.';
                }

                alert(`${errorMsg}\n\nPor favor, intentá nuevamente o contactanos directamente por WhatsApp.`);
            } finally {
                // Reset button after 5 seconds
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 5000);
            }
        });
    }

    /* ─── WhatsApp float: show/hide on scroll direction ─── */
    let lastScrollY = window.scrollY;
    const waBtn = document.getElementById('whatsapp-float-btn');
    window.addEventListener('scroll', () => {
        const currentY = window.scrollY;
        // Hide if scrolling down fast, show again on up or near bottom
        if (waBtn) {
            const nearBottom = (window.innerHeight + currentY) >= document.body.offsetHeight - 200;
            if (nearBottom) {
                waBtn.style.opacity = '0';
                waBtn.style.pointerEvents = 'none';
            } else {
                waBtn.style.opacity = '';
                waBtn.style.pointerEvents = '';
            }
        }
        lastScrollY = currentY;
    }, { passive: true });

});
