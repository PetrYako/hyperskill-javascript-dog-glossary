const content = document.getElementById("content");
const breedInput = document.getElementById("input-breed");

function showAllBreeds() {
    fetchAllBreeds()
        .then(data => showBreedsList(data.message));
}

function showDogSubBreedsByBreed() {
    fetchSubBreedsByBreed(breedInput.value.toLowerCase())
        .then(data => {
            if (data) {
                if (data.message.length === 0) {
                    showError("No sub-breeds found!");
                } else {
                    showSubBreeds(data.message);
                }
            } else {
                showError("Breed not found!");
            }
        });
}

function showRandomBreedDog() {
    fetchRandomDog().then(data => showDogImg(data.message));
}

function showDogByBreed() {
    fetchRandomDogByBreed(breedInput.value.toLowerCase())
        .then(data => {
            if (data) {
                showDogImg(data.message);
            } else {
                showError("Breed not found!");
            }
        });
}

function showBreedsList(breeds) {
    content.innerHTML = "";
    const olBreeds = document.createElement("ol");
    Object.entries(breeds).forEach(([breed, subBreeds]) => {
        const liBreed = document.createElement("li");
        liBreed.textContent = breed;
        if (subBreeds.length > 0) {
            const ulSubBreeds = document.createElement("ul");
            subBreeds.forEach(subBreed => {
                const liSubBreed = document.createElement("li");
                liSubBreed.textContent = subBreed;
                ulSubBreeds.appendChild(liSubBreed);
            })
            liBreed.appendChild(ulSubBreeds);
        }
        olBreeds.appendChild(liBreed);
    })
    content.appendChild(olBreeds);
}

function showError(text) {
    content.innerHTML = "";
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    content.appendChild(paragraph);
}

function showSubBreeds(subBreedsArr) {
    content.innerHTML = "";
    const ol = document.createElement("ol");
    subBreedsArr.forEach(el => {
        const li = document.createElement("li");
        li.textContent = el;
        ol.appendChild(li);
    });
    content.appendChild(ol);
}

function showDogImg(url) {
    content.innerHTML = "";
    const img = document.createElement("img");
    img.src = url;
    content.appendChild(img);
}

async function fetchAllBreeds() {
    try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all");
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

async function fetchSubBreedsByBreed(breed) {
    try {
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/list`);
        if (response.status === 404) {
            return undefined;
        }
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

async function fetchRandomDog() {
    try {
        const response = await fetch("https://dog.ceo/api/breeds/image/random");
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

async function fetchRandomDogByBreed(breed) {
    try {
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
        if (response.status === 404) {
            return undefined;
        }
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}
