console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = 'https://dog.ceo/api/breeds/list/all';


document.addEventListener("DOMContentLoaded", function() {
    fetch(imgUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(json) {
        for (let i = 0; i < json["message"].length; i++) {
            let div = document.getElementById("dog-image-container");
            let img = document.createElement("img");
            img.src = json["message"][i];
            div.appendChild(img); 
        }
    })

    
    fetch(breedUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        let ul = document.getElementById("dog-breeds");
        let message = json["message"];
        let sel = document.getElementById("breed-dropdown");
        let selval = sel.value;
        sel.addEventListener('change', function(){
            selval = sel.value;
            let lis = document.querySelectorAll('li');
            while (ul.firstChild) {
                ul.removeChild(ul.firstChild);
            }
            for (let i = 0; i < Object.keys(message).length; i++) {
                if (Object.keys(message)[i].slice(0,1) == selval) {    
                    if (message[Object.keys(message)[i]].length == 0) {
                        let li = document.createElement("li");
                        li.innerHTML = Object.keys(message)[i];
                        li.addEventListener("click", function() {
                            li.style.color = "green";
                        })
                        ul.appendChild(li);
                    }
                    else {
                        for (let j = 0; j < message[Object.keys(message)[i]].length; j++) {
                            let li = document.createElement("li")
                            li.innerHTML = `${message[Object.keys(message)[i]][j]}  ${Object.keys(message)[i]}`
                            li.addEventListener("click", function() {
                                li.style.color = "green";
                            })
                            ul.appendChild(li);
                        }
                    }
                }  
            }
        })

        
    })

    
});