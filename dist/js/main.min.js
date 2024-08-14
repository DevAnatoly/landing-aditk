
// mobile menu
let mobileMenuButton = document.querySelector('.mobile-menu');
let menuList = document.querySelector('.menu__list');
let isMenuOpen = false; // Переменная для отслеживания состояния меню

mobileMenuButton.addEventListener('click', (event) => {
    if(isMenuOpen){
        menuList.style.top = '-500px';
        mobileMenuButton.src = "images/menu-mobile.svg";
    } else {
        menuList.style.top = '110px';
        mobileMenuButton.src = "images/close.svg";
    }
    isMenuOpen = !isMenuOpen;
})

// error form
document.getElementById('contactForm').addEventListener('submit', function(e) {
    let valid = true;

    // Скрыть все сообщения об ошибках
    document.querySelectorAll('.error-message').forEach(function(msg) {
        msg.style.visibility = 'hidden';
    });

    // Проверка имени
    const nameInput = this.querySelector('input[placeholder="Имя"]');
    if (!nameInput.value.trim()) {
        document.getElementById('nameError').textContent = 'Вы не заполнили поле';
        document.getElementById('nameError').style.visibility = 'visible';
        nameInput.classList.add('input-error');
        valid = false;
    } else {
        nameInput.classList.remove('input-error');
    }

    // Проверка Email
    const emailInput = this.querySelector('input[type="email"]');
    if (!emailInput.value.trim()) {
        document.getElementById('emailError').textContent = 'Вы не заполнили поле';
        document.getElementById('emailError').style.visibility = 'visible';
        emailInput.classList.add('input-error');
        valid = false;
    } else {
        emailInput.classList.remove('input-error');
    }

    // Проверка телефона
    const phoneInput = this.querySelector('input[placeholder="+7 (___) ___-__-__"]');
    if (!phoneInput.value.trim()) {
        document.getElementById('phoneError').textContent = 'Вы не заполнили поле';
        document.getElementById('phoneError').style.visibility = 'visible';
        phoneInput.classList.add('input-error');
        valid = false;
    } else {
        phoneInput.classList.remove('input-error');
    }

    // Проверка описания
    const aboutInput = this.querySelector('input[placeholder="О себе"]');
    if (!aboutInput.value.trim()) {
        document.getElementById('aboutError').textContent = 'Вы не заполнили поле';
        document.getElementById('aboutError').style.visibility = 'visible';
        aboutInput.classList.add('input-error');
        valid = false;
    } else {
        aboutInput.classList.remove('input-error');
    }
    // Проверка чекбокса
    const aggrimentCheckbox = this.querySelector('#aggriment');
    if (!aggrimentCheckbox || !aggrimentCheckbox.checked) {
        document.getElementById('aggrimentError').textContent = 'Требуется ваше согласие';
        document.getElementById('aggrimentError').style.visibility = 'visible';
        valid = false;
    }

    // Если невалидно, отменить отправку формы
    if (!valid) {
        e.preventDefault();
    } else {
        // Если форма валидна, показываем модальное окно
        showModal();
        e.preventDefault(); // Предотвращает отправку формы (если нужно дальше обрабатывать данные)
    }
});

// Функция для отображения модального окна
function showModal() {
    const modal = document.querySelector('.thanks');
    modal.style.left = '50%';
    document.getElementById('contactForm').reset();
    document.body.classList.add('modal-open');
    document.querySelector('.thanks__btn').addEventListener('click', () => {
        modal.style.left = '-150%';
        document.body.classList.remove('modal-open');
    })
    setTimeout(()=>{
        modal.style.left = '-150%';
        document.body.classList.remove('modal-open');
    }, 5000) // Показываем модальное окно
}

// steps

let stepButton = document.querySelectorAll('.steps__button');
let contentItems = document.querySelectorAll('.steps__content-item');
let barItems = document.querySelectorAll('.proggres_bar-item');
let indexOFcontentItems = 0;

contentItems[indexOFcontentItems].classList.add('steps__content-item--active');
barItems[indexOFcontentItems].classList.add('proggres_bar--active');

stepButton.forEach((item)=>{
    item.addEventListener('click', showItemContent);
});
function showItemContent(){
    contentItems[indexOFcontentItems].classList.remove('steps__content-item--active');
    barItems[indexOFcontentItems].classList.remove('proggres_bar--active');

    // Увеличиваем индекс, если он меньше максимального значения, иначе сбрасываем на 0
    indexOFcontentItems = (indexOFcontentItems + 1) % contentItems.length;

    // Добавляем активный класс к новому элементу
    contentItems[indexOFcontentItems].classList.add('steps__content-item--active');
    barItems[indexOFcontentItems].classList.add('proggres_bar--active');
    if(window.innerWidth <= 768){
        updatePosition();
    }
}
function updatePosition() {
    const offset = indexOFcontentItems * 250; // Двигать элементы на 100px влево
    document.querySelector('.proggres_bar').style.transform = `translateX(-${offset}px`;
}

// slider goals
const items = document.querySelectorAll('.goals__item'); // Получаем все элементы
const prevButton = document.querySelector('.goals .button-prev'); // Кнопка "Назад"
const nextButton = document.querySelector('.goals .button-next'); // Кнопка "Вперед"
const progress = document.querySelector('.progress'); // Прогресс-бар

let currentIndex = 0; // Индекс текущего элемента
let startX = 0; // Начальная позиция касания
let endX = 0; // Конечная позиция касания

