document.addEventListener('DOMContentLoaded', function() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const statSection = document.querySelector('.about-stats');
    const valueCards = document.querySelectorAll('.value-card');
    const teamCards = document.querySelectorAll('.team-card');
    const timelineItems = document.querySelectorAll('.timeline-item');
    let hasAnimated = false;

    function animateNumbers() {
        statNumbers.forEach(num => {
            const target = parseInt(num.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateNumber = () => {
                current += increment;
                if (current < target) {
                    num.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateNumber);
                } else {
                    num.textContent = target.toLocaleString();
                }
            };

            updateNumber();
        });
    }

    const observerOptions = {
        threshold: 0.3
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateNumbers();
            }
        });
    }, observerOptions);

    if (statSection) {
        statsObserver.observe(statSection);
    }

    const animateOnScroll = (elements, delay = 0) => {
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            el.style.transitionDelay = `${delay + index * 0.1}s`;

            setTimeout(() => {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            el.style.opacity = '1';
                            el.style.transform = 'translateY(0)';
                        }
                    });
                }, { threshold: 0.1 });

                observer.observe(el);
            }, 100);
        });
    };

    if (valueCards.length) animateOnScroll(valueCards);
    if (teamCards.length) animateOnScroll(teamCards);
    if (timelineItems.length) animateOnScroll(timelineItems);

    const contactBtn = document.querySelector('.contact-box .btn');
    if (contactBtn) {
        contactBtn.addEventListener('click', function() {
            alert('感谢您的关注！请拨打热线电话：023-65586813或发送邮件至 spt@sptyun.com 与我们联系。');
        });
    }

    const navLinks = document.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
          link.addEventListener('click', function() {
              navLinks.forEach(l => l.classList.remove('active'));
              this.classList.add('active');
          });
      });
});