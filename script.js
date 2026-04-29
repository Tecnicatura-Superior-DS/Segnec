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

    /* ─── Contact form: submission via WhatsApp ─── */
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            const { nombre, email, telefono, mensaje } = data;
            
            let text = `Hola Segnec, mi nombre es ${nombre}.\n`;
            text += `Email: ${email}\n`;
            if (telefono) {
                text += `Teléfono: ${telefono}\n`;
            }
            text += `\nMensaje:\n${mensaje}`;

            const waUrl = `https://wa.me/5492235310222?text=${encodeURIComponent(text)}`;
            
            // Abrir WhatsApp en una nueva pestaña
            window.open(waUrl, '_blank');
            
            form.reset();
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
