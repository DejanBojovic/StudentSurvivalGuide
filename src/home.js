// import fetchingFavorites from "./func"
import fetchingMeals, { addingFavorites, removingPreviousMeals, fetchingFavorites } from './func.js'


// // API key
// const apiKey = '8728ac3aa56f4c2ea352d5fe0de10fbf'

// initializing the localStorage - storing favorite meals and user notes
if(localStorage.getItem('favorites') === null) {
    // creating array to store favorite meals
    localStorage.setItem('favorites', JSON.stringify([]))

    // creating array to store user notes
    localStorage.setItem('notes', JSON.stringify([]))
}


// toggle and search section
const searchInput = document.querySelector("input[type='search']")
console.log(searchInput)


// TODO - sredi da ostane crvena tackica sve dok ne postoji nijedna puna zuta zvezda kliknuta !!!
// or adding that meal to favorites - sending that data-id to localStorage


// back button for meals
const backButton = document.querySelector('.back')
backButton.addEventListener('click', () => {
    document.querySelector('.results').scrollLeft = 0
})

// SEARCH OPTIONS
const searchOptionsBtn = document.querySelector('.search-settings')
searchOptionsBtn.addEventListener('click', () => {
    const searchSettingsMenu = document.querySelector('.search-settings-menu')

    if(screen.width >= 1280) {
        if(searchSettingsMenu.style.width === '50%') {
            searchSettingsMenu.style.width = '0%'
        } else {
            searchSettingsMenu.style.width = '50%'
        }
    } else {
        if(searchSettingsMenu.style.height === '50%') {
            searchSettingsMenu.style.height = '0%'
        } else {
            searchSettingsMenu.style.height = '50%'
        }
    }

})

const closeButton = document.querySelector('.close')
if(screen.width >= 1280) {
    closeButton.classList.remove('fa-angle-down')
    closeButton.classList.add('fa-angle-left')    
}

closeButton.addEventListener('click', () => {
    console.log(closeButton.classList)
    if(screen.width >= 1280) {
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
    // button styles
    searchIngredients.style.backgroundColor = "#fff"
    searchDiet.style.backgroundColor = "transparent"
    searchCuisine.style.backgroundColor = "transparent"

    // placeholder change
    searchInput.placeholder = "Egg, bacon.."
})

searchDiet.addEventListener('click', () => {
    // button styles
    searchDiet.style.backgroundColor = "#fff"
    searchIngredients.style.backgroundColor = "transparent"
    searchCuisine.style.backgroundColor = "transparent"

    // placeholder change
    searchInput.placeholder = "Vegeterian, gluten free.."
})

searchCuisine.addEventListener('click', () => {
    // button styles
    searchCuisine.style.backgroundColor = "#fff"
    searchDiet.style.backgroundColor = "transparent"
    searchIngredients.style.backgroundColor = "transparent"

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

// ZA OVE STVARI MOZE JEDNA FUNKCIJA DA SE NAPRAVI !!!!
randomButton.addEventListener('click', () => {
    // displaying meals
    removingPreviousMeals('.meal')
    fetchingMeals('', 'random')

    // styling button
    randomButton.style.border = '1px solid #d34338'
    meatButton.style.border = '1px solid #686868'
    dessertButton.style.border = '1px solid #686868'
    fruitButton.style.border = '1px solid #686868'
})

meatButton.addEventListener('click', () => {
    // displaying meals
    removingPreviousMeals('.meal')
    fetchingMeals('meat', 'meat')

    // styling button
    meatButton.style.border = '1px solid #d34338'
    randomButton.style.border = '1px solid #686868'
    dessertButton.style.border = '1px solid #686868'
    fruitButton.style.border = '1px solid #686868'
})

dessertButton.addEventListener('click', () => {
    // displaying meals
    removingPreviousMeals('.meal')
    fetchingMeals('dessert', 'dessert')

    // styling button
    dessertButton.style.border = '1px solid #d34338'
    randomButton.style.border = '1px solid #686868'
    meatButton.style.border = '1px solid #686868'
    fruitButton.style.border = '1px solid #686868'
})

// FRUIT PRETRAGA JE SRANJE - STAVNI DA BUDE NESTO DRUGO !!!!
// mozda da vratim vegetables !!!
fruitButton.addEventListener('click', () => {
    // displaying meals
    removingPreviousMeals('.meal')
    fetchingMeals('fruit', 'fruit')

    // styling button
    fruitButton.style.border = '1px solid #d34338'
    randomButton.style.border = '1px solid #686868'
    meatButton.style.border = '1px solid #686868'
    dessertButton.style.border = '1px solid #686868'
})

// --------------------------------------------------------------------------------------------------

// api call for meal
const searchButton = document.querySelector('.search-btn')

searchButton.addEventListener('click', () => {
    const searchStr = searchInput.value
    console.log(searchStr)

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
    
    // waiting a second for fetch to happen and then establishing favorites option for every meal
    setTimeout(addingFavorites, 2000) 
    
    // OVDE URADI ASYNC/AWAIT !!!!!!!
})

addingFavorites()



// MENU AND PAGES( SECTIONS ) TOGGLE -----------------------------------------------------------------


// pages
const frontpage = document.querySelector("#frontpage")
const homepage = document.querySelector('#homepage')
const userpage = document.querySelector('#userpage')

// removing bottom nav when frontpage is shown -- UNCOMMENT THIS LATER !!!
// const menu = document.querySelector('.menu')
// if (frontpage.style.display = 'block') {
//     menu.style.display = 'none'
// }

userpage.style.display='none'

// frontpage
const frontpageBtn = document.querySelector(".fpi-main-btn")

document.querySelector('#mealpage').style.display = 'none'
homepage.style.display = 'block'
frontpage.style.display = 'none'

// sessionStorage.setItem('frontpage', 'false')

frontpageBtn.addEventListener('click', () => {

    // sessionStorage.setItem('frontpage', 'true')

    setTimeout(() => {
        frontpage.style.display = "none"
        homepage.style.display = ''

        // displlaying menu only when homepage is shown - UNCOMMENT THIS LATER !!!
        // menu.style.display = 'flex'
    }, 100)

    // console.log(sessionStorage.getItem('frontpage'))
})


// homepage
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

// userpage
const userButton = document.querySelector('.user')

userButton.addEventListener('click', () => {
    // removing the red dot
    document.querySelector('.favorites-dot').style.display = "none"

    // menu styling
    userButton.style.color = '#000'
    userButton.style.backgroundColor = '#fdc33b'
    // favoritesButton.style.borderRadius = '10px'

    homeButton.style.color = '#686868'
    homeButton.style.backgroundColor = 'transparent'

    // page toggle
    userpage.style.display = 'block'
    homepage.style.display = 'none'

    // getting all the things from localStorage to userpage
    // UNCOMMENTUJ OVO POSLE !!!!!
    // fetchingFavorites()
    // FIX THIS SO THAT IT DOESNT DOUBLE
})

// MENU AND PAGES( SECTIONS ) TOGGLE --------------------------------------------------------------------------------------

// EVENT LISTENERS FOR MEALS - getting data-id and fetching for that specific meal
// LEARN MORE BUTTON ON EVERY MEAL
const learnMoreBtns = document.querySelectorAll('.learn-more')
console.log(learnMoreBtns)
learnMoreBtns.forEach(el => {
    el.addEventListener('click', (e) => {
        console.log(e.target.parentNode.parentNode.getAttribute('data-id'))
    })
})