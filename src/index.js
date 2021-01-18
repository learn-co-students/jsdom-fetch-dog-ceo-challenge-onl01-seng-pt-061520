document.addEventListener('DOMContentLoaded', ()=>{
let allBreeds = []
console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = "https://dog.ceo/api/breeds/list/all"

const dogBreedUl = document.getElementById("dog-breeds")
const $div = document.getElementById("dog-image-container")
const breedDropdown = document.getElementById("breed-dropdown")

fetch (imgUrl)
 .then(response => response.json())
 .then(response => {
  const $div = document.getElementById("dog-image-container") ;
  const $img = document.createElement("img");
  $img.src = response.message[0]
  const $img1 = document.createElement("img");
  $img1.src = response.message[1]
  const $img2 = document.createElement("img");
  $img2.src = response.message[2]
  const $img3 = document.createElement("img");
  $img3.src = response.message[3]
  $div.append($img)
  $div.append($img1)
  $div.append($img2)
  $div.append($img3)
  })

  
  fetch (breedUrl,{method: 'GET'})
   .then(response => response.json())
   .then(breedData => {
    allBreeds = Object.keys(breedData.message)
    console.log(allBreeds)
    dogBreedUl.innerHTML = createDogList(allBreeds)
    })

  function createDogList(dogBreedArray){
    const dogLiStringArray = dogBreedArray.map(function(breed){
      return `<li>${breed}</li>`
    })
    return dogLiStringArray.join('')
  }  

  dogBreedUl.addEventListener('click', function(event){
    event.target.style.color = "red"
  })

  breedDropdown.addEventListener('change', (event) =>{
    const letter = event.target.value
    const filteredBreeds = allBreeds.filter(breed => breed.startsWith(letter))
    dogBreedUl.innerHTML = createDogList(filteredBreeds)
  })
})

