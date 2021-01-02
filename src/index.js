console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
const lists = document.getElementsByTagName('li')

document.addEventListener('DOMContentLoaded', function () {
    fetchBreeds();
    changeListColor();
    breedDropdown();
  });

function renderImg(json) {
    const imgs = json.message
    const imgContainer = document.getElementById("dog-image-container")
    imgs.forEach(image => {
        const img = document.createElement('img')
        img.src = image
        imgContainer.appendChild(img) 
    });
}

function fetchImages() {
    fetch(imgUrl)
    .then(resp => resp.json())
    .then(json => renderImg(json))
}

function renderBreeds(json) {
    const breeds = json.message
    const ul = document.getElementById('dog-breeds')
    const breedArray = []
    for (var key in breeds) {
        breedArray.push(key)
    }
    ul.innerHTML = ""
    const breedSelector = document.getElementById("breed-dropdown")
    const selectArray = breedArray.filter(breed => breed.startsWith(breedSelector.value))
    selectArray.forEach(function(breed){
        const li = document.createElement('li')
        li.innerHTML = breed
        ul.appendChild(li)
    })
}

function fetchBreeds() {
    fetch(breedUrl)
    .then(resp => resp.json())
    .then(json => renderBreeds(json))
}

function changeListColor() {
    const listArray = Array.from(lists)
    listArray.forEach(function(list) {
        list.addEventListener("click", function (e) {
            if (list.style.color === "") {
                list.style.color = "#ff0000"
            } else {
                list.style.color = ""
            }
        })
    })
}

function breedDropdown() {
    const breedSelector = document.getElementById("breed-dropdown")
    breedSelector.addEventListener("change", function() {
        fetchBreeds()
    })
}





