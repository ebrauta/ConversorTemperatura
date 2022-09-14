const temperatures = [
  {
    id: "C",
    symbol: "°C",
    name: "Celsius",
    iceTemperature: 0,
    steamTemperature: 100,
  },
  {
    id: "F",
    symbol: "°F",
    name: "Fahreinheit",
    iceTemperature: 32,
    steamTemperature: 212,
  },
  {
    id: "K",
    symbol: "K",
    name: "Kelvin",
    iceTemperature: 273.15,
    steamTemperature: 373.15,
  },
  {
    id: "Ra",
    symbol: "°Ra",
    name: "Rankine",
    iceTemperature: 491.67,
    steamTemperature: 671.67,
  },
  {
    id: "Ro",
    symbol: "°Rø",
    name: "Rømer",
    iceTemperature: 7.5,
    steamTemperature: 60,
  },
  {
    id: "N",
    symbol: "°N",
    name: "Newton",
    iceTemperature: 0,
    steamTemperature: 33,
  },
  {
    id: "D",
    symbol: "°De",
    name: "Delisle",
    iceTemperature: 150,
    steamTemperature: 0,
  },
  {
    id: "Re",
    symbol: "°Ré",
    name: "Réaumur",
    iceTemperature: 0,
    steamTemperature: 80,
  },
];

let resposta = document.querySelector("#res");

function converte() {
  let inputTemperatura = Number(
    document.querySelector("#temperatura").value.replace(",", ".")
  );
  let selectScale1 = document.querySelector("#temp1").value;
  let selectScale2 = document.querySelector("#temp2").value;
  scaleA = temperatures.find((elem) => elem.id == selectScale1);
  scaleB = temperatures.find((elem) => elem.id == selectScale2);

  if (Number.isNaN(inputTemperatura)) {
    resposta.innerHTML =
      "Erro: Não foi digitada a temperatura corretamente! Digite somente números!";
    resposta.classList.add("erro");
  } else if (selectScale1 == "" || selectScale2 == "") {
    resposta.innerHTML =
      "Erro: Algum campo ficou em branco! Digite os valores e/ou escolha as opções!";
    resposta.classList.add("erro");
  } else {
    if (selectScale1 === selectScale2) {
      resposta.innerHTML = `A escala é a mesma, isto é, escala ${scaleA.name}.<br> 
      Portanto a temperatura é a mesma digitada <span class="t">${inputTemperatura}${scaleA.symbol}</span>`;
    } else {
      let temperaturaConvertida = 0;
      temperaturaConvertida =
        ((inputTemperatura - scaleA.iceTemperature) /
          (scaleA.steamTemperature - scaleA.iceTemperature)) *
          (scaleB.steamTemperature - scaleB.iceTemperature) +
        scaleB.iceTemperature;
      temperaturaConvertida = temperaturaConvertida.toLocaleString("pt-BR", {
        maximumFractionDigits: 2,
      });
      resposta.innerHTML = `Temperatura na Escala ${scaleA.name}: <span class="t">${inputTemperatura}${scaleA.symbol}</span><br>
            Temperatura na Escala ${scaleB.name}: <span class="t">${temperaturaConvertida}${scaleB.symbol}</span>`;
      resposta.classList.remove("erro");
    }
  }
}

function createOptions(select) {
  temperatures.forEach((temp) => {
    let option = document.createElement("option");
    option.value = temp.id;
    option.innerHTML = temp.name;
    select.appendChild(option);
  });
}

document.body.onload = () => {
  createOptions(document.querySelector("#temp1"));
  createOptions(document.querySelector("#temp2"));
  document.querySelector("#reset").addEventListener("click", () => {
    resposta.innerHTML = "";
  });
  document
    .querySelector("#convert")
    .addEventListener("click", () => converte());
};
