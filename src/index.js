const form = document.querySelector('#input-form')
const topDisplay = document.querySelector('#topDisplay')
const disPokeName = document.querySelector('#pokeName')
const disPokeImg = document.querySelector('#displayPokemon')
const pokeStat = document.querySelector('#pokemonStats')

for(let i = 0; i < 5; i++){
    
    
    let ranPoke = parseInt(Math.random()*10000) % 151 + 1
    fetch(`https://pokeapi.co/api/v2/pokemon/${ranPoke}`)
        .then(resp => resp.json())
        .then(data => {
            const img = document.createElement('img')
            img.setAttribute('topDisplay', (i+1))
            img.setAttribute('pokemonName', data.name)
            img.src = data.sprites.front_default
            // pokeStat.textContent = `Catch rate :`

            topDisplay.prepend(img)

            if(i=5){
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
            pokeStat.textContent = `Catch rate: ${species.capture_rate} ${species.flavor_text_entries[5].flavor_text}`
        })
    disPokeImg.addEventListener('hover', () => {
        toggl
    })
}