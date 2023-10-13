// Declare variables
const characterBar = document.getElementById('character-bar');
const characterName = document.getElementById('name');
const characterImage = document.getElementById('image');
const voteCount = document.getElementById('vote-count');
const votesForm = document.getElementById('votes-form');
const resetButton = document.getElementById('reset-btn');
const buttons = document.getElementsByTagName('button')

//aesthetics
characterBar.style.backgroundColor = 'pink';

// Fetch data from the server and populate the character bar
function fetchCharacters() {
  fetch('http://localhost:3000/characters')
    .then((response) => response.json())
    .then((data) => {
      characterBar.innerHTML = data
        .map(
          (character) =>
            `<button onclick="showCharacterDetails(${character.id})">${character.name}</button>`
        )
        .join('');
    })
    .catch((error) => console.error('Error fetching characters:', error));
}

// Show details for a selected character
function showCharacterDetails(characterId) {
  fetch(`http://localhost:3000/characters/${characterId}`)
    .then((response) => response.json())
    .then((character) => {
      characterName.textContent = character.name;
      characterImage.src = character.image;
      voteCount.textContent = character.votes;

      // Event listener for the votes form
      votesForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const votesInput = document.getElementById('votes');
        const votes = parseInt(votesInput.value, 10);
        if (!isNaN(votes)) {
          character.votes += votes;
          voteCount.textContent = character.votes;
          votesInput.value = ''; // Clear the input
        }
      });
    })
    .catch((error) => console.error('Error fetching character details:', error));
}

// Reset votes for the current character
function resetVotes() {
  voteCount.textContent = '0';
}



// Add event listeners and fetch characters when the page loads
window.onload = function () {
  fetchCharacters();
  resetButton.addEventListener('click', resetVotes);
};