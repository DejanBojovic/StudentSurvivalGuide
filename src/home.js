// import fetchingFavorites from "./func"
import fetchingMeals, { addingFavorites, removingPreviousMeals, fetchingFavorites, searchParameterButtonColor, randomFetchButtonColor } from './func.js'

// initializing the localStorage - storing favorite meals and user notes
if(localStorage.getItem('favorites') === null) {
    // creating array to store favorite meals
    localStorage.setItem('favorites', JSON.stringify([]))

    // creating array to store user notes
    localStorage.setItem('notes', JSON.stringify([]))
}


// toggle and search section
const searchInput = document.querySelector("input[type='search']")

// back button for meals
const backButton = document.querySelector('.back')
backButton.addEventListener('click', () => {
    document.querySelector('.results').scrollLeft = 0
})

// SEARCH OPTIONS
const searchOptionsBtn = document.querySelector('.search-settings')
const closeButton = document.querySelector('.close')

searchOptionsBtn.addEventListener('click', () => {
    const searchSettingsMenu = document.querySelector('.search-settings-menu')

    if(closeButton.classList.contains('fa-angle-down')) {
        if(searchSettingsMenu.style.height === '60%') {
            searchSettingsMenu.style.height = '0%'
        } else {
            searchSettingsMenu.style.height = '60%'
        }
    } else {       
        if(searchSettingsMenu.style.width === '40%') {
            searchSettingsMenu.style.width = '0%'
        } else {
            searchSettingsMenu.style.width = '40%'
            searchSettingsMenu.style.height = '100%'
            searchSettingsMenu.style.left = '0'
        }
    }

})

if(screen.width >= 980) {
    closeButton.classList.remove('fa-angle-down')
    closeButton.classList.add('fa-angle-left')    
} else {
    closeButton.classList.remove('fa-angle-left')
    closeButton.classList.add('fa-angle-down')   
}

closeButton.addEventListener('click', () => {
    if(screen.width >= 980) {
        document.querySelector('.search-settings-menu').style.width = '0%'
    } else {
        document.querySelector('.search-settings-menu').style.height = '0%'
    }

})

// THIS IS WHERE WE DETERMINE WHAT IS THE OBJECT OF SEARCH
const searchIngredients = document.querySelector('.search-ingredients')
const searchDiet = document.querySelector('.search-diet')
const searchCuisine = document.querySelector('.search-cuisine')

searchIngredients.addEventListener('click', () => {
    // color change
    searchParameterButtonColor(searchIngredients, searchDiet, searchCuisine)
    // placeholder change
    searchInput.placeholder = "Egg, bacon.."
})

searchDiet.addEventListener('click', () => {
    searchParameterButtonColor(searchDiet,searchIngredients, searchCuisine)
    // placeholder change
    searchInput.placeholder = "Vegeterian, gluten free.."
})

searchCuisine.addEventListener('click', () => { 
    searchParameterButtonColor(searchCuisine, searchDiet,searchIngredients)
    // placeholder change
    searchInput.placeholder = "Italian, indian.."
})

// SECTIONS random/meat/vegeterian/fruit ----------------------------------------------------------
// random fetch for main page


// settings event listeners for meal sections = random/meat/vegetables/fruit
const randomButton = document.querySelector('.random')
const meatButton = document.querySelector('.meat')
const dessertButton = document.querySelector('.dessert')
const fruitButton = document.querySelector('.fruit')

fetchingMeals('', 'random')
// ZA OVE STVARI MOZE JEDNA FUNKCIJA DA SE NAPRAVI !!!!
randomButton.addEventListener('click', () => {
    randomFetchButtonColor(randomButton, meatButton, dessertButton, fruitButton)
    fetchingMeals('', 'random')

})

meatButton.addEventListener('click', () => {
    randomFetchButtonColor(meatButton, randomButton, dessertButton, fruitButton)
    fetchingMeals('meat', 'meat')
})

dessertButton.addEventListener('click', () => {
    randomFetchButtonColor(dessertButton, meatButton, randomButton, fruitButton)
    fetchingMeals('dessert', 'dessert')
})

fruitButton.addEventListener('click', () => {
    randomFetchButtonColor(fruitButton, dessertButton, meatButton, randomButton)
    fetchingMeals('fruit', 'fruit')
})


// api call for meal
const searchButton = document.querySelector('.search-btn')

searchButton.addEventListener('click', () => {
    const searchStr = searchInput.value

    if(searchStr === "") {
        return
    }

    removingPreviousMeals('.meal')

    const inputPlaceholder = document.querySelector("input[type='search']").placeholder

    let type = null
    if(inputPlaceholder === 'Egg, bacon..') {
        type = 'findByIngredients?ingredients'
    } else if (inputPlaceholder === 'Italian, indian..') {
        type = 'complexSearch?cuisine'
    } else {
        type = 'complexSearch?diet'
    }

    // fetching and displaying meals on the page
    fetchingMeals(searchStr, type)
})


// MENU AND PAGES( SECTIONS ) TOGGLE -----------------------------------------------------------------
// pages
const frontpage = document.querySelector("#frontpage")
const homepage = document.querySelector('#homepage')
const userpage = document.querySelector('#userpage')

userpage.style.display='none'

// frontpage
const frontpageBtn = document.querySelector(".fpi-main-btn")

document.querySelector('#mealpage').style.display = 'none'
homepage.style.display = 'none'
frontpage.style.display = 'block'

frontpageBtn.addEventListener('click', () => {
    setTimeout(() => {
        frontpage.style.display = "none"
        homepage.style.display = ''
    }, 100)
})


// homepage
// mobile and tablet
const homeButton = document.querySelector('.home')

homeButton.addEventListener('click', () => {
    // menu styling
    homeButton.style.color = '#000'
    homeButton.style.backgroundColor = '#fdc33b'

    userButton.style.color = '#686868'
    userButton.style.backgroundColor = 'transparent'

    // page toggle
    homepage.style.display = 'block'
    userpage.style.display = 'none'
})

const homeButtonD = document.querySelector('.home-desktop')

homeButtonD.addEventListener('click', () => {
    // page toggle
    homepage.style.display = 'block'
    userpage.style.display = 'none'
})

// userpage
const userButton = document.querySelector('.user')

userButton.addEventListener('click', () => {
    // removing the red dot
    document.querySelector('.favorites-dot').style.display = "none"

    // // menu styling
    userButton.style.color = '#000'
    userButton.style.backgroundColor = '#fdc33b'

    homeButton.style.color = '#686868'
    homeButton.style.backgroundColor = 'transparent'

    // page toggle
    userpage.style.display = 'block'
    homepage.style.display = 'none'

    // getting all the things from localStorage to userpage
    fetchingFavorites()
})

const userButtonD = document.querySelector('.user-desktop')

userButtonD.addEventListener('click', () => {
    // removing the red dot
    document.querySelector('.favorites-dot').style.display = "none"

    // page toggle
    userpage.style.display = 'block'
    homepage.style.display = 'none'

    // getting all the things from localStorage to userpage
    fetchingFavorites()
})
