const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const pokemonHeight = document.querySelector('.pokemon__height');
const pokemonWeight = document.querySelector('.pokemon__weight');
const pokemonTypes = document.querySelector('.pokemon__types');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

const pokemonStats = document.querySelector('.pokemon__stats');

let searchPokemon = 1;

const consoleVersion = 'a'; //gb, gbc, gba
const pokedexImage = document.querySelector('.pokedex');

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }

}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';

    pokemonTypes.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;

        // TODO abstrair função de formatação de altura
        pokemonHeight.innerHTML = `Height: ${data.height}`;
        pokemonWeight.innerHTML = `Weight: ${data.weight}`;

        // TODO abstrair função de estilização de peso
        if (data.weight < 100) {
            pokemonStats.style.right = '23.8%';
        }
        else if (data.weight >= 100 && data.weight < 999) {
            pokemonStats.style.right = '22.1%';
        }
        else if (data.weight > 999) {
            pokemonStats.style.right = '20.4%';
        }

        for (let index = 0; index < data.types.length; index++) {
            const element = data.types[index];
            const type = element['type']['name']

            const type_name = document.createElement('p');
            type_name.innerHTML = type;

            // TODO extrair metodo para troca de cores dos tipos
            switch (type) {
                case 'normal':
                    type_name.style.color = '#A8A77A';
                    break;
                case 'fire':
                    type_name.style.color = '#EE8130';
                    break;
                case 'water':
                    type_name.style.color = '#6390F0';
                    break;
                case 'electric':
                    type_name.style.color = '#F7D02C';
                    break;
                case 'grass':
                    type_name.style.color = '#7AC74C';
                    break;
                case 'ice':
                    type_name.style.color = '#96D9D6';
                    break;
                case 'fighting':
                    type_name.style.color = '#C22E28';
                    break;
                case 'poison':
                    type_name.style.color = '#A33EA1';
                    break;
                case 'ground':
                    type_name.style.color = '#E2BF65';
                    break;
                case 'flying':
                    type_name.style.color = '#A98FF3';
                    break;
                case 'psychic':
                    type_name.style.color = '#F95587';
                    break;
                case 'bug':
                    type_name.style.color = '#A6B91A';
                    break;
                case 'rock':
                    type_name.style.color = '#B6A136';
                    break;
                case 'ghost':
                    type_name.style.color = '#735797';
                    break;
                case 'dragon':
                    type_name.style.color = '#6F35FC';
                    break;
                case 'dark':
                    type_name.style.color = '#705746';
                    break;
                case 'steel':
                    type_name.style.color = '#B7B7CE';
                    break;
                case 'fairy':
                    type_name.style.color = '#D685AD';
                    break;
                default:
                    break;
            }

            pokemonTypes.appendChild(type_name);
        }

        pokemonImage.style.display = 'block';

        // TODO extrair metodo para troca de consoles e sprites

        if (consoleVersion === 'gb') {
            pokemonImage.src = data['sprites']['versions']['generation-i']['red-blue']['front_gray'];
        }
        else if (consoleVersion === 'gbc') {
            pokemonImage.src = data['sprites']['versions']['generation-ii']['silver']['front_transparent'];
            pokemonImage.style.bottom = '45%';
            pokemonImage.style.height = '22%';
        }
        else if (consoleVersion === 'gba') {
            pokemonImage.src = data['sprites']['versions']['generation-iii']['ruby-sapphire']['front_default'];
            pokemonImage.style.bottom = '47%';
            pokemonImage.style.left = '33%';
            pokemonImage.style.height = '17%';
        }
        else {
            pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        }

        input.value = '';

        searchPokemon = data.id;
    }
    else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found';
        pokemonNumber.innerHTML = '';
    }

}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;

        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;

    renderPokemon(searchPokemon);
});

function checkConsoleVersion() {
    if (consoleVersion === 'gb') {
        pokedexImage.src = '/assets/images/pokedex_kanto_gb_stage.png';
        pokemonImage.style['mix-blend-mode'] = 'multiply';
    }
    else if (consoleVersion === 'gbc') {
        pokedexImage.src = '/assets/images/pokedex_kanto_gbc_stage.png';
    }
    else if (consoleVersion === 'gba') {
        pokedexImage.src = '/assets/images/pokedex_kanto_gba_stage.png';
    }
    else {
        pokedexImage.src = '/assets/images/pokedex_kanto.png';
    }
}

checkConsoleVersion();
renderPokemon(searchPokemon);