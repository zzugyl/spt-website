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

    // --- News Detail Modal ---
    var newsDetailModal = document.createElement('div');
    newsDetailModal.className = 'news-detail-modal';
    newsDetailModal.innerHTML = '<div class="news-detail-modal-content">' +
        '<button class="news-detail-close"><svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></button>' +
        '<div class="news-detail-header"><span class="news-detail-tag" id="news-detail-tag"></span>' +
        '<h2 id="news-detail-title"></h2><div class="news-detail-meta"><span id="news-detail-date"></span><span id="news-detail-views"></span></div></div>' +
        '<div class="news-detail-image"><img id="news-detail-img" src="" alt=""></div>' +
        '<div class="news-detail-body" id="news-detail-body"></div></div>';
    document.body.appendChild(newsDetailModal);

    var newsDetailClose = newsDetailModal.querySelector('.news-detail-close');

    var newsLinks = document.querySelectorAll('.news-link');
    newsLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            var card = this.closest('.news-card');
            var tag = card.querySelector('.news-tag').textContent;
            var tagClass = card.querySelector('.news-tag').classList.contains('company') ? 'company' :
                           card.querySelector('.news-tag').classList.contains('industry') ? 'industry' : 'notice';
            var title = card.querySelector('.news-title').textContent;
            var date = card.querySelector('.news-date').textContent;
            var views = card.querySelector('.news-views').textContent;
            var imgSrc = card.querySelector('.news-image img').src;
            var excerpt = card.querySelector('.news-excerpt').textContent;

            document.getElementById('news-detail-tag').textContent = tag;
            document.getElementById('news-detail-tag').className = 'news-detail-tag ' + tagClass;
            document.getElementById('news-detail-title').textContent = title;
            document.getElementById('news-detail-date').textContent = date;
            document.getElementById('news-detail-views').textContent = views;
            document.getElementById('news-detail-img').src = imgSrc;
            document.getElementById('news-detail-body').innerHTML = '<p>' + excerpt + '</p><p>这是新闻的详细内容。更多关于' + title + '的信息，请联系我们的客服获取完整报道。</p>';

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

    // --- Video Modal ---
    var videoModal = document.createElement('div');
    videoModal.className = 'video-modal';
    videoModal.innerHTML = '<div class="video-modal-content">' +
        '<button class="video-modal-close"><svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></button>' +
        '<video controls poster="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=video%20placeholder%20thumbnail%20blue%20gradient&image_size=landscape_16_9">' +
        '<source src="" type="video/mp4"></video></div>';
    document.body.appendChild(videoModal);

    var modalClose = videoModal.querySelector('.video-modal-close');
    var modalVideo = videoModal.querySelector('video');
    var videoCards = document.querySelectorAll('.video-news-card');

    videoCards.forEach(function(card) {
        card.addEventListener('click', function() {
            var title = this.querySelector('.video-title').textContent;
            modalVideo.src = 'https://www.w3schools.com/html/mov_bbb.mp4';
            modalVideo.title = title;
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            modalVideo.play().catch(function() {});
        });
    });

    modalClose.addEventListener('click', closeVideoModal);

    videoModal.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeVideoModal();
        }
    });

    function closeVideoModal() {
        videoModal.classList.remove('active');
        document.body.style.overflow = '';
        modalVideo.pause();
        modalVideo.currentTime = 0;
    }

    // --- News Filtering & Pagination ---
    var tabBtns = document.querySelectorAll('.news-tab-btn');
    var newsCards = document.querySelectorAll('.news-card');
    var pageBtns = document.querySelectorAll('.page-btn');
    var prevBtn = document.querySelector('.page-btn.prev');
    var nextBtn = document.querySelector('.page-btn.next');

    var currentCategory = 'all';
    var currentPage = 1;
    var itemsPerPage = 6;

    tabBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var category = this.getAttribute('data-category');

            tabBtns.forEach(function(b) { b.classList.remove('active'); });
            this.classList.add('active');

            currentCategory = category;
            currentPage = 1;
            filterAndPaginateNews();
        });
    });

    function filterAndPaginateNews() {
        var filteredCards = currentCategory === 'all'
            ? Array.from(newsCards)
            : Array.from(newsCards).filter(function(card) { return card.getAttribute('data-category') === currentCategory; });

        var totalPages = Math.ceil(filteredCards.length / itemsPerPage);

        newsCards.forEach(function(card) { card.classList.add('hidden'); });

        var startIndex = (currentPage - 1) * itemsPerPage;
        var endIndex = startIndex + itemsPerPage;

        filteredCards.slice(startIndex, endIndex).forEach(function(card, index) {
            card.classList.remove('hidden');
            card.style.animation = 'none';
            card.offsetHeight; // trigger reflow
            card.style.animation = 'fadeIn 0.4s ease ' + (index * 0.05) + 's both';
        });

        updatePagination(totalPages);
    }

    function updatePagination(totalPages) {
        var pageNumbers = document.querySelectorAll('.page-btn:not(.prev):not(.next)');
        pageNumbers.forEach(function(btn, index) {
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

    pageBtns.forEach(function(btn) {
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

    // --- Initial animation ---
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

    newsCards.forEach(function(card, index) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

        setTimeout(function() {
            observer.observe(card);
        }, index * 50);
    });

    filterAndPaginateNews();
});