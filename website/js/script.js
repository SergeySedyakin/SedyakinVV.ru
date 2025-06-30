document.addEventListener('DOMContentLoaded', function() {
    //Активация текущей страницы в навигации
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage) {
            link.classList.add('active');
        }
    });
   
    
    function setupSearch(inputId, itemsClass, textSelector) {
        const searchInput = document.getElementById(inputId);
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                const items = document.querySelectorAll(`.${itemsClass}`);
                
                items.forEach(item => {
                    const textElement = textSelector ? item.querySelector(textSelector) : item;
                    const text = textElement.textContent.toLowerCase();
                    
                    if (text.includes(searchTerm)) {
                        item.style.display = '';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        }
    }
    
    function setupSelectFilter(selectId, itemsClass, dataAttribute) {
        const select = document.getElementById(selectId);
        if (select) {
            select.addEventListener('change', function() {
                const filterValue = this.value;
                const items = document.querySelectorAll(`.${itemsClass}`);
                
                items.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute(dataAttribute) === filterValue) {
                        item.style.display = '';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        }
    }
    
    //страница песен
    if (document.querySelector('.songs-grid')) {
        setupSelectFilter('album-filter', 'song-card', 'data-album');
        setupSearch('search', 'song-card', 'h3');
        
        //показать/скрыть текст песни
        document.querySelectorAll('.lyrics-btn').forEach(button => {
            button.addEventListener('click', function() {
                const lyrics = this.nextElementSibling;
                if (lyrics.style.display === 'none' || !lyrics.style.display) {
                    lyrics.style.display = 'block';
                    this.textContent = 'Скрыть текст';
                } else {
                    lyrics.style.display = 'none';
                    this.textContent = 'Текст песни';
                }
            });
        });
    }

     // Страница стихов
    if (document.querySelector('.poems-grid')) {
        setupSelectFilter('collection-filter', 'poem-card', 'data-collection');
        
        document.querySelectorAll('.read-more').forEach(button => {
            button.addEventListener('click', function() {
                const fullPoem = this.nextElementSibling;
                if (fullPoem.style.display === 'none' || !fullPoem.style.display) {
                    fullPoem.style.display = 'block';
                    this.textContent = 'Свернуть';
                } else {
                    fullPoem.style.display = 'none';
                    this.textContent = 'Читать полностью';
                }
            });
        });
    }
        
    //Контакты
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: this.querySelector('#name').value,
                email: this.querySelector('#email').value,
                subject: this.querySelector('#subject').value,
                message: this.querySelector('#message').value
            };
            
            // Здесь можно добавить отправку формы на сервер
            console.log('Форма отправлена:', formData);
            alert('Спасибо за ваше сообщение! Я свяжусь с вами в ближайшее время.');
            this.reset();
        });
    }
    
    //покупка билетов
    document.querySelectorAll('.buy-ticket').forEach(button => {
        button.addEventListener('click', function() {
            const eventTitle = this.closest('.event-info').querySelector('h3').textContent;
            alert(`Вы выбрали мероприятие: ${eventTitle}\nПеренаправляем на страницу покупки билетов...`);
        });
    });
    
    //напоминание о событии
    document.querySelectorAll('.reminder').forEach(button => {
        button.addEventListener('click', function() {
            const eventTitle = this.closest('.event-info').querySelector('h3').textContent;
            alert(`Напоминание о мероприятии "${eventTitle}" установлено!`);
        });
    });
});