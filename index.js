const personagensCont = document.getElementById("personagens");
const luasCont = document.getElementById("luas");
const planetasCont = document.getElementById("planetas");
const navesCont = document.getElementById("naves");

function preencherContadores() {
  // Ele espera pegar todos os dados com a Promise, para só depois atualizar na tela, quando todos os valores já tiverem retornado
  Promise.all([
    swapGet("people/"),
    swapGet("vehicles/"),
    swapGet("planets/"),
    swapGet("starships/"),
  ]).then(function (results) {
    console.log(results);
    personagensCont.innerHTML = results[0].data.count;
    luasCont.innerHTML = results[1].data.count;
    planetasCont.innerHTML = results[2].data.count;
    navesCont.innerHTML = results[3].data.count;
  });
}

function swapGet(param) {
  return axios.get(`https://swapi.dev/api/${param}`);
}

preencherContadores();
