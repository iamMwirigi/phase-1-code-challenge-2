let characters = [];

document.addEventListener("DOMContentLoaded", function(){
    getCharacters();
});

function getCharacters() {
    fetch("http://localhost:3000/characters", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(data => data.json())
      .then(response => {
        characters = [...response];
        displayCharacters(response);
    });
}

// Displaying the characters on the front-end
function displayCharacters(characters) {
    const characterbar = document.querySelector("#character-bar");
    for (character of characters) {
        const span = document.createElement("span");
        span.innerText = character.name;
        span.setAttribute("id", character.id);

        span.addEventListener("click", (event) => {
            const characterId = parseInt(event.target.id);
            const character = getCharacterById(characters, characterId);
            displayCharacterDetails(character);
        });

        characterbar.appendChild(span);
    }
}

function displayCharacterDetails(character) {
    const image = document.querySelector("#image");
    image.src = character.image; // Set the source of the image element to the character's image URL
    image.alt = character.name; // Set the alt attribute for accessibility

    const voteCount = document.querySelector("#vote-count");
    voteCount.innerText = character.votes; // Display vote count (modify this based on your data structure)
}

function getCharacterById(characters, id) {
    return characters.find((character) => character.id === id);
}
