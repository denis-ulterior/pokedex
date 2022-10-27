const PokeAPI={
offset:0,limit:10,

convertPokemonApiJsonToPokemon (pokemonJson){
    const pokemon = new Pokemon()
    const types = pokemonJson.types.map(slot => slot.type.name)
    const [type] = types
    pokemon.type = type
    pokemon.number = pokemonJson.id
    pokemon.name = pokemonJson.name
    pokemon.types = types
    pokemon.photo = pokemonJson.sprites.other.dream_world.front_default
    pokemon.abilities = pokemonJson.abilities.map(slot=>slot.ability.name)
    pokemon.height = pokemonJson.height
    pokemon.base_experience = pokemonJson.base_experience
    return pokemon
},

getPokemon: pokemon =>  fetch(pokemon.url)
.then(response => response.json())
.then(PokeAPI.convertPokemonApiJsonToPokemon),

getPokemons:async function(offset,limit) {
        this.offset = offset
        this.limit = limit
        const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
        return fetch(url)
        .then(response => response.json())
        .then(jsonBody=>jsonBody.results)
        .then(pokemons => pokemons.map(PokeAPI.getPokemon))
        .then(detailRequests => Promise.all(detailRequests))
        .then(pokemonsDetails => pokemonsDetails);

       
    }

}