"use strict"

window.addEventListener("load", () => {
  document.addEventListener("click", documentActions)
  document.body.classList.add("loaded")

  let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop
  let isScrollingDown = false

  function animateCounter(counter, duration) {
    let startTimestamp = null
    const startValue = parseFloat(counter.innerHTML) || 0
    const startPosition = 0
    const isDecimal = startValue % 1 !== 0

    function step(timestamp) {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      const value = isDecimal
        ? startPosition + startValue * progress
        : Math.round(progress * (startPosition + startValue))
      counter.innerHTML = isDecimal ? value.toFixed(1) : value.toString()
      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }

    window.requestAnimationFrame(step)
  }

  window.addEventListener("scroll", () => {
    const currentScrollTop =
      window.pageYOffset || document.documentElement.scrollTop
    isScrollingDown = currentScrollTop > lastScrollTop
    lastScrollTop = currentScrollTop
  })

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          entry.intersectionRatio >= 0.3 &&
          isScrollingDown
        ) {
          const counters = entry.target.querySelectorAll(
            "[data-digital-counter]"
          )
          counters.forEach((counter) => {
            const duration = parseInt(counter.dataset.digitalCounter) || 1000
            animateCounter(counter, duration)
          })
        }
      })
    },
    { threshold: 0.3 }
  )

  const sections = document.querySelectorAll(".digital-counters")
  sections.forEach((section) => {
    observer.observe(section)
  })
})

// -----Гамбургер меню--------------
const iconMenu = document.querySelector(".icon-menu")
const menuBody = document.querySelector(".menu__body")
if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    document.body.classList.toggle("body--lock")
    iconMenu.classList.toggle("_active")
    menuBody.classList.toggle("_active")
  })
}

// -----Уменьшающийся при скролле header--------------
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

// --------- Scroll to Function ----------
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
// --------- END OF Scroll to Function ----------

// ----- animation --------------
const items = document.querySelectorAll("[data-animated]")

const appearThreshold = 0.3

const appearOptions = {
  threshold: appearThreshold,
}

const appearCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.intersectionRatio >= appearThreshold) {
      entry.target.classList.add("active")
    } else {
      entry.target.classList.remove("active")
    }
  })
}

const appearObserver = new IntersectionObserver(appearCallback, appearOptions)

items.forEach((item) => {
  appearObserver.observe(item)
})

const animateOnScroll = () => {
  items.forEach((item) => {
    const itemTop = item.getBoundingClientRect().top
    const windowHeight = window.innerHeight

    if (itemTop - windowHeight <= 0) {
      item.classList.add("active")
    } else {
      item.classList.remove("active")
    }
  })
}

window.addEventListener("scroll", animateOnScroll)
// ----- END OF animation --------------

// ----- parallax --------------
function updateParallax(container, x, y) {
  const parallaxItems = container.querySelectorAll(".parallax-item")

  parallaxItems.forEach((item, index) => {
    let speedX, speedY

    switch (index) {
      case 0:
        speedX = 0.05
        speedY = 0.05
        break
      case 1:
        // speedX = -0.05
        // speedY = -0.05
        speedX = -0.1
        speedY = 0.1
        break
      case 2:
        speedX = 0.1
        speedY = -0.1
        break
      case 3:
        // speedX = -0.1
        // speedY = 0.1
        speedX = -0.05
        speedY = -0.05
        break
      default:
        speedX = 0
        speedY = 0
    }
    item.style.transform = `translate(${x * speedX}px, ${y * speedY}px)`
  })
}

const container1 = document.getElementById("parallax-container-1")
const container2 = document.getElementById("parallax-container-2")
const container3 = document.getElementById("parallax-container-3")

container1.addEventListener("mousemove", (e) => {
  const x = (window.innerWidth - e.pageX * 5) / 100
  const y = (window.innerHeight - e.pageY * 5) / 100
  updateParallax(container1, x, y)
})

container2.addEventListener("mousemove", (e) => {
  const x = (window.innerWidth - e.pageX * 5) / 100
  const y = (window.innerHeight - e.pageY * 5) / 100
  updateParallax(container2, x, y)
})

container3.addEventListener("mousemove", (e) => {
  const x = (window.innerWidth - e.pageX * 5) / 100
  const y = (window.innerHeight - e.pageY * 5) / 100
  updateParallax(container3, x, y)
})
// ----- END OF parallax --------------
