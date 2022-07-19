var swiper = new Swiper(".main-screen__slider", {
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

// Запуск и пауза видео
$('.video').each(function () {
    $(this).click(function () {
        $(this).toggleClass('played');
        if ($(this).hasClass('played')) {
            $(this).trigger('play');
            $(this).prev('.preview').remove()
            $(this).next('.button-play').addClass('hidden');
        } else {
            $(this).trigger('pause');
            $(this).next('.button-play').removeClass('hidden');
        }
    })
})

// Костыли. Перебрасываем элементы в мобильные блоки и убираем лишние классы при ресайзе окна

function mobileElements() {
    if (window.innerWidth <= 767) {
        $('.header__social-list').appendTo('.mobile__contacts-container');
        $('.header__tel').appendTo('.mobile__contacts-container');
    } else {
        $('.header__social-list').appendTo('.header__left-section');
        $('.header__tel').appendTo('.header__mobile-box');
        $('.header').removeClass('active');
        $('.header__logo').removeClass('hidden');
        $('body').removeClass('fixed');
        $('.navigation__container').removeClass('active');
        $('.burger').removeClass('active');
        $('.header__search-icon').removeClass('visible');
    }
    if (window.innerWidth <= 600) {
        $('.footer__menu-list').css('display', 'none')
        $('.footer__menu-head').removeClass('active')
    } else {
        $('.footer__menu-list').css('display', 'block')
    }
}
window.addEventListener('resize', function () {
    mobileElements();
})
mobileElements();

// Аккордеон в подвале
$('.footer__menu-head').click(function () {
    $(this).toggleClass('active');
    if ($(this).hasClass('active')) {
        $(this).next('.footer__menu-list').slideDown();
    } else {
        $(this).next('.footer__menu-list').slideUp();
    }
})

// Меню

$('.burger').click(function (event) {
    $('.navigation__container').toggleClass('active');
    $('.header').toggleClass('active');
    $('.header__search-icon').toggleClass('visible')
    $('.header__logo').toggleClass('hidden')
    $(this).toggleClass('active');
    // Запрет скролла страницы 
    $('body').toggleClass('fixed')
})
// Привязываем шапку
$(window).on("scroll", function () {
    if ($(window).scrollTop() > 1) {
        $('.header').addClass('fixed');
    } else {
        $('.header').removeClass('fixed');
    }
})
// Маска на инпут телефона
window.addEventListener("DOMContentLoaded", function () {
    [].forEach.call(document.querySelectorAll('input[type="tel"]'), function (input) {
        var keyCode;
        function mask(event) {
            event.keyCode && (keyCode = event.keyCode);
            var pos = this.selectionStart;
            if (pos < 3) event.preventDefault();
            var matrix = "+7 (___) ___-__-__",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, ""),
                new_value = matrix.replace(/[_\d]/g, function (a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a
                });
            i = new_value.indexOf("_");
            if (i != -1) {
                i < 5 && (i = 3);
                new_value = new_value.slice(0, i)
            }
            var reg = matrix.substr(0, this.value.length).replace(/_+/g,
                function (a) {
                    return "\\d{1," + a.length + "}"
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
            if (event.type == "blur" && this.value.length < 5) this.value = ""
        }
        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
        input.addEventListener("keydown", mask, false)
    });
});