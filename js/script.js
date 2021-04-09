const btn = document.querySelector(".fpi-main-btn")
const frontpage = document.querySelector("#frontpage")
const homepage = document.querySelector('#homepage')

homepage.style.display = 'none'

btn.addEventListener('click', () => {

    // setTimeout(() => {
    //     btn.style.backgroundColor = 'pink'
    //     btn.style.color = 'purple'
    // }, 2000)

    setTimeout(() => {
        frontpage.style.display = "none"
        homepage.style.display = ''
    }, 100)
})
