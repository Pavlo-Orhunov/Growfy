"use strict"

window.addEventListener("load", windowLoad)

function windowLoad() {
  document.addEventListener("click", documentActions)
}

// -----Гамбургер меню--------------
// ищем иконку бургера (.menu__icon)
const iconMenu = document.querySelector(".icon-menu")
// ищем меню бургера (.menu__body)
const menuBody = document.querySelector(".menu__body")
// если .icon-menu найдено, тогда:
if (iconMenu) {
  // по клику на иконку меню
  iconMenu.addEventListener("click", function (e) {
    // добавляем стиль body--lock для блокирования прокрутки контента страницы при появлении меню
    document.body.classList.toggle("body--lock")
    // переключаем (присваиваем или отбираем) класс _active для иконки бургера
    iconMenu.classList.toggle("_active")
    // переключаем (присваиваем или отбираем) класс _active для меню бургера
    menuBody.classList.toggle("_active")
  })
}

// -----Уменьшающийся при скролле header--------------
// Get the header element
const headerElement = document.querySelector(".header")

// Define the callback function for the IntersectionObserver
const callback = function (entries, observer) {
  if (entries[0].isIntersecting) {
    headerElement.classList.remove("header--scrolled")
  } else {
    headerElement.classList.add("header--scrolled")
  }
}

// Create an IntersectionObserver instance with the callback function
const headerObserver = new IntersectionObserver(callback)

// Add error handling in case the header element is not found
if (headerElement) {
  // Observe the header element for changes
  headerObserver.observe(headerElement)
} else {
  console.error("Header element not found.")
}

function documentActions(e) {
  const targetElement = e.target
  // scroll
  if (targetElement.hasAttribute("data-goto")) {
    const gotoElement = document.querySelector(`${targetElement.dataset.goto}`)
    const headerHeight = document.querySelector(`.header`).offsetHeight

    // прячем меню после нажатия на ссылку
    if (iconMenu.classList.contains("_active")) {
      document.body.classList.remove("body--lock")
      iconMenu.classList.remove("_active")
      menuBody.classList.remove("_active")
    }

    if (gotoElement) {
      window.scrollTo({
        top: gotoElement.offsetTop - headerHeight,
        behavior: "smooth",
      })
    }

    e.preventDefault()
  }
}
