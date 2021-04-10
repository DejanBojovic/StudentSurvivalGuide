const btn = document.querySelector(".fpi-main-btn")
const frontpage = document.querySelector("#frontpage")
const homepage = document.querySelector('#homepage')

// homepage.style.display = 'none'
frontpage.style.display = 'none'

sessionStorage.setItem('frontpage', 'false')

// btn.addEventListener('click', () => {

//     sessionStorage.setItem('frontpage', 'true')

//     setTimeout(() => {
//         frontpage.style.display = "none"
//         homepage.style.display = ''
//     }, 100)

//     console.log(sessionStorage.getItem('frontpage'))
// })

// toggle and search section
const searchInput = document.querySelector("input[type='search']")
console.log(searchInput)
const searchButton = document.querySelector('.search-btn')
const toggle = document.querySelector('.search-toggle')
const toggleThumb = document.querySelector('.toggle-thumb')

toggle.addEventListener('click', () => {
    if(toggleThumb.style.left === "15px") {
        toggleThumb.style.left = "1px"

        setTimeout(() => {
            searchInput.placeholder = 'Dish name'
        }, 200)

    } else {
        toggleThumb.style.left = "15px"

        setTimeout(() => {
            searchInput.placeholder = 'Main ingredient'
        }, 200)
    }
})


// menu
const homeButton = document.querySelector('.home')
const favoritesButton = document.querySelector('.favorites')

homeButton.addEventListener('click', () => {
    homeButton.style.color = '#212121'
    favoritesButton.style.color = '#fff'
})

favoritesButton.addEventListener('click', () => {
    homeButton.style.color = '#fff'
    favoritesButton.style.color = '#212121'
})