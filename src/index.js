console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'



function fetchPics() {
    return fetch(imgUrl)
      .then(resp => resp.json())
      .then(json => renderImages(json));

  }

  function fetchBreeds(){
    return fetch(breedUrl)
    .then(resp => resp.json())
    .then(json => {
        breeds = Object.keys(json.message)
        renderBreeds(breeds)
        selectDrop()
  })
}
  
  function renderImages(messages) {
   const main = document.getElementById('dog-image-container')
    messages.message.forEach(message => {
      const img = document.createElement('img')
     img.src = message
      main.appendChild(img)
    })
  }

  function renderBreeds(breeds) {
    const breedmain = document.getElementById('dog-breeds')
    breeds.forEach(message => {
     const li = document.createElement('li')
      li.innerHTML = message
      li.addEventListener('click', changeColor)
      breedmain.appendChild(li)
    })
    
  }


  function changeColor(event){
      this.style.color = getRandomColor()
  }

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function selectDrop(){
    let selected = document.querySelector("#breed-dropdown")
    selected.addEventListener('change', function(event) {
    filterBreed(event.target.value)
  })
}

function filterBreed(letter){
  breedsFiltered = breeds.filter(breed => breed.startsWith(letter))
  showBreeds(breedsFiltered)
}

function showBreeds(breedsFiltered){
    if (breedsFiltered == undefined) {
    renderBreeds()}
    else 
    showOnlySomeBreeds(breedsFiltered)

}

function showOnlySomeBreeds(breedsfiltered){
    const breedmain = document.getElementById('dog-breeds')
    breedmain.innerHTML = ""
    breedsfiltered.forEach(message => {
     const li = document.createElement('li')
      li.innerHTML = message
      li.addEventListener('click', changeColor)
      breedmain.appendChild(li)
    })
    
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    fetchPics()
    fetchBreeds()
  })

  

 
