const apiKey = '8a468c52f80948a697ca86daf1502bc3'

// USED IN SCRIPT.JS
export function removingPreviousMeals(cl) {
    const currentMeals = document.querySelectorAll(cl)
    currentMeals.forEach(el => {
        el.remove()
    })
}

export default function fetchingMeals(searchItem, type) {

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

    let fetchString = null

    // separating fetch string into part where i fetch random meals
    if(type === 'random' || type === 'meat' || type === 'dessert' || type === 'fruit') {
        fetchString = `https://api.spoonacular.com/recipes/random?tags=${searchItem}&number=60&apiKey=${apiKey}`
    } else {
        // and part where i search by ingredients, cuisine or diet
        fetchString = `https://api.spoonacular.com/recipes/${type}=${searchItem}&number=60&apiKey=${apiKey}`
    }

    const resultContainer = document.querySelector('.results')

    fetch(fetchString)
    .then(response => response.json())
    .then(data => {
        if(data.length === 0)  {
            noResultFound()
        }

        if(data.results) {
            if(data.results.length === 0)  {
                noResultFound()
            }

            data.results.map(el => {
                resultContainer.insertAdjacentHTML('afterbegin', mealCreation(el.image, el.title, el.id))
            })
        } else if (data.recipes) {
            if(data.recipes.length === 0)  {
                noResultFound()
            }

            data.recipes.map(el => {
                resultContainer.insertAdjacentHTML('afterbegin', mealCreation(el.image, el.title, el.id))
            })
        } else {
            data.map(el => {
                resultContainer.insertAdjacentHTML('afterbegin', mealCreation(el.image, el.title, el.id))
            })
        }

        const allMeals = document.querySelectorAll('.meal-info')
        allMeals.forEach(el => {
            el.addEventListener('click', (e) => {
                fetchForMealpage(e.target.parentNode.parentNode.parentNode.getAttribute('data-id'))

                // to determine which page to show after user closes mealpage
                localStorage.setItem('previousPage', 'homepage')

                const menu = document.querySelector('.menu')
                menu.style.display = 'none'

                document.querySelector('#homepage').style.display = 'none'
                document.querySelector('#userpage').style.display = 'none'

                const mealpage = document.querySelector('#mealpage')
                mealpage.style.display = 'block'
            })
        })
    })
}

export function showMealpage(m) {

    let ingredients = ''
    m.extendedIngredients.forEach(el => {
        ingredients += 
        `<li>
            <i class="fas fa-plus"></i>
            <p>${el.name}</p>
        </li>`
    })

    let imgFixed = `<img src=${m.image} alt=${m.title}>`
    if(m.image === undefined) {
        imgFixed = `<img class="height-fix" src="../images/frontpage/meal.jpg" alt=${m.title}>`
    }

    let instructionSafe = m.instructions
    if(m.instructions === null || m.instructions === '') {
        instructionSafe = 'No instructions Chef. You can do it!'
    }

    const favorites = JSON.parse(localStorage.getItem('favorites'))
    const index = favorites.includes(m.id.toString())

    let favoritesHeart = '<i class="favorite-meal far fa-heart"></i>'
    if(index) {
        favoritesHeart = '<i class="favorite-meal fas fa-heart"></i>'
    }

    return `
    <div class="meal-container" data-id=${m.id}>
        <div class="mealpage-header">
            ${imgFixed}
            
            <div class="icons">
                <i class="mealpage-back fas fa-angle-left"></i>
                <div class="prep-time">
                    <p>${m.readyInMinutes}</p>
                    <i class="far fa-clock"></i>
                </div>
                ${favoritesHeart}
            </div>
        </div>

        <div class="mealpage-main">
            <h3>${m.title}</h3>
            <div class="ingredients">
                <ul>
                    ${ingredients}
                </ul>
            </div>

            <div class="instructions">${instructionSafe}</div>

            <a href="https://www.youtube.com/results?search_query=${m.title}" target="_blank">
                <p>Find a video</p>
                <i class="fab fa-youtube"></i>
            </a>

        </div>
    </div>
    `

    
}

export function mealpageEvents() {
    const backButton = document.querySelector('.mealpage-back')

    // pages
    const mealpage = document.querySelector('#mealpage')
    const userpage = document.querySelector('#userpage')
    const homepage = document.querySelector('#homepage')

    backButton.addEventListener('click', () => {
        const previousPage = localStorage.getItem('previousPage')
        mealpage.innerHTML = ''
        if(previousPage === 'homepage') {
            mealpage.style.display = 'none'
            homepage.style.display = 'block'

            const menu = document.querySelector('.menu')
            menu.style.display = 'flex'
        } else if (previousPage === 'userpage') {
            // fetchuje se opet za slucaj da je user izbrisao meal iz favorties
            fetchingFavorites()
            mealpage.style.display = 'none'
            userpage.style.display = 'block'

            const menu = document.querySelector('.menu')
            menu.style.display = 'flex'
        }

        localStorage.setItem('previousPage', '')
    })
}

export function fetchForMealpage(id) {
    fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        const mealContainer = document.querySelector('#mealpage')
        mealContainer.insertAdjacentHTML('beforeend', showMealpage(data))

        mealpageEvents()
        addingFavorites()

    })
    
}

