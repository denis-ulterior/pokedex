let offset = 0
const limit = 5
const max = 151
const btnLoad = document.getElementById('load-more')
const pokemonHtmlList = document.getElementById('pokemons')
btnLoad.addEventListener('click',()=>{
    loadPokemonItems()
})
PokeAPI.getPokemons(offset,limit).then((pokemonList = []) => {
    pokemonHtmlList.innerHTML = pokemonList.map(generatePokemonLiEntry).join('')
    
    //console.log(offset)
})
function generatePokemonLiEntry(pokemon){
return `
<li class="pokemon ${pokemon.type}">
    <span class="number">#${pokemon.number}</span>
    <span class="name">${pokemon.name}</span>
    <div class="detail">
        <ol class="types"> 
            ${generateTypesLi(pokemon.types).join('')}
        </ol>
        <img src="${pokemon.photo}" alt="${pokemon.name}"> 
    </div>
</li> 
`
}
function generateTypesLi(types){
    return types.map(type=>`<li class="type ${type}">${type}</li>`)
}
function loadPokemonItems(){
    maximo = limit
    offset += limit
    if(offset+limit > max){
        maximo = max -offset
        btnLoad.style.display = 'none'
    }
    PokeAPI.getPokemons(offset,maximo).then((pokemonList = []) => {
        pokemonHtmlList.innerHTML += pokemonList.map(generatePokemonLiEntry).join('')
        
    })
}
