"use strict"
// -----Гамбургер меню--------------
// ищем иконку бургера (.menu__icon)
const iconMenu = document.querySelector(".icon-menu")
// ищем меню бургера (.menu__body)
const menuBody = document.querySelector(".menu__body")
// если .icon-menu найдено, тогда:
if (iconMenu) {
  // по клику на иконку меню
  iconMenu.addEventListener("click", function (e) {
    // добавляем стиль _lock для блокирования прокрутки контента страницы при появлении меню
    document.body.classList.toggle("_lock")
    // переключаем (присваиваем или отбираем) класс _active для иконки бургера
    iconMenu.classList.toggle("_active")
    // переключаем (присваиваем или отбираем) класс _active для меню бургера
    menuBody.classList.toggle("_active")
  })
}

// -----Уменьшающийся при скролле header--------------
const headerElement = document.querySelector(".header")

const callback = function (entries, observer) {
  if (entries[0].isIntersecting) {
    headerElement.classList.remove("_scroll")
  } else {
    headerElement.classList.add("_scroll")
  }
}

const headerObserver = new IntersectionObserver(callback)
headerObserver.observe(headerElement)
