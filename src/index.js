let numPokemon = 0

const form = document.querySelector('#input-form')
const topDisplay = document.querySelector('#topDisplay')
const disPokeName = document.querySelector('#pokeName')
const disPokeImg = document.querySelector('#displayPokemon')
const pokeStat = document.querySelector('#pokemonStats')
const pokeCatch = document.querySelector('#catchrate')
const pokeDex = document.querySelector('#pokedex')
const pokeBox = document.querySelector('#pokemon-box')
const catchButton = document.querySelector('#catch')
const myPopUp= document.querySelectorAll('.popuptext')
const deleteButton = document.querySelector('#button')
const heart = document.querySelector("#heart")

for(let i = 0; i < 5; i++){
    let ranPoke = parseInt(Math.random()*10000) % 151 + 1
    fetch(`https://pokeapi.co/api/v2/pokemon/${ranPoke}`)
        .then(resp => resp.json())
        .then(data => {
            const img = document.createElement('img')
            img.setAttribute('topDisplay', (i+1))
            img.alt = data.name
            img.setAttribute('shiny', 'no')
            if(i===parseInt(Math.random()*10000) % 5){
                img.src = data.sprites.front_shiny
                img.setAttribute('shiny', 'yes')
            }
            else img.src = data.sprites.front_default
        
            topDisplay.prepend(img)

            if(i===4){
                if(img.getAttribute('shiny')==='yes' ? displayShinyPokemon(data) : displayPokemon(data));   
            }
            
            img.addEventListener('click', () => {
                if(img.getAttribute('shiny')==='yes' ? displayShinyPokemon(data) : displayPokemon(data));
            })
            })
}

form.addEventListener('submit', e => {
    e.preventDefault()
    const pokemon = e.target.name.value

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(resp => resp.json())
        .then(data => {
            if(parseInt(Math.random()*10000) % 3===0 ? displayShinyPokemon(data) :displayPokemon(data));
        })
})

function createPokemon(pokeObj) {

}

function displayPokemon(pokeObj) {
    disPokeName.textContent = pokeObj.name.toUpperCase()
    disPokeImg.src = pokeObj.sprites.front_default
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeObj.name}`)
        .then(respo => respo.json())
        .then(species => {
            pokeCatch.textContent = `Catch rate: ${species.capture_rate}`
            pokeDex.textContent = `${species.flavor_text_entries[5].flavor_text}`
        })
}

function displayShinyPokemon(pokeObj) {
    disPokeName.textContent = `${pokeObj.name.toUpperCase()} (SHINY)`
    disPokeImg.src = pokeObj.sprites.front_shiny
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeObj.name}`)
        .then(respo => respo.json())
        .then(species => {
            pokeCatch.textContent = `Catch rate: ${species.capture_rate}`
            pokeDex.textContent = `${species.flavor_text_entries[5].flavor_text}`
        })
}

disPokeImg.addEventListener('mouseover', () => {
    pokeStat.toggleAttribute('hidden') 
    console.log('hidden')
})

disPokeImg.addEventListener('mouseleave', () => {
    pokeStat.toggleAttribute('hidden') 
    console.log('visible')
})

catchButton.addEventListener("submit", e => {
    e.preventDefault()
    const caughtPokemon = {
        'name' : disPokeName.textContent,
        'sprite' : disPokeImg.src
    }
    
    fetch ("http://localhost:3000/pokemon", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json" 

        },
        body: JSON.stringify(caughtPokemon)
    })
        .then(resp => resp.json())
        .then(pokemon => {
            // numPokemon += 1
            // console.log(pokemon.id)
            const caughtPokemonImg = document.createElement ("img")
            const caughtPokemonName = document.createElement ("li")
            caughtPokemonImg.src = pokemon.sprite
            caughtPokemonName.textContent = pokemon.name
            caughtPokemonName.setAttribute('numCaught', pokemon.id)

            heart.addEventListener("click", event => {
                if(myPopUp[1].getAttribute('numCaught')===caughtPokemonName.getAttribute('numCaught')){
                    if(caughtPokemonName.getAttribute('fav')=== "yes" ? caughtPokemonName.setAttribute('fav',"no") : caughtPokemonName.setAttribute('fav',"yes"));
                }
                // if (heart.innerHTML === "♡") {
                // //   heart.innerHTML = "♥" 
                //   caughtPokemonName.setAttribute("fav", "yes")
                // } 
                // else {
                //     // heart.innerHTML = "♡"
                //     caughtPokemonName.setAttribute("fav", "no")
                // }
            })

            caughtPokemonName.addEventListener("click", e => {
                myPopUp[0].src = caughtPokemonImg.src
                myPopUp[1].textContent = caughtPokemonName.textContent
                
                myPopUp[1].setAttribute('numCaught', caughtPokemonName.getAttribute('numCaught'))
                if(caughtPokemonName.getAttribute('fav')=== "yes" ? myPopUp[2].setAttribute('disabled',true) :  myPopUp[2].removeAttribute('disabled'));
                if(caughtPokemonName.getAttribute('fav')=== "yes" ? heart.innerHTML = "♥" : heart.innerHTML = "♡");
                }
                
            )

            deleteButton.addEventListener("click", e => {
                if(myPopUp[1].getAttribute('numCaught') === caughtPokemonName.getAttribute('numCaught')){
                fetch(`http://localhost:3000/pokemon/${myPopUp[1].getAttribute('numCaught')}`, {
                    method: "DELETE",
                    headers:{
                        "Content-Type" : "application/json"
                    }
                })
                    .then(rsp => rsp.json())
                    .then(data => console.log(`deleting ${caughtPokemonName.textContent}`))
                    caughtPokemonName.remove()
              }})

            pokeBox.append(caughtPokemonName)
        })
})

function myFunction() {
    myPopUp.forEach(data => {
        data.classList.toggle('show')
    })
}


