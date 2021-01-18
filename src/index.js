console.log("%c HI", "color: firebrick");

document.addEventListener("DOMContentLoaded", function () {
  fetchImages();
  fetchBreeds();
});

function fetchImages() {
  fetch("https://dog.ceo/api/breeds/image/random/4")
    .then((resp) => resp.json())
    .then((json) => json.message.forEach((image) => renderImage(image)));
}

function renderImage(image) {
  const div = document.querySelector("#dog-image-container");
  const img = document.createElement("img");
  img.src = image;
  div.appendChild(img);
}

function fetchBreeds() {
  fetch("https://dog.ceo/api/breeds/list/all")
    .then((resp) => resp.json())
    .then((json) => {
      breeds = Object.keys(json.message);
      renderBreeds(breeds);
      selectBreeds();
    });
}

function renderBreeds(breeds) {
  const ul = document.querySelector("#dog-breeds");

  breeds.forEach((breed) => {
    const li = document.createElement("li");
    li.innerText = breed;
    li.addEventListener("click", addColor);
    ul.appendChild(li);
  });
}

function addColor(event) {
  event.target.style.color = "green";
}

function selectBreeds() {
  let select = document.querySelector("#breed-dropdown");
  select.addEventListener("change", function (event) {
    filterBreeds(event.target.value);
  });
}

function filterBreeds(letter) {
  updateBreedsList(breeds.filter((breed) => breed.startsWith(letter)));
}

function updateBreedsList(breeds) {
  let ul = document.querySelector("#dog-breeds");
  removeChildren(ul);
  breeds.forEach((breed) => addBreedToList(breed));
}

function removeChildren(element) {
  let child = element.firstChild;

  while (child) {
    element.removeChild(child);
    child = element.firstChild;
  }
}

function addBreedToList(breed) {
  let li = document.createElement("li");
  let ul = document.querySelector("#dog-breeds");
  li.innerText = breed;
  li.addEventListener("click", addColor);
  ul.appendChild(li);
}
