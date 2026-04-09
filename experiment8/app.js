// Handle sidebar navigation
const navLinks = document.querySelectorAll('.nav-link');
const steps = document.querySelectorAll('.step');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        // Add active class to clicked link
        link.classList.add('active');

        // Hide all steps
        steps.forEach(step => step.classList.remove('active'));

        // Show selected step
        const targetId = link.getAttribute('href');
        const targetStep = document.querySelector(targetId);
        if (targetStep) {
            targetStep.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
});

// Smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
