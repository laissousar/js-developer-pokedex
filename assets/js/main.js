const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const pokemonPage = document.getElementById('pokemonDetail')


const maxRecords = 151
const limit = 10
let offset = 0;


function convertPokemonToLi(pokemon) {
    return `
    <div onclick="viewDetails(${pokemon.number})" style="cursor: pointer; class="pokemons-card" id="card">
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>  </div>
    `
}
function convertPokemonToIt(pokemon) {
    return `
    <div id="pokemonDetail" class="background">
    <header class="header_detail">
        <span id="pokemonName" class="header_detail_name">${pokemon.name}</span>
        <span id="pokemonNumber" class="header_detail_id">${pokemon.number}</span>
    </header>
    <main>
        <div class="apresentacao_pokemom" >
            <img class="apresentacao_pokemom_foto" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg" alt="">
            <span class="apresentacao_pokemom_tipo">Type</span>
            <span class="apresentacao_pokemom_sobre" >About</span>
            <div class="apresentacao_pokemom_caracteristica_conteiner" >
                <div class="apresentacao_pokemom_caracteristica">
                    <span class="apresentacao_pokemom_caracteristica_detalhe">6.9 kg</span>
                    <span class="apresentacao_pokemom_caracteristica_detalhe2">Weight</span>
                </div>
                <div class="apresentacao_pokemom_caracteristica">
                    <span class="apresentacao_pokemom_caracteristica_detalhe">0,7 m</span>
                    <span class="apresentacao_pokemom_caracteristica_detalhe2">Height</span>
                </div>
                <div class="apresentacao_pokemom_caracteristica">
                    <span class="apresentacao_pokemom_caracteristica_detalhe">Overgrow</span>
                    <span class="apresentacao_pokemom_caracteristica_detalhe2">Moves</span>
                </div>                
                </div>
        </div>
        <span class="apresentacao_pokemom_caracteristica_texto">There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.</span>
    </main>        
</div>
    `
}
function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml        
    })
}
function loadPokemonItem(){
    
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

async function viewDetails(idPoke) {
    const link = document.createElement("a");
    link.setAttribute("href", `./detail.html?id=${idPoke}`)
    await pokeApi.getPokemonDetailId(idPoke).then((pokemon) => {
        if (testeHtml) {
            testeHtml.textContent = `${JSON.stringify(pokemon, undefined, idPoke)}`;
        }
    });
    window.open(link);   
}

