const pokemonName = document.querySelector(".pokemon__name") as HTMLSpanElement;
const pokemonNumber = document.querySelector(
  ".pokemon__number"
) as HTMLSpanElement;
const pokemonImage = document.querySelector(
  ".pokemon__image"
) as HTMLImageElement;
const pokemonHeight = document.querySelector(
  ".pokemon__height"
) as HTMLSpanElement;
const pokemonWeight = document.querySelector(
  ".pokemon__weight"
) as HTMLSpanElement;
const pokemonTypes = document.querySelector(
  ".pokemon__types"
) as HTMLDivElement;

const form = document.querySelector("#form") as HTMLFormElement;
const input = document.querySelector(".input__search") as HTMLInputElement;

const buttonPrev = document.querySelector(".btn-prev") as HTMLButtonElement;
const buttonNext = document.querySelector(".btn-next") as HTMLButtonElement;
const buttonReturnIndex = document.querySelector(
  ".btn-return-index"
) as HTMLButtonElement;

const pokemonStats = document.querySelector(
  ".pokemon__stats"
) as HTMLHeadingElement;

const pokedexImage = document.querySelector(".pokedex") as HTMLImageElement;

const consoleVersion = window.localStorage.getItem("consoleVersion");

let searchPokemon = 1;

const body = document.getElementsByTagName("body")[0] as HTMLBodyElement;

const fetchPokemon = async (pokemon: string | number) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
};

const renderPokemon = async (pokemon: string | number) => {
  body.style.backgroundImage = "";

  pokemonName.innerHTML = "Loading...";

  pokemonStats.style.display = "block";
  pokemonTypes.innerHTML = "";

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;

    pokemonHeight.innerHTML = getPokemonHeight(data.height);
    pokemonWeight.innerHTML = `Weight: ${data.weight}`;

    adjustStatsTextByWeight(data);

    displayPokemonTypes(data);

    pokemonImage.style.display = "block";
    changePokemonSprites(data);

    input.value = "";
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = "none";
    pokemonName.innerHTML = "Not found";
    pokemonNumber.innerHTML = "";
    pokemonStats.style.display = "none";
  }
};

//#region Event listeners
form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (input.value == "000" && consoleVersion === "gb") {
    return activateMissingNo();
  }

  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;

    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener("click", () => {
  searchPokemon += 1;

  renderPokemon(searchPokemon);
});

buttonReturnIndex.addEventListener("click", () => {
  window.location.href = "index.html";
});

document.onkeydown = function (evt) {
  if (evt.key == "ArrowLeft") {
    if (searchPokemon > 1) {
      searchPokemon -= 1;

      renderPokemon(searchPokemon);
    }
  } else if (evt.key == "ArrowRight") {
    searchPokemon += 1;

    renderPokemon(searchPokemon);
  }
};

function activateMissingNo() {
  pokemonName.innerHTML = "MissingNo";
  pokemonNumber.innerHTML = "";
  pokemonHeight.innerHTML = "Height: 10 cm";
  pokemonWeight.innerHTML = "Weight: 10";
  pokemonTypes.innerHTML = "";
  const type_name = document.createElement("p");
  type_name.innerHTML = "normal";
  displayElementInColor("normal", type_name);
  pokemonTypes.appendChild(type_name);
  pokemonImage.src = "/pokemon-project/assets/images/missingno.png";

  body.style.backgroundImage =
    "url(https://st3.depositphotos.com/1021369/13022/v/600/depositphotos_130226020-stock-illustration-seamless-black-and-white-background.jpg)";

  input.value = "";
  return;
}

//#endregion

function displayPokemonTypes(data: any) {
  for (let index = 0; index < data.types.length; index++) {
    const element = data.types[index];
    const type = element["type"]["name"];

    const type_name = document.createElement("p");
    type_name.innerHTML = type;

    displayElementInColor(type, type_name);

    pokemonTypes.appendChild(type_name);
  }
}

function adjustStatsTextByWeight(data: any) {
  if (data.weight < 100) {
    pokemonStats.style.right = "19.8%";
  } else if (data.weight >= 100 && data.weight < 999) {
    pokemonStats.style.right = "18.1%";
  } else if (data.weight > 999) {
    pokemonStats.style.right = "17.4%";
  }
}

function displayElementInColor(type: any, type_name: HTMLParagraphElement) {
  switch (type) {
    case "normal":
      type_name.style.color = "#A8A77A";
      break;
    case "fire":
      type_name.style.color = "#EE8130";
      break;
    case "water":
      type_name.style.color = "#6390F0";
      break;
    case "electric":
      type_name.style.color = "#F7D02C";
      break;
    case "grass":
      type_name.style.color = "#7AC74C";
      break;
    case "ice":
      type_name.style.color = "#96D9D6";
      break;
    case "fighting":
      type_name.style.color = "#C22E28";
      break;
    case "poison":
      type_name.style.color = "#A33EA1";
      break;
    case "ground":
      type_name.style.color = "#E2BF65";
      break;
    case "flying":
      type_name.style.color = "#A98FF3";
      break;
    case "psychic":
      type_name.style.color = "#F95587";
      break;
    case "bug":
      type_name.style.color = "#A6B91A";
      break;
    case "rock":
      type_name.style.color = "#B6A136";
      break;
    case "ghost":
      type_name.style.color = "#735797";
      break;
    case "dragon":
      type_name.style.color = "#6F35FC";
      break;
    case "dark":
      type_name.style.color = "#705746";
      break;
    case "steel":
      type_name.style.color = "#B7B7CE";
      break;
    case "fairy":
      type_name.style.color = "#D685AD";
      break;
    default:
      break;
  }
}

function changePokemonSprites(data: any) {
  if (consoleVersion === "gb") {
    pokemonImage.src =
      data["sprites"]["versions"]["generation-i"]["red-blue"]["front_gray"];
  } else if (consoleVersion === "gbc") {
    pokemonImage.src =
      data["sprites"]["versions"]["generation-ii"]["silver"][
        "front_transparent"
      ];
    pokemonImage.style.bottom = "45%";
    pokemonImage.style.height = "22%";
  } else if (consoleVersion === "gba") {
    pokemonImage.src =
      data["sprites"]["versions"]["generation-iii"]["ruby-sapphire"][
        "front_default"
      ];
    pokemonImage.style.bottom = "47%";
    pokemonImage.style.left = "33%";
    pokemonImage.style.height = "17%";
  } else {
    pokemonImage.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
  }
}

function checkConsoleVersion() {
  if (consoleVersion === "gb") {
    pokedexImage.src =
      "/pokemon-project/assets/images/pokedex_kanto_gb_stage.png";
    pokemonImage.style.mixBlendMode = "darken";
  } else if (consoleVersion === "gbc") {
    pokedexImage.src =
      "/pokemon-project/assets/images/pokedex_kanto_gbc_stage.png";
  } else if (consoleVersion === "gba") {
    pokedexImage.src =
      "/pokemon-project/assets/images/pokedex_kanto_gba_stage.png";
  } else {
    pokedexImage.src = "/pokemon-project/assets/images/pokedex_kanto.png";
  }
}

function getPokemonHeight(height: number) {
  let convertedHeight = height / 0.1;
  return `Height: ${convertedHeight} cm`;
}

checkConsoleVersion();
renderPokemon(searchPokemon);
