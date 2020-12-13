const imgUrl = 'https://dog.ceo/api/breeds/image/random/4';
const breedUrl = 'https://dog.ceo/api/breeds/list/all';

function loadImages(imgUrl, imageContainer) {
	return fetch(imgUrl).then(function(response) {
		return response.json();
	}).then(function(json) {
		const arrayOfImg = json.message;
		for (let i = 0; i < arrayOfImg.length; i++) {
			const imgTag = document.createElement('img');
			imgTag.src = arrayOfImg[i];
			imageContainer.appendChild(imgTag);
		}
		return imageContainer;
	})
}

function loadBreeds(breedUrl, breedContainer) {
	return fetch(breedUrl).then(function(response) {
		return response.json();
	}).then(function(json) {
		const breeds = listifyBreeds(json.message);
		for	(breed in breeds) {
			const liTag = document.createElement('li');
			liTag.innerText = breeds[breed];
			breedContainer.appendChild(liTag);
		}
		return breedContainer;
	})
}

function listifyBreeds(breeds) {
	const listifiedBreeds = [];
	for (const breedType in breeds) {
		if (breeds[breedType].length === 0) {
			listifiedBreeds.push(breedType);
		} else {
			for (const breedSubType of breeds[breedType]) {
				listifiedBreeds.push(`${breedSubType} ${breedType}`);
			}
		}
	}
	return listifiedBreeds;
}

function addListenersForLiTags(breedContainer) {
	return breedContainer.then(function(breedContainer) {
		for (const breedLi of breedContainer.children) {
			breedLi.addEventListener('click', function() {
				if (breedLi.style.color === 'green') {
					breedLi.style.color = 'red';
				} else {
					breedLi.style.color = 'green';
				}
			})
		}
		return breedContainer;
	})
}

function startsWith(letter, words) {
	words = words.split(' ');
	for (const word of words) {
		if (word[0] === letter) {
			return true;
		}
	}
	return false;
}

function hideBreedsThatDoNotStartWith(letter, breedContainer) {
	return breedContainer.then(function(breedContainer) {
		for (const breedLi of breedContainer.children) {
			console.log(breedLi.innerText)
			if (startsWith(letter, breedLi.innerText)) {
				breedLi.style.display = '';
			} else {
				breedLi.style.display = 'none';
			}
		}
		return breedContainer;
	})
}

document.addEventListener('DOMContentLoaded', function() {
	loadImages(imgUrl, document.getElementById('dog-image-container'));

	let breedContainer = loadBreeds(breedUrl, document.getElementById('dog-breeds'));

	breedContainer = addListenersForLiTags(breedContainer);

	document.getElementById('breed-dropdown').addEventListener('change', function() {
		const breedLetter = document.getElementById('breed-dropdown').value;
		breedContainer = hideBreedsThatDoNotStartWith(breedLetter, breedContainer)
	})
})