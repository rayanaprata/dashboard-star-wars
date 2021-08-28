const personagensCont = document.getElementById("personagens");
const luasCont = document.getElementById("luas");
const planetasCont = document.getElementById("planetas");
const navesCont = document.getElementById("naves");

google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

async function drawChart() {
  const response = await swapGet("vehicles/");
  const vehiclesArray = response.data.results;
  console.log(vehiclesArray);

  const dataArray = [];
  dataArray.push(["Veículos", "Passageiros"]);
  vehiclesArray.forEach((vehicle) => {
    dataArray.push([vehicle.name, Number(vehicle.passengers)]);
  });

  var data = google.visualization.arrayToDataTable(dataArray);

  var options = {
    title: "Maiores veículos",
    legend: "none",
  };

  var chart = new google.visualization.PieChart(
    document.getElementById("piechart"),
  );

  chart.draw(data, options);
}

function preencherContadores() {
  // Ele espera pegar todos os dados com a Promise, para só depois atualizar na tela, quando todos os valores já tiverem retornado
  Promise.all([
    swapGet("people/"),
    swapGet("vehicles/"),
    swapGet("planets/"),
    swapGet("starships/"),
  ]).then(function (results) {
    personagensCont.innerHTML = results[0].data.count;
    luasCont.innerHTML = results[1].data.count;
    planetasCont.innerHTML = results[2].data.count;
    navesCont.innerHTML = results[3].data.count;
  });
}

async function preencherTabela() {
  const response = await swapGet("films/");
  const tableData = response.data.results;
  console.log(tableData);
  tableData.forEach((film) => {
    $("#filmsTable").append(
      `<tr>
        <td>${film.title}</td>
        <td>${moment(film.release_date).format("DD/MM/YYYY")}</td>
        <td>${film.director}</td>
        <td>${film.episode_id}</td>
      </tr>`,
    );
  });
}

function swapGet(param) {
  return axios.get(`https://swapi.dev/api/${param}`);
}

preencherContadores();
preencherTabela();
