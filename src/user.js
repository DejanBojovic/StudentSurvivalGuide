const favDiv = document.querySelector('.favorites')
const notesDiv = document.querySelector('.notes')

favDiv.style.display = 'none'
notesDiv.style.display = 'block'

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


const addingNote = (text, id) => {
    return `
        <div data-id=${id} class="note">
            <p>${text}</p>
            <i class="note-delete fas fa-times"></i>
        </div>
    `
}
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

    // displaying all notes from the localStorage
    const notesInner = document.querySelector('.notes-inner')
    const notes = JSON.parse(localStorage.getItem('notes'))

    console.log(notesInner.children.length)

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // delete button wont work whne its displayed from localStorage
    // creatae a fucntion for delete and call it here and in the process of note creation
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    if(notesInner.children.length === 0) {
        notes.forEach(el => {
            notesInner.insertAdjacentHTML('beforeend', addingNote(el.value, el.id))
        })
    }
})

// back button for meals
const backButtonUserpage = document.querySelector('.userpage-back')
backButtonUserpage.addEventListener('click', () => {
    document.querySelector('.favorites').scrollLeft = 0
})

// NOTES SECTION

// div that contains all the notes
const notesInner = document.querySelector('.notes-inner')

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
})

