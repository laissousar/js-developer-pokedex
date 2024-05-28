const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonDetail = document.getElementById('pokemonDetail')



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
function convertPokemonToDiv(pokemon) {
    return `
        <div class="pokemon-detail">
            <h2class="header_detail_name">${pokemon.name}</h2>
            
            <img src="${pokemon.image}" alt="${pokemon.name}">
            <p>Tipo: ${pokemon.type}</p>
            <p>Peso: ${pokemon.weight} kg</p>
            <p>Altura: ${pokemon.height} m</p>
        </div>
    `;
}
function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml        
    })
}
function loadPokemonDetail(id) {
    pokeApi.getPokemonDetailId(id).then((pokemon) => {
        const newWindow = window.open(`./detail.html?id=${id}`, "_blank");
        newWindow.onload = function() {
        const pokemonHtml = convertPokemonToDiv(pokemon);
        newWindow.document.write(pokemonHtml);
        newWindow.document.close();
        }
    });
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

function viewDetails(id) {
    const link = document.createElement("a");
    //link.setAttribute("href", `./detail.html?id=${id}`)
   // const newWindow = window.open(link, "_blank");
    loadPokemonDetail(id)
    //console.log(loadPokemonDetail(id))
}

