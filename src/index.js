console.log('%c HI', 'color: firebrick')

//adds and loads dog images
function loadImages() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"

    return fetch(imgUrl)
        .then(response => response.json())
        .then(result => {
            result.message.forEach(image => addImages(image))
        });
}

function addImages(imgUrl) {
    const dogAlbum = document.getElementById('dog-image-container');
    const dogImg = document.createElement('img');
    dogImg.src = imgUrl;
    dogAlbum.appendChild(dogImg);

}

//adds and loads dog breeds
function loadBreeds() {

    return fetch('https://dog.ceo/api/breeds/list/all')
        .then(response => response.json())
        .then(result => {
            const breeds = Object.keys(result.message);
            addBreeds(breeds);
        })
}

function addBreeds(breeds) {
    const ul = document.getElementById('dog-breeds');
    breeds.forEach(breed => {
        const li = document.createElement('li');
        li.innerText = breed;
        ul.appendChild(li);
        li.addEventListener("click", function(event) {
            event.target.style.color = "blue";
        });
    });
}

// event listener to load dogImages and dogBreeds
document.addEventListener('DOMContentLoaded', function() {
    loadImages();
    loadBreeds();
})