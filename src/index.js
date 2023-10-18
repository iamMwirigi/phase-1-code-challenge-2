let chartacters = []
document.addEventListener("DOMContentLoaded", function(){
    getCharacters()
})





function getCharacters(){
    fetch(" http://localhost:3000/characters",{
        method: "GET",
        headers:{
            "Content-Type":  "application/json"
        }
    }).then(data => data.json())
    .then( response => {
        chartacters = [...response]
        displayCharacters(response)
    })
}


//displaying the characters on the front-end
function displayCharacters(characters){
    const characterbar = document.querySelector("#character-bar")
    for(character of characters){
        const span = document.createElement("span"); //create an element for each character
        span.innerText = character.name;
        span.setAttribute("id", character.id)
    
        span.addEventListener("click", (event)=> {
            diaplayCharacterDetails(getCharacterById(characters, parseInt(event.target.id)))
        });

        characterbar.appendChild(span);

        
    }
}

function diaplayCharacterDetails(character){
    const image = document.querySelector("#image");
    image.src = character.image
}

function getCharacterById(characters, id){
    return characters.find((character)=>{ 
        return character.id === id
})

}