function updateSlider() {
    const itemWidth = items[currentIndex].clientWidth; // Получаем ширину текущего элемента
    const offset = -currentIndex * itemWidth; // Смещение по ширине элемента
    document.querySelector('.goals__items').style.transform = `translateX(${offset}px)`; // Используем пиксели

    // Обновление ширины прогресс-бара
    const progressWidth = ((currentIndex + 1) / items.length) * 100; // Процент активности
    progress.style.width = `${progressWidth}%`;
}

// Обработка жестов
document.querySelector('.goals__wrapper').addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX; // Запоминаем начальную позицию касания
}, { passive: true });
document.querySelector('.goals__wrapper').addEventListener('touchmove', (event) => {
    endX = event.touches[0].clientX; // Обновляем конечную позицию касания
}, { passive: true });

document.querySelector('.goals__wrapper').addEventListener('touchend', () => {
    if (startX - endX > 50) { // Если свайп влево
        currentIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0; // Перейти к следующему слайду
        updateSlider();
    } else if (endX - startX > 50) { // Если свайп вправо
        currentIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1; // Перейти к предыдущему слайду
        updateSlider();
    }
}, { passive: true });

// Обработка кнопки "Вперед"
nextButton.addEventListener('click', () => {
    if (currentIndex < items.length - 1) { // Проверяем, что не достигли конца
        currentIndex++;
    } else { // Сбрасываем счетчик
        currentIndex = 0;
    }
    updateSlider(); // Обновляем слайдер
});

// Обработка кнопки "Назад"
prevButton.addEventListener('click', () => {
    if (currentIndex > 0) { // Проверяем, что не достигли начала
        currentIndex--;
    } else { // Сбрасываем счетчик до последнего элемента
        currentIndex = items.length - 1;
    }
    updateSlider(); // Обновляем слайдер
});

// Инициализация слайдера, если необходимо
updateSlider();

// slider articles
const articlesItems = document.querySelectorAll('.articles__item'); // Получаем все элементы
const articlesPrevButton = document.querySelector('.articles .button-prev'); // Кнопка "Назад"
const articlesNextButton = document.querySelector('.articles .button-next'); // Кнопка "Вперед"
const articlesProgress = document.querySelector('.articles .progress'); // Прогресс-бар

let articlesCurrentIndex = 0; // Индекс текущего элемента
let articlesStartX = 0; // Начальная позиция касания
let articleSEndX = 0; // Конечная позиция касания

function updateSliderArticles() {
    const itemWidth = items[articlesCurrentIndex].clientWidth; // Получаем ширину текущего элемента
    const offset = -articlesCurrentIndex * itemWidth; // Смещение по ширине элемента
    document.querySelector('.articles__items').style.transform = `translateX(${offset}px)`; // Используем пиксели

    // Обновление ширины прогресс-бара
    const progressWidth = ((articlesCurrentIndex + 1) / articlesItems.length) * 100; // Процент активности
    articlesProgress.style.width = `${progressWidth}%`;
}

// Обработка жестов
document.querySelector('.articles__wrapper').addEventListener('touchstart', (event) => {
    articlesStartX = event.touches[0].clientX; // Запоминаем начальную позицию касания
}, { passive: true });
document.querySelector('.articles__wrapper').addEventListener('touchmove', (event) => {
    articlesEndX = event.touches[0].clientX; // Обновляем конечную позицию касания
}, { passive: true });

document.querySelector('.articles__wrapper').addEventListener('touchend', () => {
    if (articlesStartX - articlesEndX > 50) { // Если свайп влево
        articlesCurrentIndex = articlesCurrentIndex < articlesItems.length - 1 ? articlesCurrentIndex + 1 : 0; // Перейти к следующему слайду
        updateSliderArticles();
    } else if (articlesEndX - articlesStartX > 50) { // Если свайп вправо
        articlesCurrentIndex = articlesCurrentIndex > 0 ? articlesCurrentIndex - 1 : articlesItems.length - 1; // Перейти к предыдущему слайду
        updateSliderArticles();
    }
}, { passive: true });

// Обработка кнопки "Вперед"
articlesNextButton.addEventListener('click', () => {
    if (articlesCurrentIndex < articlesItems.length - 1) { // Проверяем, что не достигли конца
        articlesCurrentIndex++;
    } else { // Сбрасываем счетчик
        articlesCurrentIndex = 0;
    }
    updateSliderArticles(); // Обновляем слайдер
});

// Обработка кнопки "Назад"
articlesPrevButton.addEventListener('click', () => {
    if (articlesCurrentIndex > 0) { // Проверяем, что не достигли начала
        articlesCurrentIndex--;
    } else { // Сбрасываем счетчик до последнего элемента
        articlesCurrentIndex = articlesItems.length - 1;
    }
    updateSliderArticles(); // Обновляем слайдер
});

// Инициализация слайдера, если необходимо
updateSliderArticles();


let ButtonActionHeader = document.querySelector('.button');
let ButtonActionHero = document.querySelector('.button-accent');
let ButtonActionPatch = document.querySelector('.button-patch');
let contactSection = document.getElementById('contact');

if (ButtonActionHeader) {
    ButtonActionHeader.addEventListener('click', () => {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    });
}

if (ButtonActionHero) {
    ButtonActionHero.addEventListener('click', () => {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    });
}

if (ButtonActionPatch) {
    ButtonActionPatch.addEventListener('click', () => {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    });
}