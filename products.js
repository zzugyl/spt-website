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

    // --- Tab switching ---
    var tabBtns = document.querySelectorAll('.tab-btn');
    var tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var tabId = this.getAttribute('data-tab');

            tabBtns.forEach(function(b) { b.classList.remove('active'); });
            tabContents.forEach(function(c) { c.classList.remove('active'); });

            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');

            animateCards(tabId);
        });
    });

    function animateCards(tabId) {
        var activeTab = document.getElementById(tabId);
        var cards = activeTab.querySelectorAll('.product-card');

        cards.forEach(function(card, index) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';

            setTimeout(function() {
                card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 80);
        });
    }

    // --- Initial card animation ---
    var productCards = document.querySelectorAll('.product-card');
    var observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    };

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    productCards.forEach(function(card, index) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

        setTimeout(function() {
            observer.observe(card);
        }, index * 80);
    });

    // --- Scroll animations ---
    var animElements = document.querySelectorAll('.anim-scale-in');
    var animObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                animObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animElements.forEach(function(el) {
        animObserver.observe(el);
    });
});