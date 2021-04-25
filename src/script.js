// API key
const apiKey = '8728ac3aa56f4c2ea352d5fe0de10fbf'

// toggle and search section
const searchInput = document.querySelector("input[type='search']")
console.log(searchInput)
const toggle = document.querySelector('.search-toggle')
const toggleThumb = document.querySelector('.toggle-thumb')

const mealCreation = (url, title) => {
    return `
    <div class="meal">
        <div class="meal-inner">
            <img src=${url} alt="">

            <i class="favorite-meal far fa-star"></i>

            <h2>${title}</h2>
            
            <div class="learn-more">Learn More</div>
        </div>
    </div>
    `

}

// back button for meals
const backButton = document.querySelector('.back')
backButton.addEventListener('click', () => {
    document.querySelector('.results').scrollLeft = 0
})

// SEARCH OPTIONS
const searchOptionsBtn = document.querySelector('.search-settings')
searchOptionsBtn.addEventListener('click', () => {
    const searchSettingsMenu = document.querySelector('.search-settings-menu')

    if(searchSettingsMenu.style.height === '50%') {
        searchSettingsMenu.style.height = '0%'
    } else {
        searchSettingsMenu.style.height = '50%'
    }

})

const closeButton = document.querySelector('.close')
closeButton.addEventListener('click', () => {
    document.querySelector('.search-settings-menu').style.height = '0%'

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

// proveri kako funkcionise default argument kad se ova funckija poziva 
const fetchingMeals = (searchItem, type) => {

    // random
    // `https://api.spoonacular.com/recipes/random?number=5&tags=${tag}apiKey=${apiKey}`
    
    // https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchStr}&number=50&apiKey=${apiKey}
    // `https://api.spoonacular.com/recipes/complexSearch?cuisine=${searchStr}&number=50&apiKey=${apiKey}`
    // `https://api.spoonacular.com/recipes/complexSearch?diet=${searchStr}&number=50&apiKey=${apiKey}`

    // types
    // complexSearch?cuisine
    // complexSearch?diet
    // findByIngredients?ingredients
    // random

    console.log(type)

    // SREDI FETCH STriNGS TAKO DA BUDE UNIVERZALAN !!

    let fetchString = null

    // separating fetch string into part where i fetch random meals
    if(type === 'random' || type === 'meat' || type === 'dessert' || type === 'fruit') {
        fetchString = `https://api.spoonacular.com/recipes/random?tags=${searchItem}&number=50&apiKey=${apiKey}`
        console.log('prvi')
    } else {
        // and part where i search by ingredients, cuisine or diet
        fetchString = `https://api.spoonacular.com/recipes/${type}=${searchItem}&number=50&apiKey=${apiKey}`
    }

    fetch(fetchString)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if(data.results) {
            data.results.map(el => {
                resultContainer.insertAdjacentHTML('afterbegin', mealCreation(el.image, el.title))
            })
        } else if (data.recipes) {
            data.recipes.map(el => {
                resultContainer.insertAdjacentHTML('afterbegin', mealCreation(el.image, el.title))
            })
        }
         else {
            data.map(el => {
                resultContainer.insertAdjacentHTML('afterbegin', mealCreation(el.image, el.title))
            })
        }
        console.log(data)
        console.log(type)

        // adding a red dot so user knows what happens when he likes a meal
        const allMeals = document.querySelectorAll('.meal')
        allMeals.forEach(el => {
            el.addEventListener('click', () => {
                document.querySelector('.favorites-dot').style.display = "block"
                setTimeout(() => {
                    document.querySelector('.favorites-dot').style.display = "none"
                }, 2000)
            })
        })
    })
}

const removingPreviousMeals = () => {
    const currentMeals = document.querySelectorAll('.meal')
    currentMeals.forEach(el => {
        el.remove()
    })
}

// settings event listeners for meal sections = random/meat/vegetables/fruit
const randomButton = document.querySelector('.random')
const meatButton = document.querySelector('.meat')
const dessertButton = document.querySelector('.dessert')
const fruitButton = document.querySelector('.fruit')

randomButton.addEventListener('click', () => {
    // displaying meals
    removingPreviousMeals()
    fetchingMeals('', 'random')

    // styling button
    randomButton.style.border = '1px solid #d34338'
    meatButton.style.border = '1px solid #686868'
    dessertButton.style.border = '1px solid #686868'
    fruitButton.style.border = '1px solid #686868'
})

meatButton.addEventListener('click', () => {
    // displaying meals
    removingPreviousMeals()
    fetchingMeals('meat', 'meat')

    // styling button
    meatButton.style.border = '1px solid #d34338'
    randomButton.style.border = '1px solid #686868'
    dessertButton.style.border = '1px solid #686868'
    fruitButton.style.border = '1px solid #686868'
})

dessertButton.addEventListener('click', () => {
    // displaying meals
    removingPreviousMeals()
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
    removingPreviousMeals()
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
const resultContainer = document.querySelector('.results')

// const mealIDs = []
const searchedMeals = [] 
let counter = null

searchButton.addEventListener('click', () => {
    const searchStr = searchInput.value
    console.log(searchStr)

    if(searchStr === "") {
        return
    }

    removingPreviousMeals()

    const inputPlaceholder = document.querySelector("input[type='search']").placeholder

    let type = null
    if(inputPlaceholder === 'Egg, bacon..') {
        type = 'findByIngredients?ingredients'
    } else if (inputPlaceholder === 'Italian, indian..') {
        type = 'complexSearch?cuisine'
    } else {
        type = 'complexSearch?diet'
    }


    fetchingMeals(searchStr, type)
    
    

})



// MENU AND PAGES( SECTIONS ) TOGGLE -----------------------------------------------------------------

// pages
const frontpage = document.querySelector("#frontpage")
const homepage = document.querySelector('#homepage')
const userpage = document.querySelector('#userpage')

userpage.style.display='block'

// frontpage
const frontpageBtn = document.querySelector(".fpi-main-btn")

homepage.style.display = 'none'
frontpage.style.display = 'none'

// sessionStorage.setItem('frontpage', 'false')

frontpageBtn.addEventListener('click', () => {

    // sessionStorage.setItem('frontpage', 'true')

    setTimeout(() => {
        frontpage.style.display = "none"
        homepage.style.display = ''
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
})

// MENU AND PAGES( SECTIONS ) TOGGLE --------------------------------------------------------------------------------------

// TODO - sredi da ostane crvena tackica sve dok ne postoji nijedna puna zuta zvezda kliknuta !!!
const favoriteStars = document.querySelectorAll('.favorite-meal')

favoriteStars.forEach(el => {
    el.addEventListener('click', (e) => {
        console.log(e.target.classList)
        if(e.target.classList.contains('far')) {
            e.target.classList.remove('far')
            e.target.classList.add('fas')
    
            document.querySelector('.favorites-dot').style.display = "block"
        } else {
            e.target.classList.remove('fas')
            e.target.classList.add('far')
    
            document.querySelector('.favorites-dot').style.display = "none"
        }  
    })
})
