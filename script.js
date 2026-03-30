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

    /* ─── Mobile menu toggle ─── */
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu    = document.getElementById('mobileMenu');
    const iconOpen      = document.getElementById('icon-open');
    const iconClose     = document.getElementById('icon-close');

    const toggleMenu = (forceClose = false) => {
        const isOpen = mobileMenu.classList.contains('open');
        if (forceClose || isOpen) {
            mobileMenu.classList.remove('open');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenu.setAttribute('aria-hidden', 'true');
            iconOpen.style.display  = '';
            iconClose.style.display = 'none';
        } else {
            mobileMenu.classList.add('open');
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
            mobileMenu.setAttribute('aria-hidden', 'false');
            iconOpen.style.display  = 'none';
            iconClose.style.display = '';
        }
    };

    mobileMenuBtn.addEventListener('click', () => toggleMenu());

    // Close on mobile link click
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => toggleMenu(true));
    });

    /* ─── Active nav link on scroll ─── */
    const sections  = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.nav-links a');
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

    /* ─── Contact form: basic UX feedback ─── */
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const btn = document.getElementById('submit-form-btn');
            btn.textContent = '✅ ¡Mensaje enviado!';
            btn.style.background = 'var(--green)';
            btn.disabled = true;

            // Reset after 4s (simulated)
            setTimeout(() => {
                btn.textContent = 'Enviar consulta';
                btn.style.background = '';
                btn.disabled = false;
                form.reset();
            }, 4000);
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
