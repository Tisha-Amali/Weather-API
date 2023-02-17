var inputval = document.querySelector("#cityinput");
var btn = document.querySelector("#add");
var city = document.querySelector("#cityoutput");
var weather = document.querySelector("#text");
var temp = document.querySelector("#temp_c");
var humidity = document.querySelector("#humidity");
var pressure = document.querySelector("#pressure");
var uvindex = document.querySelector("#uvindex");

var wind = document.querySelector("#wind");
var moonphase = document.querySelector("#moonphase");
var dewpoint = document.querySelector("#dewpoint");
var winddirection = document.querySelector("#winddirection");
var visibility = document.querySelector("#visibility");
var currentdate = document.querySelector("#date");
var currentcountry = document.getElementById("country");
var temperature = document.querySelector("#temperature");
var tempImg = document.querySelector("#tempImg");

//--- City Details ---//
var day = document.querySelector("#currentDate");

//--sun rise& set--//

var sunrise = document.querySelector("#sunrise");
var sunset = document.querySelector("#sunset");

//--- current day weather ---//
var morning = document.querySelector("#morning");
var morningImg = document.querySelector("#morningImg");
var afternoon = document.querySelector("#afternoon");
var afternoonImg = document.querySelector("#afternoonImg");
var evening = document.querySelector("#evening");
var eveningImg = document.querySelector("#eveningImg");
var night = document.querySelector("#night");
var nightImg = document.querySelector("#nightImg");

var dayForecast = document.querySelector("#day-forecast");

btn.addEventListener("click", function () {
  fetch(
    "http://api.weatherapi.com/v1/forecast.json?key=55df415ce302427d82d53522231502&q=" +
      inputval.value +
      "&days=8&aqi=no&alerts=no"
  ) //api for the get request
    .then((response) => response.json())
    .then((data) => {
      day.innerHTML = moment().format("ddd");
      city.innerHTML = data.location.name;

      if (data && data.forecast && data.forecast) {
        let { forecastday } = data.forecast;
        tempImg.setAttribute(
          "src",
          `./imgs/Svg/${data.current.is_day === 0 ? "night" : "day"}/${
            data.current.condition.code
          }.svg`
        );
        if (forecastday && forecastday.length > 0) {
          const currentDay = forecastday.shift();
          sunrise.innerHTML = currentDay.astro.sunrise;

          sunset.innerHTML = currentDay.astro.sunset;

          let { hour } = currentDay;
          if (hour && hour.length > 0) {
            let morningWeather = hour[5];
            morning.innerHTML = morningWeather.temp_c;
            morningImg.setAttribute(
              "src",
              `./imgs/Svg/${morningWeather.is_day === 1 ? "day" : "night"}/${
                morningWeather.condition.code
              }.svg`
            );

            let afternoonWeather = hour[11];
            afternoon.innerHTML = afternoonWeather.temp_c;
            afternoonImg.setAttribute(
              "src",
              `./imgs/Svg/${afternoonWeather.is_day === 1 ? "day" : "night"}/${
                morningWeather.condition.code
              }.svg`
            );

            let eveningWeather = hour[17];
            evening.innerHTML = eveningWeather.temp_c;
            eveningImg.setAttribute(
              "src",
              `./imgs/Svg/${eveningWeather.is_day === 1 ? "day" : "night"}/${
                morningWeather.condition.code
              }.svg`
            );

            let nightWeather = hour[23];
            night.innerHTML = nightWeather.temp_c;
            nightImg.setAttribute(
              "src",
              `./imgs/Svg/${nightWeather.is_day === 1 ? "day" : "night"}/${
                morningWeather.condition.code
              }.svg`
            );
          }
          let weatherData = forecastday.map((day, index) => {
            return `
                <div class="pp ${
                  index !== forecastday.length - 1 ? "border-end" : ""
                }">
                <img src="./imgs/Svg/day/${
                  day.day.condition.code
                }.svg" style="height: 40px" />
                <p class="h6 text-center px-2">${day.day.avgtemp_c}°C</p>
                <p class="text-center">${moment(day.date).format("dddd")}</p>
              </div>
                `;
          });
          dayForecast.innerHTML = weatherData.join("\n");
        }
      }

      city.innerHTML = data.location.name;
      temp.innerHTML = `${data.current.temp_c}°C`;
      weather.innerHTML = data.current.condition.text;
      humidity.innerHTML = data.current.humidity;
      pressure.innerHTML = data.current.pressure_mb;
      uvindex.innerHTML = data.current.uv;

      wind.innerHTML = data.current.wind_mph;
      moonphase.innerHTML = data.forecast.forecastday[0].astro.moon_phase;
      dewpoint.innerHTML = data.forecast.forecastday[0].hour[0].dewpoint_c;
      winddirection.innerHTML = data.current.wind_dir;
      visibility.innerHTML = data.current.vis_km;

      currentcountry.innerHTML = `${data.location.name}, ${data.location.country}'s Weather`;
      temperature.innerHTML = `${data.current.temp_c}°C`;
    });
});

