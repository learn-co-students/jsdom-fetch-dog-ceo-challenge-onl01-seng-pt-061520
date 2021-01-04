console.log('%c HI', 'color: firebrick')

function fetchImages(){
  return fetch('https://dog.ceo/api/breeds/image/random/4')
    .then(response => response.json())
    .then(images => renderImages(images.message));
}

  function renderImages(images){
    const imageContainer = document.getElementById('dog-image-container');
      images.forEach(image => {
        const img = document.createElement('img')
        img.src = image;
        imageContainer.appendChild(img)
      })
  }

  function fetchBreeds(){
    return fetch('https://dog.ceo/api/breeds/list/all')
      .then(response => response.json())
      .then(json => renderBreedsAndClick(json.message));
  }

  function renderBreeds(json){
    const breedContainer = document.getElementById('dog-breeds');
    for (const breed in json) {
      const li = document.createElement('li')
      li.innerHTML = `<p>${breed} </p>`
      li.classList.add("dog-breed");
      if(subBreedIdentifier(json[breed])){
        const ul = renderDogSubBreeds(json[breed]);
        li.appendChild(ul);
      }
      breedContainer.appendChild(li)
    }
  }

  function clickChangeColor(){
      const li =  document.querySelectorAll(".dog-breed > p");

        for (i = 0; i < li.length; i++){

          li[i].addEventListener("click", function(test){
            test.target.style.color = "red";
          })
        }
  }

  function renderBreedsAndClick(json){
    renderBreeds(json)
    clickChangeColor()
  }


  function listenForSort(){
      const selectOne = document.getElementById("breed-dropdown");
        selectOne.addEventListener("change", function(x){

          const alpha = document.getElementById('breed-dropdown').value;
          sortBreeds(alpha);
          console.log(alpha)
        });
  }



  function sortBreeds(alpha){

    const li =  document.querySelectorAll(".dog-breed > p");



    for (i = 0; i < li.length; i++){

      if (li[i].textContent[0] != alpha) {
          li[i].style.visibility = "hidden";
        } else {
          li[i].style.visibility = "visible";
      }

  }

}

  function subBreedIdentifier(array){
    return !(!Array.isArray(array) || !array.length);
  }

  function renderDogSubBreeds(subBreeds){
    const ul = document.createElement("ul");

    for (const subBreed of subBreeds){
      const subli = document.createElement("li");
      subli.textContent = subBreed;
      ul.appendChild(subli);
    }
    return ul;
  }




  document.addEventListener('DOMContentLoaded', function() {
    fetchImages()
    fetchBreeds()
    listenForSort()
  })