const allMealHearts = document.querySelectorAll('.favorite-meal')
allMealHearts.forEach(el => {
    el.addEventListener('click', () => {
        const redDots = document.querySelectorAll('.favorites-dot');

        redDots.forEach(el => {
            el.style.display = "block"
            setTimeout(() => {
                el.style.display = "none"
            }, 2000)
        })
    })
})


export function addingFavorites() {
    const favoriteHeart = document.querySelector('.favorite-meal')
    favoriteHeart.addEventListener('click', (e) => {
        if(e.target.classList.contains('far')) {
            // adding full heart icon to clicked meal
            e.target.classList.remove('far')
            e.target.classList.add('fas')

            const mealID = e.target.parentNode.parentNode.parentNode.getAttribute('data-id')

            // getting favorites array from localStorage and adding mealID to it
            const favoriteMeals = JSON.parse(localStorage.getItem('favorites'))

            // check if that ID is already in the array
            const index = favoriteMeals.indexOf(mealID)
            if (index === -1) {
                // if it isn't then add it 
                favoriteMeals.push(mealID)
            }
            
            // setting updated array back to localStorage
            localStorage.setItem('favorites', JSON.stringify(favoriteMeals))


        } else {
            // removing full heart icon to already favorite item
            e.target.classList.remove('fas')
            e.target.classList.add('far')

            // getting mealID for removing
            const mealID = e.target.parentNode.parentNode.parentNode.getAttribute('data-id')

            // removing meal from localStorage and favorites page
            const favoriteMeals = JSON.parse(localStorage.getItem('favorites'))
            const index = favoriteMeals.indexOf(mealID)
            if (index !== -1) {
                favoriteMeals.splice(index, 1)
            }

            localStorage.setItem('favorites', JSON.stringify(favoriteMeals))
        }
    })
}

export function mealCreation(url, title, id, cl='') {
    let urlSafe = url

    if(urlSafe === undefined) {
        urlSafe = 'images/frontpage/meal.jpg'
    }

    return `
    <div class="meal${cl}" data-id=${id}>
        <div class="meal-inner${cl}">
            <img src=${urlSafe}>

            <div class="inner-bottom">
                <p>${title}</p>
                <i class="meal-info${cl} fas fa-info-circle"></i>
            </div>
            
        </div>
    </div>
    `
}

export function noResultFound() {
    const msgDiv = document.querySelector('.no-result-found')

    msgDiv.style.display = 'flex'

    setTimeout(() => {
        msgDiv.style.display = 'none'
    }, 4000)
}

export function fetchingFavorites() {
    const favoriteMeals = JSON.parse(localStorage.getItem('favorites'))
    const favDiv = document.querySelector('.favorites')

    removingPreviousMeals('.meal-f')

    favoriteMeals.forEach(el => {
        fetch(`https://api.spoonacular.com/recipes/${el}/information?apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            favDiv.insertAdjacentHTML('afterbegin', mealCreation(data.image, data.title, data.id, '-f'))

            const allMeals = document.querySelectorAll('.meal-info-f')

            allMeals.forEach(el => {
                el.addEventListener('click', (e) => {
                    fetchForMealpage(e.target.parentNode.parentNode.parentNode.getAttribute('data-id'))

                    // to determine which page to show after user closes mealpage
                    localStorage.setItem('previousPage', 'userpage')

                    document.querySelector('#homepage').style.display = 'none'
                    document.querySelector('#userpage').style.display = 'none'

                    const mealpage = document.querySelector('#mealpage')
                    mealpage.style.display = 'block'

                })
            })

        })

    })    
    
}

export function addingNote(text, id) {
    return `
        <div data-id=${id} class="note">
            <p>${text}</p>
            <i class="note-delete fas fa-times"></i>
        </div>
    `
}

export function deleteNoteBtn() {
    // note delete button
    const noteDeleteButtons = document.querySelectorAll('.note-delete')
    noteDeleteButtons.forEach(el => {
        el.addEventListener('click', (e) => {
            // removing note from the localStorage
            const notes = JSON.parse(localStorage.getItem('notes'))

            // getting the id of the element
            const noteID = parseInt(e.target.parentNode.getAttribute('data-id'))

            // removing note from localStorage
            for(let i = 0; i < notes.length; i++) {
                if (notes[i].id === noteID) {
                    notes.splice(i, 1)
                    break
                }
            }

            // updating the localStorage array
            localStorage.setItem('notes', JSON.stringify(notes))

            // removing note from the page
            e.target.parentNode.remove()

        })
    })
}

export function searchParameterButtonColor(searched, notF, notS) {
    searched.style.backgroundColor = "#fff"
    notF.style.backgroundColor = "transparent"
    notS.style.backgroundColor = "transparent"
}

export function randomFetchButtonColor(searched, notF, notS, notT) {
    removingPreviousMeals('.meal')

    searched.style.border = '1px solid #d34338'
    notF.style.border = '1px solid #686868'
    notS.style.border = '1px solid #686868'
    notT.style.border = '1px solid #686868'
}

export function search() {
    const searchInput = document.querySelector("input[type='search']")
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
}