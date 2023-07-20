let currentPokemon;
let allPokemons = 0;
let allPokemonObject = [];
let morePokemon = 20;

function openPokemon(i) {
    document.getElementById('popUpContainer').classList.remove('hide');
    renderPokeDetail(i);
    getAbility(i);
    getMoves(i);
    getStats(i);
}

function renderPokeDetail(i) {
    document.getElementById('popUpContainer').innerHTML = `
    <div id="detail-card" class="detail-card">
        <div class="top-container ${allPokemonObject[i].types[0].type.name}" >
        <div class="arrows">
          <span class="left-arrow" onclick="leftArrow(${i - 1})"><img src="img/arrow-left.png"></span>
          <span class="right-arrow" onclick="rightArrow(${i + 1})"><img src="img/arrow-right.png"></span>
        </div>
          <b class="close" onclick="closePokemon()"> x </b>
          <h2>${allPokemonObject[i].name}</h2>                
          <div>${allPokemonObject[i].id}</div>
          <img src="${allPokemonObject[i].sprites.other.home.front_default}"></div>
        <div class="bottom-container" id="bottom-container">
          <div class="detail-head">
           <b onclick="showAbout()">About</b>
           <b onclick="showStats()">Stats</b>
           <b onclick="showMoves()">Moves</b>
          </div>   
        <div id="bottom-container-about">    
            <div class="pokemon-details" id="pokemon-details">
                <span> <b> Height:</b> ${allPokemonObject[i].height * 10} cm</span> 
                <span> <b> Weight:</b> ${allPokemonObject[i].weight / 10} kg</span> 
                <span> <b> Main Type:</b> ${allPokemonObject[i].types[0].type.name}</span>
                <span id="ability"><b> Abilities:</b></span>         
        </div>  
        <div id="moves" class="hide">
          <span><b></b> 
         </div> 
        <div id="stats" class="hide">
         <span><b></b>
        </div>          
        </div>  
    </div>`;
}

function closePokemon() {
    document.getElementById('popUpContainer').classList.add('hide')
}
function showMoves() {
    document.getElementById('pokemon-details').classList.add('hide')
    document.getElementById('moves').classList.remove('hide');
    document.getElementById('stats').classList.add('hide');
}
function showStats() {
    document.getElementById('stats').classList.remove('hide');
    document.getElementById('pokemon-details').classList.add('hide');
    document.getElementById('moves').classList.add('hide');
}

function showAbout() {
    document.getElementById('pokemon-details').classList.remove('hide');
    document.getElementById('moves').classList.add('hide');
    document.getElementById('stats').classList.add('hide');
}

async function generatePokemon() {
    for (let i = allPokemons; i < morePokemon; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i + 1}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        allPokemonObject.push(currentPokemon);
        document.getElementById("maincontent").innerHTML += generateCard(currentPokemon, i)
    }
    allPokemons = morePokemon;
}

function generateCard(currentPokemon, i) {
    const types = gettype(currentPokemon);
    const cardType = types.split('<br>')[0];
    return `
      <div class="card ${cardType}" id="pokecard" onclick="openPokemon(${i})">
        <div class="pokemon-card-head">
          <h2>${currentPokemon.name}</h2>
          <div>${currentPokemon.id}</div>
        </div>
        <div class="pokemon-card-wrapper">
          <div class="pokemon-card-class"id="pokeclass">
            <img src="${currentPokemon.sprites.front_shiny}" alt="Bulbasaur">
          </div>
          <div class="type">
            ${types}
          </div>
        </div>
      </div>`;
}

function gettype(currentPokemon) {
    let types = ``;
    for (let index = 0; index < currentPokemon.types.length; index++) {
        types += `${currentPokemon.types[index].type.name}<br>`
    }
    return types;
}

function getAbility(i) {
    for (let j = 0; j < allPokemonObject[i].abilities.length; j++) {
        document.getElementById("ability").innerHTML += `
         <div>
          <span>${allPokemonObject[i].abilities[j].ability.name}</span>
         </div>`
    }
}

function getMoves(i) {
    for (let m = 0; m < allPokemonObject[i].moves.length; m++) {
        document.getElementById("moves").innerHTML += `<div><span>${allPokemonObject[i].moves[m].move.name}</span></div>`
    }
}

function getStats(i) {
    for (let s = 0; s < allPokemonObject[i].stats.length; s++) {
        document.getElementById("stats").innerHTML += `
        <div>
          <span>${allPokemonObject[i].stats[s].stat.name} :</span>
          <span>${allPokemonObject[i].stats[s].base_stat}  </span>
        </div>`
    }
}

//Suchfunktion
function filterPokemon() {
    let search = document.getElementById('searchbar').value;
    search = search.toLowerCase();

    let searching = document.getElementById('maincontent');
    searching.innerHTML = ``;

    for (let i = 0; i < allPokemonObject.length; i++) {
        let name = allPokemonObject[i].name;
        if (name.toLowerCase().includes(search)) {
            document.getElementById("maincontent").innerHTML += generateCard(allPokemonObject[i], i)
        }

    }
}
//Vorheriges Pokemon
function leftArrow(i) {
    if (i <= -1) {
        i = allPokemonObject.length - 1;
    } else {
        i - 1;
    }
    renderPokeDetail(i);
    getAbility(i);
    getMoves(i);
    getStats(i);
}
//Nächstes Pokemon
function rightArrow(i) {
    if (i >= allPokemonObject.length) {
        i = 0;
    } else {
        i + 1;
    }
    renderPokeDetail(i);
    getAbility(i);
    getMoves(i);
    getStats(i);
}

//20 Pokemon mehr laden
async function morePokemons() {
    morePokemon += 20;
    generatePokemon();
}



