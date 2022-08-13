const countContainer = document.getElementById('contaner');
const resultContainer = document.getElementById('result');
const URL = 'https://jsonplaceholder.typicode.com/posts';
const apiKey = "4d8fb5b93d4af21d66a2948710284366";


/* 
const renderCount = count => {
    countContainer.innerHTML = `
        Найдено <span>${count.toLocaleString(
          'ru-RU'
        )}</span> результатов
    `;
  };

function template(data) {
    const newElement = document.createElement('div');
    newElement.innerHTML = `
        <span style="font-size: 20px;">
          ${data.id}
        </span>
        <span style="font-size: 16px;">${data.title}</span>
      `;
    return newElement;
  }

async function Test(url) {
    await fetch(url)
    .then((res)=>res.json())
    .then(data => {
        const count = Object.keys(data).length;
        if(count){
            renderCount(count);
            data.forEach((data) => resultContainer.appendChild(template(data)));
        }
    })
}

async function getWeatherForecast_API_KEY() {
    await fetch(`https://api.weather.yandex.ru/v2/forecast?lat=55.75396&lon=37.620393&extra=true`, {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Headers": "X-Yandex-API-Key",
        "X-Yandex-API-Key": "db245dfe-28d5-41f7-a202-4b889272ea6e" 
        },
  });
} */



async function getWeather(apiKey,city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    await fetch(url)
        .then(response => response.json())
        .then(data => {
            const { main, name, sys, weather } = data;
            const icon = `http://openweathermap.org/img/wn/${weather[0]["icon"]}.png`;
            const cityContaner = document.createElement("div");
            cityContaner.classList.add("city");

            const markup = `
                <div data-name="${name},${sys.country}" style="display: flex; align-items: center;    flex-direction: column;">
                    <h2>
                        ${name}:
                        <sup style="font-size: 10px;">${sys.country}</sup>
                    </h2>
                    <div style="font-size:32px; font-weight: bold">${Math.round(main.temp)}<sup>°C</sup></div>
                    <div style="display: flex; align-items: center; justify-content: center;">
                        <img src="${icon}" alt="">
                        <span>${weather[0]["description"]}</span>
                    </div>
                </div>
            `;
            cityContaner.innerHTML = markup;
            resultContainer.appendChild(cityContaner);
        })
        .catch(() => {
            resultContainer.textContent = "Please search for a valid city 😩";
        });
}

getWeather(apiKey, 'Ekaterinburg');

//getWeatherForecast_API_KEY();
//Test(URL);