const apiKey = '8728ac3aa56f4c2ea352d5fe0de10fbf'


// USED IN SCRIPT.JS
export function removingPreviousMeals(cl) {
    const currentMeals = document.querySelectorAll(cl)
    currentMeals.forEach(el => {
        el.remove()
    })
}

// proveri kako funkcionise default argument kad se ova funckija poziva 
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

    console.log(type)

    // SREDI FETCH STriNGS TAKO DA BUDE UNIVERZALAN !!

    let fetchString = null

    // separating fetch string into part where i fetch random meals
    if(type === 'random' || type === 'meat' || type === 'dessert' || type === 'fruit') {
        fetchString = `https://api.spoonacular.com/recipes/random?tags=${searchItem}&number=1&apiKey=${apiKey}`
        console.log('prvi')
    } else {
        // and part where i search by ingredients, cuisine or diet
        fetchString = `https://api.spoonacular.com/recipes/${type}=${searchItem}&number=1&apiKey=${apiKey}`
    }

    const resultContainer = document.querySelector('.results')

    fetch(fetchString)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if(data.results) {
            data.results.map(el => {
                resultContainer.insertAdjacentHTML('afterbegin', mealCreation(el.image, el.title, el.id))
            })
        } else if (data.recipes) {
            data.recipes.map(el => {
                resultContainer.insertAdjacentHTML('afterbegin', mealCreation(el.image, el.title, el.id))
            })
        } else {
            data.map(el => {
                resultContainer.insertAdjacentHTML('afterbegin', mealCreation(el.image, el.title, el.id))
            })
        }
        console.log(data)
        console.log(type)

        // adding a red dot so user knows what happens when he likes a meal
        const allMeals = document.querySelectorAll('.meal')
        allMeals.forEach(el => {
            el.addEventListener('click', (e) => {
                // document.querySelector('.favorites-dot').style.display = "block"

                // event listener for mealpage showing - gets meal ID as an argument
                // console.log(e.target.parentNode.parentNode.parentNode)
                // console.log(e.target)
                fetchForMealpage(e.target.getAttribute('data-id'))

                // to determine which page to show after user closes mealpage
                localStorage.setItem('previousPage', 'homepage')

                const mealpage = document.querySelector('#mealpage')
                mealpage.style.display = 'block'

                setTimeout(() => {
                    document.querySelector('.favorites-dot').style.display = "none"
                }, 2000)
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

    return `
    <div class="meal-container" data-id=${m.id}>
        <img src=${m.image} alt=${m.title}>
        
        <div class="icons">
            <i class="mealpage-back fas fa-angle-left"></i>
            <div class="prep-time">
                <p>${m.readyInMinutes}</p>
                <i class="far fa-clock"></i>
            </div>
            <i class="favorite-meal far fa-heart"></i>
        </div>

        <div class="mealpage-main">
            <h3>${m.title}</h3>
            <div class="ingredients">
                <ul>
                    ${ingredients}
                </ul>
            </div>

            <p>instrukcije</p>

            <a href="https://www.youtube.com/results?search_query=${m.title}" target="_blank">
                <p>Find a video</p>
                <i class="fab fa-youtube"></i>
            </a>

        </div>
    </div>
    `
}

export function mealpageEvents() {
    console.log('back to jaja')
    const backButton = document.querySelector('.mealpage-back')

    // pages
    const mealpage = document.querySelector('#mealpage')
    const userpage = document.querySelector('#userpage')
    const homepage = document.querySelector('#homepage')

    backButton.addEventListener('click', () => {
        const previousPage = localStorage.getItem('previousPage')
        
        if(previousPage === 'homepage') {
            mealpage.style.display = 'none'
            homepage.style.display = 'block'
        } else if (previousPage === 'userpage') {
            mealpage.style.display = 'none'
            userpage.style.display = 'block'
        }

        localStorage.setItem('previousPage', '')
    })
}

// postavljeno samo radi probe - uklni posle !!!!!!
mealpageEvents()

export function fetchForMealpage(id) {
    fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        const mealContainer = document.querySelector('#mealpage')
        mealContainer.insertAdjacentHTML('beforeend', showMealpage(data))

        document.querySelector('#homepage').style.display = 'none'
        document.querySelector('#userpage').style.display = 'none'



        // console.log(id)
        // console.log(data)

        // favDiv.insertAdjacentHTML('afterbegin', mealCreation(data.image, data.title, data.id, '-f', 'fas'))

        // adding a red dot so user knows what happens when he likes a meal
        // const allMeals = document.querySelectorAll('.meal')
        // allMeals.forEach(el => {
        //     el.addEventListener('click', () => {
        //         document.querySelector('.favorites-dot').style.display = "block"
        //         setTimeout(() => {
        //             document.querySelector('.favorites-dot').style.display = "none"
        //         }, 2000)
        //     })
        // })
    })

    mealpageEvents()
    
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
    const favoriteHearts = document.querySelectorAll('.favorite-meal')
    console.log(favoriteHearts)
    favoriteHearts.forEach(el => {
        el.addEventListener('click', (e) => {
            console.log("KLIKNUTO")
            // console.log(e.target.classList)
            if(e.target.classList.contains('far')) {
                // adding full heart icon to clicked meal
                e.target.classList.remove('far')
                e.target.classList.add('fas')
                
                // adding red dot to user icon
                document.querySelector('.favorites-dot').style.display = "block"
                setTimeout(() => {
                    document.querySelector('.favorites-dot').style.display = "none"
                }, 2000)

                // adding meal id to localStorage soo it can be displayed on favorites page
                const mealID = e.target.parentNode.parentNode.parentNode.getAttribute('data-id')

                console.log(mealID)
                
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
        
                // removing red dot from user icon
                document.querySelector('.favorites-dot').style.display = "none"

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
    })
}

export function mealCreation(url, title, id, cl='', fav='far') {
    return `
    <div class="meal${cl}" data-id=${id}>
        <div class="meal-inner${cl}">
            <img src=${url}>

            <div class="inner-bottom">
                <h2>${title}</h2>
                <i class="favorite-meal ${fav} fa-heart"></i>
            </div>
            
        </div>
    </div>
    `
}

// USED IN USER.JS !!!
export function fetchingFavorites() {
    const favoriteMeals = JSON.parse(localStorage.getItem('favorites'))
    const favDiv = document.querySelector('.favorites')

    removingPreviousMeals('.meal-f')

    favoriteMeals.forEach(el => {
        fetch(`https://api.spoonacular.com/recipes/${el}/information?apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            // console.log(id)
            console.log(data)

            favDiv.insertAdjacentHTML('afterbegin', mealCreation(data.image, data.title, data.id, '-f', 'fas'))

            // adding a red dot so user knows what happens when he likes a meal
            // const allMeals = document.querySelectorAll('.meal')
            // allMeals.forEach(el => {
            //     el.addEventListener('click', () => {
            //         document.querySelector('.favorites-dot').style.display = "block"
            //         setTimeout(() => {
            //             document.querySelector('.favorites-dot').style.display = "none"
            //         }, 2000)
            //     })
            // })
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
            // console.log(noteID)

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
            // console.log(e.target.parentNode)
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