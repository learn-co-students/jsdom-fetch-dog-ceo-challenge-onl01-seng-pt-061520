console.log('%c HI', 'color: firebrick')
document.addeventListener("DOMCOntentLoaded", () => {
  fetchDogs()
  fetchBreeds()
  let dropDown = document.querySelector('#breed-dropdown')
    dropDown.addeventListener('change', (e) => {
      let breedChildren = document.querySelector('#dog-breeds').children
      let breedsArray = [...breedChildren]
      console.log(`${breedsArray[0].innerText.charAt(0)}`)
      breedsArray.forEach(breed => {
        if (breed.innerText.charAt(0) === e.target.value) {
                    breed.style.display = null
                } else {
                    breed.style.display = 'none'
                }
            })
        })
    })
    
    async function fetchBreeds() {
    const resp = await fetch('https://dog.ceo/api/breeds/list/all')
    const json = await resp.json()
    return renderBreeds(json)
}

async function renderBreeds(json) {

  const values = Object.values(json.message);
  const keys = Object.keys(json.message);
  let group = document.getElementById('dog-breeds');

  for(let i = 0; i < keys.length; i++) {

    let line = document.createElement('li');

    if (values[i].length > 0) {
      for(let x = 0; x < values[i].length; x++) {
        line.innerHTML = `<li>${values[i][x]} ${keys[i]}</li>`;
      }
    }
    else {
      line.innerHTML = `<li>${keys[i]}</li>`;
      }
      group.appendChild(line);
    }

  }





async function renderDogs(json) {
    const dogImgContainer = document.getElementById('dog-image-container')
    json.message.forEach(dog => {
        dogImgContainer.innerHTML += `<img src = '${dog}', width="200px", length="100px">`
    })
}