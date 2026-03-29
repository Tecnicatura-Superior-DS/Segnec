// Script for Propuesta 3 (Afiche/Volante)
document.addEventListener('DOMContentLoaded', () => {
    // Buttons interaction or smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
