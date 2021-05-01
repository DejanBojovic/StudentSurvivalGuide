import { addingNote, deleteNoteBtn, fetchingFavorites, removingPreviousMeals } from './func.js'

const favDiv = document.querySelector('.favorites')
const notesDiv = document.querySelector('.notes')

notesDiv.style.display = 'none'

// bottom menu for inner sections change
const mainNavInner = document.querySelector('.main-nav-inner')
mainNavInner.addEventListener('click', () => {
    const userpageMenu = document.querySelector('.userpage-menu')

    if(screen.width >= 900) {
        if(userpageMenu.style.width === '40%') {
            userpageMenu.style.width = '0%'
        } else {
            userpageMenu.style.width = '40%'
            userpageMenu.style.height = '100%'
            userpageMenu.style.left = '0'
        }
    } else {
        if(userpageMenu.style.height === '40%') {
            userpageMenu.style.height = '0%'
        } else {
            userpageMenu.style.height = '40%'
        }
    }

})


const closeUserpage = document.querySelector('.close-userpage')

if (screen.width >= 900) {
    closeUserpage.classList.remove('fa-angle-down')
    closeUserpage.classList.add('fa-angle-left')
}

closeUserpage.addEventListener('click', () => {
    if (screen.width >= 900) {
        document.querySelector('.userpage-menu').style.width = '0%'
    } else {
        document.querySelector('.userpage-menu').style.height = '0%'
    }

})


const homepage = document.querySelector('#homepage')
const userpage = document.querySelector('#userpage')

const homeButtonU = document.querySelector('.home-desktop-u')
homeButtonU.addEventListener('click', () => {
    // page toggle
    homepage.style.display = 'block'
    userpage.style.display = 'none'
})

const userButtonU = document.querySelector('.user-desktop-u')

userButtonU.addEventListener('click', () => {
    // removing the red dot
    document.querySelector('.favorites-dot').style.display = "none"

    // page toggle
    userpage.style.display = 'block'
    homepage.style.display = 'none'

    // getting all the things from localStorage to userpage
    removingPreviousMeals()
    fetchingFavorites()
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
    if(screen.width >= 900) {
        favDiv.style.display = 'flex'
        notesDiv.style.display = 'none'
    } else {
        favDiv.style.display = 'block'
        notesDiv.style.display = 'none'
    }
})

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

// DISPLAYING ALL THE NOTES FROM LOCALSTORAGE --------------- 
const notesInner = document.querySelector('.notes-inner')
const notes = JSON.parse(localStorage.getItem('notes'))

if(notesInner.children.length === 0) {
    notes.forEach(el => {
        notesInner.insertAdjacentHTML('beforeend', addingNote(el.value, el.id))
        deleteNoteBtn()
    })
}

// DISPLAYING ALL THE FAVORITE MEALS FROM LOCALSTORAGE --------------- 
// back button for meals
const backButtonUserpage = document.querySelector('.userpage-back')
backButtonUserpage.addEventListener('click', () => {
    document.querySelector('.favorites').scrollLeft = 0
})

// NOTES SECTION
// note submit button
const noteSubmit = document.querySelector('.note-submit')
noteSubmit.addEventListener('click', () => {
    const noteInput = document.querySelector('.notes-input input')

    // creating the unique id for the note
    const noteID = Math.floor(Math.random() * 100000)

    // adding that note on the page
    notesInner.insertAdjacentHTML('beforeend', addingNote(noteInput.value, noteID))

    // adding the note to localStorage
    const notes = JSON.parse(localStorage.getItem('notes'))
    // adding new note to array
    notes.push({
        id: noteID,
        value: noteInput.value
    })

    // getting the array back to localStorage
    localStorage.setItem('notes', JSON.stringify(notes))

    // reseting input field to none
    noteInput.value = ''

    deleteNoteBtn()
    
})

if(window.screen.width <= 900) {
    const input = document.querySelector("input[type='text']")
    input.addEventListener('focus', () => {
        document.querySelector('.menu').style.display = 'none'
    })

    setTimeout(() => {
        input.addEventListener('focusout', () => {
            document.querySelector('.menu').style.display = 'flex'
        })
    }, 300)
}