navigator.geolocation.getCurrentPosition((loc) => {
  fetch(
    "http://api.weatherapi.com/v1/forecast.json?key=55df415ce302427d82d53522231502&q=" +
      loc.coords.latitude +
      "," +
      loc.coords.longitude +
      "&days=8&aqi=no&alerts=no"
  ) //api for the get request
    .then((response) => response.json())
    .then((data) => {
      day.innerHTML = moment().format("ddd");
      city.innerHTML = data.location.name;

      if (data && data.forecast && data.forecast) {
        let { forecastday } = data.forecast;
        tempImg.setAttribute(
          "src",
          `./imgs/Svg/${data.current.is_day === 0 ? "night" : "day"}/${
            data.current.condition.code
          }.svg`
        );
        if (forecastday && forecastday.length > 0) {
          const currentDay = forecastday.shift();
          sunrise.innerHTML = currentDay.astro.sunrise;

          sunset.innerHTML = currentDay.astro.sunset;

          let { hour } = currentDay;
          if (hour && hour.length > 0) {
            let morningWeather = hour[5];
            morning.innerHTML = morningWeather.temp_c;
            morningImg.setAttribute(
              "src",
              `./imgs/Svg/${morningWeather.is_day === 1 ? "day" : "night"}/${
                morningWeather.condition.code
              }.svg`
            );

            let afternoonWeather = hour[11];
            afternoon.innerHTML = afternoonWeather.temp_c;
            afternoonImg.setAttribute(
              "src",
              `./imgs/Svg/${afternoonWeather.is_day === 1 ? "day" : "night"}/${
                morningWeather.condition.code
              }.svg`
            );

            let eveningWeather = hour[17];
            evening.innerHTML = eveningWeather.temp_c;
            eveningImg.setAttribute(
              "src",
              `./imgs/Svg/${eveningWeather.is_day === 1 ? "day" : "night"}/${
                morningWeather.condition.code
              }.svg`
            );

            let nightWeather = hour[23];
            night.innerHTML = nightWeather.temp_c;
            nightImg.setAttribute(
              "src",
              `./imgs/Svg/${nightWeather.is_day === 1 ? "day" : "night"}/${
                morningWeather.condition.code
              }.svg`
            );
          }
          let weatherData = forecastday.map((day, index) => {
            return `
          <div class="pp ${
            index !== forecastday.length - 1 ? "border-end" : ""
          }">
          <img src="./imgs/Svg/day/${
            day.day.condition.code
          }.svg" style="height: 40px" />
          <p class="h6 text-center px-2">${day.day.avgtemp_c}°C</p>
          <p class="text-center">${moment(day.date).format("dddd")}</p>
        </div>
          `;
          });
          dayForecast.innerHTML = weatherData.join("\n");
        }
      }

      city.innerHTML = data.location.name;
      temp.innerHTML = `${data.current.temp_c}°C`;
      weather.innerHTML = data.current.condition.text;
      humidity.innerHTML = data.current.humidity;
      pressure.innerHTML = data.current.pressure_mb;
      uvindex.innerHTML = data.current.uv;

      wind.innerHTML = data.current.wind_mph;
      moonphase.innerHTML = data.forecast.forecastday[0].astro.moon_phase;
      dewpoint.innerHTML = data.forecast.forecastday[0].hour[0].dewpoint_c;
      winddirection.innerHTML = data.current.wind_dir;
      visibility.innerHTML = data.current.vis_km;
      // currentdate.innerHTML = data.location.localtime;
      currentcountry.innerHTML = `${data.location.name}, ${data.location.country}'s Weather`;
      temperature.innerHTML = `${data.current.temp_c}°C`;
    });
});
