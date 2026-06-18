document.addEventListener('DOMContentLoaded', function() {
    // --- Header scroll effect ---
    var header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Mobile nav toggle ---
    var navToggle = document.getElementById('navToggle');
    var nav = document.getElementById('nav');

    if (navToggle && nav) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });

        nav.querySelectorAll('.nav-link').forEach(function(link) {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // --- Scroll animations ---
    var animElements = document.querySelectorAll('.anim-fade-up, .anim-fade-in, .anim-scale-in, .anim-slide-left, .anim-slide-right');

    var observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    };

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animElements.forEach(function(el) {
        observer.observe(el);
    });
});