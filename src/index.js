const form = document.querySelector('#input-form')
const topDisplay = document.querySelector('#topDisplay')
const disPokeName = document.querySelector('#pokeName')
const disPokeImg = document.querySelector('#displayPokemon')

for(let i = 0; i < 5; i++){
    
    
    let ranPoke = parseInt(Math.random()*10000) % 151 + 1
    fetch(`https://pokeapi.co/api/v2/pokemon/${ranPoke}`)
        .then(resp => resp.json())
        .then(data => {
            const img = document.createElement('img')
            img.setAttribute('topDisplay', (i+1))
            img.setAttribute('pokemonName', data.name)
            img.src = data.sprites.front_default

            topDisplay.prepend(img)

            if(i=5 ){
                disPokeName.textContent = img.getAttribute('pokemonName').toUpperCase()
                disPokeImg.src = img.src
            }
            // console.log(data)
            // console.log(parseInt(Math.random()*10000) % 151 + 1)
            
            img.addEventListener('click', () => {
                disPokeName.textContent = img.getAttribute('pokemonName').toUpperCase()
                disPokeImg.src = img.src
            })
            })
    
    
}

form.addEventListener('submit', e => {
    e.preventDefault()
    const pokemon = e.target.name.value

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(resp => resp.json())
        .then(data => {
            disPokeName.textContent = data.name.toUpperCase()
            disPokeImg.src = data.sprites.front_default
        })
})