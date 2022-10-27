let offset = 0
const limit = 4
const max = 151
const btnLoad = document.getElementById('load-more')
const pokemonHtmlList = document.getElementById('pokemons')
const modalContent = document.getElementById('modal-content')
var pokemonCache = []
btnLoad.addEventListener('click',()=>{
    loadPokemonItems()
})
PokeAPI.getPokemons(offset,limit).then((pokemonList = []) => {
    pokemonHtmlList.innerHTML = pokemonList.map(generatePokemonLiEntry).join('')
    
    pokemonCache = pokemonList
})
function generatePokemonLiEntry(pokemon){
return `
<li class="pokemon ${pokemon.type}" id="${pokemon.number}" onClick=detail(${pokemon.number})>
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
function generateAbilitiesLi(abilities){
    return abilities.map(ability=>`<li class="ability ${ability}">${ability}</li>`)
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
        pokemonList.map(pokemonList=>pokemonCache.push(pokemonList))
    })
    
}
function detail(id){
    pokemon = pokemonCache[id-1]
    modalContent.innerHTML = `
    <span class="close" onClick='fechar()'>&times;</span>
    
    <span class="number">#${pokemon.number}</span>
    <span class="name">${pokemon.name}</span>
    <div class="detail-modal">
        <ol class="types"> 
            ${generateTypesLi(pokemon.types).join('')}
        </ol>
        <ol class="abilities">
        <p>Abilities</p>
        ${generateAbilitiesLi(pokemon.abilities).join('')}
        </ol>
        
        <p>Height: ${pokemon.height}</p>
        <p>Base xp: ${pokemon.base_experience}</p>
        <img src="${pokemon.photo}" alt="${pokemon.name}" class = "imgDetail"> 
    </div>
`
    console.log(pokemonCache)
    modal.style.display = "block";
    
}
function fechar() {
    modal.style.display = "none";

}
