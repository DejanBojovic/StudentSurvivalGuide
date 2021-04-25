const favDiv = document.querySelector('.favorites')
const notesDiv = document.querySelector('.notes')

// bottom menu for inner sections change
const mainNavInner = document.querySelector('.main-nav-inner')
mainNavInner.addEventListener('click', () => {
    const userpageMenu = document.querySelector('.userpage-menu')

    if(userpageMenu.style.height === '40%') {
        userpageMenu.style.height = '0%'
    } else {
        userpageMenu.style.height = '40%'
    }

})

// closeButton defined in script.js
const closeUserpage = document.querySelector('.close-userpage')
closeUserpage.addEventListener('click', () => {
    document.querySelector('.userpage-menu').style.height = '0%'

})

const userpageFav = document.querySelector('.userpage-fav')
const userpageNotes = document.querySelector('.userpage-notes')
const userpageHeadline = document.querySelector('.headline')

userpageFav.addEventListener('click', () => {
    // changing style of the buttons
    userpageFav.style.backgroundColor = '#fff'
    userpageNotes.style.backgroundColor = 'transparent'

    // changing the headline
    userpageHeadline.innerHTML = 'Favorites'

    // changing the sections
    favDiv.style.display = 'block'
    notesDiv.style.display = 'none'
})

// STILIZUJ HEADLINE !!!

userpageNotes.addEventListener('click', () => {
    // changing style of the buttons
    userpageNotes.style.backgroundColor = '#fff'
    userpageFav.style.backgroundColor = 'transparent'

    // changing the headline
    userpageHeadline.innerHTML = 'Notes'

    // changing the sections
    notesDiv.style.display = 'block'
    favDiv.style.display = 'none'
})