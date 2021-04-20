// toggle and search section
const searchInput = document.querySelector("input[type='search']")
console.log(searchInput)
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

const mealCreation = (url, title) => {
    return `
    <div class="meal">
        <div class="meal-inner">
            <img src="${url}" alt="">
            <h4>${title}</h4>
            <p>Ingredients: </p>
            <div class="learn-more">Learn More</div>
        </div>
    </div>
    `

}

// API key
const apiKey = '8728ac3aa56f4c2ea352d5fe0de10fbf'


// random fetch for main page
fetch(`https://api.spoonacular.com/recipes/random?number=5&apiKey=${apiKey}`)
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
            // document.querySelector('.favorites-dot').style.display = "block"
            // setTimeout(() => {
            //     document.querySelector('.favorites-dot').style.display = "none"
            // }, 2000)
        })
    })
})

// api call for meal
const searchButton = document.querySelector('.search-btn')
const resultContainer = document.querySelector('.results')

// const mealIDs = []
const searchedMeals = [] 
let counter = null

searchButton.addEventListener('click', () => {
    const searchStr = searchInput.value
    console.log(searchStr)

    resultContainer.innerHTML = ''

    if(searchInput.placeholder === 'Main ingredient') {
        fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchStr}&number=10&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            data.map(el => {
                //searchedMeals.push(el)
                // dodaje sve id-jeve koji su na stranici da bi se posle izvrsila pretraga koja ne dopusta fetchovanje dupllikata
                // mealIDs.push(el.id)

                // console.log(el.title)
                // console.log(el)

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
const favorites = document.querySelector('#favorites')
const mealPlanner = document.querySelector('#meal-planner')

favorites.style.display='none'
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

    mealplannerButton.style.color = '#686868'
    mealplannerButton.style.backgroundColor = 'transparent'

    // page toggle
    homepage.style.display = 'block'
    favorites.style.display = ''
    mealPlanner.style.display = ''
})

// favorties
const favoritesButton = document.querySelector('.favorites')

favoritesButton.addEventListener('click', () => {
    // removing the red dot
    document.querySelector('.favorites-dot').style.display = "none"

    // menu styling
    favoritesButton.style.color = '#000'
    favoritesButton.style.backgroundColor = '#fcd06a'
    // favoritesButton.style.borderRadius = '10px'

    homeButton.style.color = '#686868'
    homeButton.style.backgroundColor = 'transparent'

    mealplannerButton.style.color = '#686868'
    mealplannerButton.style.backgroundColor = 'transparent'

    // page toggle
    favorites.style.display = 'block'
    homepage.style.display = ''
    mealPlanner.style.display = ''
})

// meal planner
const mealplannerButton = document.querySelector('.meal-planner')

mealplannerButton.addEventListener('click', () => {
    // menu styling
    mealplannerButton.style.color = '#000'
    mealplannerButton.style.backgroundColor = '#fcd06a'

    favoritesButton.style.color = '#686868'
    favoritesButton.style.backgroundColor = 'transparent'

    homeButton.style.color = '#686868'
    homeButton.style.backgroundColor = 'transparent'

    // page toggle
    mealPlanner.style.display = 'block'
    favorites.style.display = ''
    homepage.style.display = ''
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

// more button for another api call
// TODO - FIGURE OUT IF YOU WANT USER TO SLECT HOW MANY ITEMS TO SHOW BEFORE HE COMMITS THE SEARCH OR TO LET HIM VIEW 5 AT A TIME WITH MORE BUTTON !!!
const moreButton = document.querySelector('.more')
moreButton.addEventListener('click', () => {
    const searchStr = searchInput.value

    fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchStr}&number=5&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            // for(let i = 0; i < data.length; i++) {
            //     let mrs = mealCreation(data[i].image, data[i].title)
            //     resultContainer.insertAdjacentHTML('afterbegin', mrs)
            // }

            console.log('jaja')

            data.map(el => {
                // if(!mealIDs.includes(el.id)) {
                //     resultContainer.insertAdjacentHTML('afterend', mealCreation(el.image, el.title))

                //     console.log('dodat je neki koji nije duplikat')
                // }

                // resultContainer.insertAdjacentHTML('afterbegin', mealCreation(el.image, el.title))

                // for(let i = 0; i < 5; i++) {
                //     resultContainer.insertAdjacentHTML('afterbegin', mealCreation(searchedMeals[i].image, searchedMeals[i].title))
    
                //     counter = i
                // }

            });

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
})