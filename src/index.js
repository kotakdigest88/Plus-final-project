function showWeather (response){
    console.log(response.data);
    
        let temperatureElement = document.querySelector("#temperature");
        let temperature = response.data.temperature.current;
        let cityElement = document.querySelector("#weather-app-city");
        let descriptionElement = document.querySelector("#description");
        let humidityElement = document.querySelector("#humidity");
        let speedElement = document.querySelector("#wind-speed");
        let timeElement = document.querySelector("#time");
        let date = new Date(response.data.time *1000);
        let iconElement = document.querySelector ("#icon");

        iconElement.innerHTML = `<img src ="${response.data.condition.icon_url}" class="weather-app-icon"/>`;
        temperatureElement.innerHTML = Math.round(temperature);
        cityElement.innerHTML = response.data.city;  
        timeElement.innerHTML = formatDate (date);
        descriptionElement.innerHTML = response.data.condition.description;
        humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
        speedElement.innerHTML = `${response.data.wind.speed}km/h`;


     getForecast(response.data.city);   
    }
    
    
    function formatDate (date){
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let days = [
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let day = days[date.getDay()];
            
            if (minutes<10){
                minutes = `0${minutes}`
            }
            if (hours<10){
                hours = `0${hours}`;
            }
            return `${day} ${hours}:${minutes}`;
            
        }
    
    
    function searchCity (city){
        let apiKey ="2c9e95a4078b004c2cb60t37off36a27";
        let urlKey =`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
        axios.get(urlKey).then(showWeather);
    }
    
    function handleSearchSubmit (event){
        event.preventDefault();
        let searchInput = document.querySelector("#search-form-input");
    
        searchCity(searchInput.value);
     
    }
    function formatDay (timestamp){
        let date = new Date(timestamp*1000);
        let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return days[date.getDay()];
    }

    function getForecast (city){
        let apiKey = "2c9e95a4078b004c2cb60t37off36a27";
        let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
        axios(apiUrl).then(displayForecast);
        console.log(apiUrl);
    }   
  

    function displayForecast (response){ 
       console.log(response.data);
        
        let  forecastHtml = "";
        response.data.daily.forEach(function(day, index){
            if (index < 5){
            forecastHtml = forecastHtml + 
            `<div class = "weather-forecast-day">
            <div class ="weather-forecast-date">${formatDay(day.time)}</div>
            <img src = "${day.condition.icon_url}" class ="weather-forecast-icon" />
            <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max"><strong>${Math.round(day.temperature.maximum)}°</strong></span>
                <span class="weather-forecast-temperature-max">${Math.round(day.temperature.minimum)}°</span>
            </div>
            </div>`;
        }
        });

        let forecastElement = document.querySelector("#forecast");
        forecastElement.innerHTML = forecastHtml;
       


  
}

    

    let searchFormElement = document.querySelector("#search-form");
    searchFormElement.addEventListener("submit", handleSearchSubmit);

   
    searchCity("Paris");
    getForecast("Paris");
