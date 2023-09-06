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

for(let i = 0; i < 5; i++){
    
    
    let ranPoke = parseInt(Math.random()*10000) % 151 + 1
    fetch(`https://pokeapi.co/api/v2/pokemon/${ranPoke}`)
        .then(resp => resp.json())
        .then(data => {
            const img = document.createElement('img')
            img.setAttribute('topDisplay', (i+1))
            img.alt = data.name
            img.src = data.sprites.front_default
            // pokeStat.textContent = `Catch rate :`

            topDisplay.prepend(img)

            if(i===4){
                // disPokeName.textContent = img.getAttribute('pokemonName').toUpperCase()
                // disPokeImg.src = img.src
                displayPokemon(data)
                
            }
            // console.log(data)
            // console.log(parseInt(Math.random()*10000) % 151 + 1)
            
            
            img.addEventListener('click', () => {
                // disPokeName.textContent = img.getAttribute('pokemonName').toUpperCase()
                // disPokeImg.src = img.src
                displayPokemon(data)
            })
            })
    
    
}

form.addEventListener('submit', e => {
    e.preventDefault()
    const pokemon = e.target.name.value

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(resp => resp.json())
        .then(data => {
            // disPokeName.textContent = data.name.toUpperCase()
            // disPokeImg.src = data.sprites.front_default
            displayPokemon(data)
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

disPokeImg.addEventListener('mouseover', () => {
    pokeStat.toggleAttribute('hidden') 
    console.log('hidden')
})

disPokeImg.addEventListener('mouseleave', () => {
    pokeStat.toggleAttribute('hidden') 
    console.log('visible')
})
    // disPokeImg.addEventListener('hover', () => {
    // })


catchButton.addEventListener("submit", e => {
    // debugger
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
            
            // const caughtdiv = document.createElement('div')
            numPokemon += 1
            const caughtPokemonImg = document.createElement ("img")
            const caughtPokemonName = document.createElement ("li")
            caughtPokemonImg.src = pokemon.sprite
            caughtPokemonName.textContent = pokemon.name
            caughtPokemonName.setAttribute('numCaught', numPokemon)

            caughtPokemonName.addEventListener("click", e => {
                myPopUp[0].src = caughtPokemonImg.src
                myPopUp[1].textContent = caughtPokemonName.textContent
                myPopUp[1].setAttribute('numCaught', caughtPokemonName.getAttribute('numCaught'))
                // console.log('assign data')
            })

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
            // caughtPokemonImg.setAttribute('class', 'popuptext')
            // caughtPokemonImg.setAttribute('class', '')
            
            pokeBox.append(caughtPokemonName)
            // caughtdiv.append()

        })
})

function myFunction() {
    myPopUp.forEach(data => {
        data.classList.toggle('show')
    })
  }
