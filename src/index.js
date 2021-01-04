console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', function() {
    fetchDogImages()
    fetchDogBreeds()
  })

function fetchDogImages() {
    return fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(resp => resp.json())
    .then(json => json.message.forEach(image => renderDogImages(image)));
}

function renderDogImages(dogImage) {
    const container = document.querySelector('#dog-image-container')
    const image = document.createElement('img')
    image.src = dogImage
    container.appendChild(image)
}

function fetchDogBreeds() {
    return fetch('https://dog.ceo/api/breeds/list/all')
    .then(respone => response.json())
    .then(json => {
        breeds = Object.keys(json.message)
        renderDogBreeds(breeds)
        selectDogBreeds()
    });
}

function renderDogBreeds(breeds) {
    const dogBreeds = document.querySelector('#dog-breeds')
    
    breeds.forEach(breed => {
        const li = document.createElement("li")
        li.innerText = breed
        li.addEventListener('click', addColor)
        dogBreeds.appendChild(li)
    })
}

function addColor(event) {
    event.currentTarget.style.color = "red"
}

function selectDogBreeds() {
    let breedDropdown = document.querySelector("#breed-dropdown")
    breedDropdown.addEventListener('change', function(event) {
        filterDogBreeds(event.target.value)
    })
}

function filterDogBreeds(letter) {
    updateDogBreedList(breeds.filter(breed => breed.startsWith(letter)))
}

function updateDogBreedList(breeds) {
    let dogBreeds = document.querySelector("#dog-breeds")
    removeChildren(dogBreeds)
    breeds.forEach(breed => addDogBreed(breed))
}

function removeChildren(children) {
    let child = children.firstChild
    while(child) {
        children.removeChild(child)
        child = children.firstChild
    }
}

function addDogBreed(breed) {
    let li = document.createElement("li")
    let dogBreeds = document.querySelector("#dog-breeds")
    li.innerText = breed
    li.addEventListener('click', addColor)
    dogBreeds.appendChild(li)
}