document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const nav = document.querySelector('.nav');
    const tabBtns = document.querySelectorAll('.news-tab-btn');
    const newsCards = document.querySelectorAll('.news-card');
    const pageBtns = document.querySelectorAll('.page-btn');
    const prevBtn = document.querySelector('.page-btn.prev');
    const nextBtn = document.querySelector('.page-btn.next');

    if (navToggle && nav) {
        navToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
        
        nav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
            });
        });
    }

    let currentCategory = 'all';
    let currentPage = 1;
    const itemsPerPage = 6;

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            currentCategory = category;
            currentPage = 1;
            filterAndPaginateNews();
        });
    });

    function filterAndPaginateNews() {
        const filteredCards = currentCategory === 'all' 
            ? Array.from(newsCards) 
            : Array.from(newsCards).filter(card => card.getAttribute('data-category') === currentCategory);
        
        const totalPages = Math.ceil(filteredCards.length / itemsPerPage);
        
        newsCards.forEach(card => card.classList.add('hidden'));
        
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        
        filteredCards.slice(startIndex, endIndex).forEach((card, index) => {
            card.classList.remove('hidden');
            card.style.animation = 'fadeIn 0.5s ease';
            card.style.animationDelay = `${index * 0.1}s`;
        });
        
        updatePagination(totalPages);
    }

    function updatePagination(totalPages) {
        pageBtns.forEach(btn => {
            if (btn.classList.contains('prev') || btn.classList.contains('next')) return;
            btn.classList.remove('active');
        });
        
        const pageNumbers = document.querySelectorAll('.page-btn:not(.prev):not(.next)');
        pageNumbers.forEach((btn, index) => {
            if (index + 1 === currentPage) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
            btn.style.display = index + 1 <= totalPages ? 'inline-block' : 'none';
        });
        
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;
    }

    pageBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.disabled) return;
            
            if (this.classList.contains('prev')) {
                currentPage--;
            } else if (this.classList.contains('next')) {
                currentPage++;
            } else {
                currentPage = parseInt(this.textContent);
            }
            
            filterAndPaginateNews();
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    newsCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            observer.observe(card);
        }, index * 100);
    });

    filterAndPaginateNews();

    const navLinks = document.querySelectorAll('.nav-link');
     navLinks.forEach(link => {
         link.addEventListener('click', function() {
             navLinks.forEach(l => l.classList.remove('active'));
             this.classList.add('active');
         });
     });
});