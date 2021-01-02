console.log('%c HI', 'color: firebrick')

const imgUrl = 'https://dog.ceo/api/breeds/image/random/4'
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

function loadImages() {
  return fetch(imgUrl)
    .then(resp => resp.json())
    .then(json => addImages(json.message))
}

function loadBreeds() {
  return fetch(breedUrl)
    .then(resp => resp.json())
    .then(json => addBreeds(json.message))
}
function addImages(images) {
  const imageContainer = document.getElementById('dog-image-container')
  images.forEach(image => {
    const img = document.createElement('img')
    img.src = image
    imageContainer.appendChild(img)
  })
}

function addBreeds(breeds) {
  const breedContainer = document.getElementById('dog-breeds')
  let breedArray = Object.keys(breeds)

  breedArray.forEach(breed => {
    const li = document.createElement('li')
    li.innerText = breed
    breedContainer.appendChild(li)
    li.addEventListener('click', function(event) {
      li.style.color = "green"
    })
  })

  const selectBreed = document.getElementById('breed-dropdown')

  selectBreed.addEventListener('change', function(event) {
    while (breedContainer.firstChild) {
      breedContainer.removeChild(breedContainer.firstChild)
    }
    breedArray.forEach(breed => {
      if (this.value === breed.charAt(0)) {
        const li = document.createElement('li')
        li.innerText = breed
        breedContainer.appendChild(li)
        li.addEventListener('click', function(event) {
          li.style.color = "green"
        })
      }
    })
  })

}

document.addEventListener('DOMContentLoaded', function() {
  loadImages()
  loadBreeds()
})
