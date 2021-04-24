const favButton = document.querySelector('.favorites-btn')
const notesButton = document.querySelector('.notes-btn')

const favDiv = document.querySelector('.favorites')
const notesDiv = document.querySelector('.notes')

favButton.addEventListener('click', () => {
    // sections
    favDiv.style.display = 'flex'
    notesDiv.style.display = 'none'

    // buttons
    favButton.style.backgroundColor = '#d34338'
    favButton.style.color = '#fff'
    notesButton.style.backgroundColor = 'transparent'
    notesButton.style.color = '#686868'
})

notesButton.addEventListener('click', () => {
    // sections
    notesDiv.style.display = 'block'
    favDiv.style.display = 'none'

    // buttons
    notesButton.style.backgroundColor = '#d34338'
    notesButton.style.color = '#fff'
    favButton.style.backgroundColor = 'transparent'
    favButton.style.color = '#686868'

})