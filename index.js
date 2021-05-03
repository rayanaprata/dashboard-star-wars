const personagensCont = document.getElementById('personagens');
const luasCont = document.getElementById('luas');
const planetasCont = document.getElementById('planetas');
const navesCont = document.getElementById('naves');

preencherContadores();

function preencherContadores() {
    Promise.all([swapGet('people/'),
                 swapGet('vehicles/'),
                 swapGet('planets/'),
                 swapGet('starships/')])
        .then(function (results) {
            console.log(results);
            personagensCont.innerHTML = results[0].data.count;
            luasCont.innerHTML = results[1].data.count;
            planetasCont.innerHTML = results[2].data.count;
            navesCont.innerHTML = results[3].data.count;
        });
}

function swapGet(param) {
    return axios.get(`https://swapi.dev/api/${param}`)
}
