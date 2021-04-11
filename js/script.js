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
            <img src="${url}" alt="">
            <h2>${title}</h2>
        </div>
    `
}

// api call for meal
const searchButton = document.querySelector('.search-btn')
const resultContainer = document.querySelector('.results')

searchButton.addEventListener('click', () => {
    const searchStr = searchInput.value
    console.log(searchStr)

    const apiKey = '8728ac3aa56f4c2ea352d5fe0de10fbf'

    if(searchInput.placeholder === 'Main ingredient') {
        fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchStr}&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            // for(let i = 0; i < data.length; i++) {
            //     let mrs = mealCreation(data[i].image, data[i].title)
            //     resultContainer.insertAdjacentHTML('afterbegin', mrs)
            // }
            data.map(el => {
                console.log(el.title)
                console.log(el)
                resultContainer.insertAdjacentHTML('afterbegin', mealCreation(el.image, el.title))
            });

            // adding a red dot so user knows what happens when he likes a meal
            const allMeals = document.querySelectorAll('.meal')
            allMeals.forEach(el => {
                el.addEventListener('click', () => {
                    document.querySelector('.favorites-dot').style.display = "block"
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


// menu
const homeButton = document.querySelector('.home')
const favoritesButton = document.querySelector('.favorites')

homeButton.addEventListener('click', () => {
    homeButton.style.color = '#000'
    homeButton.style.backgroundColor = '#fcd06a'

    favoritesButton.style.color = '#686868'
    favoritesButton.style.backgroundColor = 'transparent'
})

favoritesButton.addEventListener('click', () => {
    // removing the red dot
    document.querySelector('.favorites-dot').style.display = "none"

    favoritesButton.style.color = '#000'
    favoritesButton.style.backgroundColor = '#fcd06a'
    favoritesButton.style.borderRadius = '10px'

    homeButton.style.color = '#686868'
    homeButton.style.backgroundColor = 'transparent'
})