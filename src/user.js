import { addingNote, deleteNoteBtn, fetchingFavorites } from './func.js'

const favDiv = document.querySelector('.favorites')
const notesDiv = document.querySelector('.notes')

favDiv.style.display = 'block'
notesDiv.style.display = 'none'

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

// DISPLAYING ALL THE NOTES FROM LOCALSTORAGE --------------- 
const notesInner = document.querySelector('.notes-inner')
const notes = JSON.parse(localStorage.getItem('notes'))

console.log(notesInner.children.length)

if(notesInner.children.length === 0) {
    notes.forEach(el => {
        notesInner.insertAdjacentHTML('beforeend', addingNote(el.value, el.id))
        deleteNoteBtn()
    })
}

// DISPLAYING ALL THE FAVORITE MEALS FROM LOCALSTORAGE --------------- 
fetchingFavorites()

// back button for meals
const backButtonUserpage = document.querySelector('.userpage-back')
backButtonUserpage.addEventListener('click', () => {
    document.querySelector('.favorites').scrollLeft = 0
})

// NOTES SECTION

// div that contains all the notes
// const notesInner = document.querySelector('.notes-inner')

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

