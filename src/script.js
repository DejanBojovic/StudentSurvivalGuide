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

            <p>Ingredients: </p>
            
            <div class="learn-more">Learn More</div>
        </div>
    </div>
    `

}

// SECTIONS random/meat/vegeterian/fruit ----------------------------------------------------------
// random fetch for main page

// proveri kako funkcionise default argument kad se ova funckija poziva 
const fetchingMeals = (tag='') => {
    fetch(`https://api.spoonacular.com/recipes/random?number=5&tags=${tag}apiKey=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        data.recipes.map(el => {
            resultContainer.insertAdjacentHTML('afterbegin', mealCreation(el.image, el.title))
        })

        console.log(searchedMeals)

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

fetchingMeals()

// TODO - sredi da se primaju razliciti tagovi kada se zove za razlicite sekcije - meat/veg/fruit


// fetch(`https://api.spoonacular.com/recipes/random?number=5&apiKey=${apiKey}`)
// .then(response => response.json())
// .then(data => {
//     data.recipes.map(el => {
//         resultContainer.insertAdjacentHTML('afterbegin', mealCreation(el.image, el.title))
//     })

//     console.log(searchedMeals)

//     // adding a red dot so user knows what happens when he likes a meal
//     const allMeals = document.querySelectorAll('.meal')
//     allMeals.forEach(el => {
//         el.addEventListener('click', () => {
//             document.querySelector('.favorites-dot').style.display = "block"
//             setTimeout(() => {
//                 document.querySelector('.favorites-dot').style.display = "none"
//             }, 2000)
//         })
//     })
// })

document.querySelector('.random').addEventListener('click', () => {
    fetch(`https://api.spoonacular.com/recipes/random?number=10&apiKey=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        data.recipes.map(el => {
            resultContainer.insertAdjacentHTML('afterbegin', mealCreation(el.image, el.title))
        })

        console.log(searchedMeals)

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

    // resultContainer.innerHTML = ''
    // removing all previous searched meals with this so "back" button can stay on page
    const currentMeals = document.querySelectorAll('.meal')
    currentMeals.forEach(el => {
        el.remove()
    })

    if(searchInput.placeholder === 'Main ingredient') {
        fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchStr}&number=10&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            data.map(el => {
                resultContainer.insertAdjacentHTML('afterbegin', mealCreation(el.image, el.title))

            })

            // adding a red dot so user knows what happens when he likes a meal
            const allMeals = document.querySelectorAll('.meal')
            allMeals.forEach(el => {
                el.addEventListener('click', () => {
                    // document.querySelector('.favorites-dot').style.display = "block"
                    // setTimeout(() => {
                    //     document.querySelector('.favorites-dot').style.display = "none"
                    // }, 2000)
                })
            })
        })
    } else if(searchInput.placeholder === 'Dish name') {
        fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=eggplant&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
    }

})



// MENU AND PAGES( SECTIONS ) TOGGLE -----------------------------------------------------------------

// pages
const frontpage = document.querySelector("#frontpage")
const homepage = document.querySelector('#homepage')
const user = document.querySelector('#user')
const mealPlanner = document.querySelector('#meal-planner')

user.style.display='none'
mealPlanner.style.display='none'

// frontpage
const frontpageBtn = document.querySelector(".fpi-main-btn")

// homepage.style.display = 'none'
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
    homeButton.style.backgroundColor = '#fcd06a'

    favoritesButton.style.color = '#686868'
    favoritesButton.style.backgroundColor = 'transparent'

    // page toggle
    homepage.style.display = 'block'
    user.style.display = 'none'
    mealPlanner.style.display = 'none'
})

// favorties
const favoritesButton = document.querySelector('.user')

favoritesButton.addEventListener('click', () => {
    // removing the red dot
    document.querySelector('.favorites-dot').style.display = "none"

    // menu styling
    favoritesButton.style.color = '#000'
    favoritesButton.style.backgroundColor = '#fcd06a'
    // favoritesButton.style.borderRadius = '10px'

    homeButton.style.color = '#686868'
    homeButton.style.backgroundColor = 'transparent'

    // page toggle
    user.style.display = 'block'
    homepage.style.display = 'none'
    mealPlanner.style.display = 'none'
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


// back button for meals
const backButton = document.querySelector('.back')
backButton.addEventListener('click', () => {
    document.querySelector('.results').scrollLeft = 0
})


