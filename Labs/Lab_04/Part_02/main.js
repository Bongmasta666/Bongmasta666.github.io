const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

let images = [
    "./images/pic1.jpg",
    "./images/pic2.jpg",
    "./images/pic3.jpg",
    "./images/pic4.jpg",
    "./images/pic5.jpg"
]

let imageAlt = [
    "Image1",
    "Image2",
    "Image3",
    "Image4",
    "Image5"
]

btn.addEventListener('click', () => darken(btn))

for (let i = 0; i < 5; i++){
    const img = document.createElement("img")
    img.setAttribute('id', images[i])
    img.setAttribute('src', images[i]);
    img.setAttribute('alt', imageAlt[i]);
    img.addEventListener("click", () => foo(img.id))
    thumbBar.appendChild(img)
}

function foo(e){ displayedImage.setAttribute('src', e) }

function darken(button){
    className = button.getAttribute('class')
    if (className == "dark") {
        button.setAttribute('class', 'light')
        button.textContent = "Lighten"
        overlay.style.background =  "rgb(0 0 0 / 50%)";
    } else {
        button.setAttribute('class', 'dark')
        button.textContent = "Darken"
        overlay.style.background =  "rgb(0 0 0 / 0%)";
    }
}
