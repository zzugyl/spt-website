document.addEventListener('DOMContentLoaded', function() {
    const solutionSections = document.querySelectorAll('.solution-section');
    const featureItems = document.querySelectorAll('.feature-item');
    const industryCards = document.querySelectorAll('.industry-card');
    const techCards = document.querySelectorAll('.tech-card');

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const animateOnScroll = (elements, delay = 0) => {
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            el.style.transitionDelay = `${delay + index * 0.1}s`;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);

            observer.observe(el);
        });
    };

    if (featureItems.length) animateOnScroll(featureItems);
    if (industryCards.length) animateOnScroll(industryCards, 0.2);
    if (techCards.length) animateOnScroll(techCards);

    solutionSections.forEach(section => {
        const image = section.querySelector('.solution-image');
        const text = section.querySelector('.solution-text');
        
        if (image) {
            image.style.opacity = '0';
            image.style.transform = 'translateX(50px)';
            image.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        image.style.opacity = '1';
                        image.style.transform = 'translateX(0)';
                    }
                });
            }, { threshold: 0.2 });
            
            observer.observe(image);
        }
        
        if (text) {
            text.style.opacity = '0';
            text.style.transform = 'translateX(-50px)';
            text.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        text.style.opacity = '1';
                        text.style.transform = 'translateX(0)';
                    }
                });
            }, { threshold: 0.2 });
            
            observer.observe(text);
        }
    });

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