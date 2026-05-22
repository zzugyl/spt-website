document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const nav = document.querySelector('.nav');
    const tabBtns = document.querySelectorAll('.news-tab-btn');
    const newsCards = document.querySelectorAll('.news-card');
    const pageBtns = document.querySelectorAll('.page-btn');
    const prevBtn = document.querySelector('.page-btn.prev');
    const nextBtn = document.querySelector('.page-btn.next');
    const videoCards = document.querySelectorAll('.video-news-card');
    
    const newsDetailModal = document.createElement('div');
    newsDetailModal.className = 'news-detail-modal';
    newsDetailModal.innerHTML = `
        <div class="news-detail-modal-content">
            <button class="news-detail-close">
                <svg viewBox="0 0 24 24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
            </button>
            <div class="news-detail-header">
                <span class="news-detail-tag" id="news-detail-tag"></span>
                <h2 id="news-detail-title"></h2>
                <div class="news-detail-meta">
                    <span id="news-detail-date"></span>
                    <span id="news-detail-views"></span>
                </div>
            </div>
            <div class="news-detail-image">
                <img id="news-detail-img" src="" alt="">
            </div>
            <div class="news-detail-body" id="news-detail-body"></div>
        </div>
    `;
    document.body.appendChild(newsDetailModal);
    
    const newsDetailClose = newsDetailModal.querySelector('.news-detail-close');
    
    const newsLinks = document.querySelectorAll('.news-link');
    newsLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.news-card');
            const tag = card.querySelector('.news-tag').textContent;
            const tagClass = card.querySelector('.news-tag').classList.contains('company') ? 'company' : 
                           card.querySelector('.news-tag').classList.contains('industry') ? 'industry' : 'notice';
            const title = card.querySelector('.news-title').textContent;
            const date = card.querySelector('.news-date').textContent;
            const views = card.querySelector('.news-views').textContent;
            const imgSrc = card.querySelector('.news-image img').src;
            const excerpt = card.querySelector('.news-excerpt').textContent;
            
            document.getElementById('news-detail-tag').textContent = tag;
            document.getElementById('news-detail-tag').className = `news-detail-tag ${tagClass}`;
            document.getElementById('news-detail-title').textContent = title;
            document.getElementById('news-detail-date').textContent = date;
            document.getElementById('news-detail-views').textContent = views;
            document.getElementById('news-detail-img').src = imgSrc;
            document.getElementById('news-detail-body').innerHTML = `<p>${excerpt}</p><p>这是新闻的详细内容。更多关于${title}的信息，请联系我们的客服获取完整报道。</p>`;
            
            newsDetailModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    newsDetailClose.addEventListener('click', function() {
        newsDetailModal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    newsDetailModal.addEventListener('click', function(e) {
        if (e.target === newsDetailModal) {
            newsDetailModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && newsDetailModal.classList.contains('active')) {
            newsDetailModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    const videoModal = document.createElement('div');
    videoModal.className = 'video-modal';
    videoModal.innerHTML = `
        <div class="video-modal-content">
            <button class="video-modal-close">
                <svg viewBox="0 0 24 24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
            </button>
            <video controls poster="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=video%20placeholder%20thumbnail%20blue%20gradient&image_size=landscape_16_9">
                <source src="" type="video/mp4">
            </video>
        </div>
    `;
    document.body.appendChild(videoModal);
    
    const modalClose = videoModal.querySelector('.video-modal-close');
    const modalVideo = videoModal.querySelector('video');
    
    videoCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.video-title').textContent;
            modalVideo.src = 'https://www.w3schools.com/html/mov_bbb.mp4';
            modalVideo.title = title;
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            modalVideo.play().catch(() => {});
        });
    });
    
    modalClose.addEventListener('click', closeModal);
    
    videoModal.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeModal();
        }
    });
    
    function closeModal() {
        videoModal.classList.remove('active');
        document.body.style.overflow = '';
        modalVideo.pause();
        modalVideo.currentTime = 0;
    }

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