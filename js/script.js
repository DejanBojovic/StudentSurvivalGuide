const btn = document.querySelector(".fpi-main-btn")
const frontpage = document.querySelector("#frontpage")
const homepage = document.querySelector('#homepage')

homepage.style.display = 'none'

btn.addEventListener('click', () => {

    setTimeout(() => {
        frontpage.style.display = "none"
        homepage.style.display = ''
    }, 100)
})
