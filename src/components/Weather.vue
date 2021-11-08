<template>
    <section class="weather-sec">
        <div class="wrapper">
            <header class="row">
                <div class="title-col col -center">
                    <div class="title-box" v-if="typeof weather.main != 'undefined'">
                        <h1>{{ weather.name }}, {{ weather.sys.country }}</h1>
                        <span class="date">{{ dateBuilder }}</span>
                    </div>
                    <div class="title-box" v-if="weather.cod == 404">
                        <h1>Oops not a valid location ... Please enter a valid location 😊</h1>
                    </div>
                    <div class="title-box" v-if="typeof weather.main == 'undefined' && weather.cod != 404">
                        <h1>Oops, it seems you didn't enter the location 😔</h1>
                    </div>
                </div>
            </header>
            <div class="row" v-if="typeof weather.main != 'undefined'">
                <div class="weather-col col">
                    <div class="weather-app">
                        <div class="weather-box">
                            <div class="weather-top-info">
                                <div class="clouds-level"><span class="icon"><i class="fas fa-cloud"></i></span> {{ weather.clouds.all }}%</div>
                                <div class="wind-speed"><span class="icon"><i class="fas fa-wind"></i></span> {{ weather.wind.speed }}m/s <span class="wind-dir">{{ windDirection(weather.wind.deg) }}</span></div>
                                <div class="humidity"><span class="icon"><i class="fas fa-tint"></i></span> {{ weather.main.humidity }}%</div>
                            </div>
                            <div class="weather-main-info">
                                <div class="temp-box">
                                    <div class="temp-main">{{ Math.round(weather.main.temp) }}</div>
                                    <div class="temp-inner-box">
                                        <div class="temp-sign">°C</div>
                                        <div class="temp-max"><span class="icon"><i class="fas fa-long-arrow-alt-up"></i></span> {{ Math.round(weather.main.temp_max) }}°</div>
                                        <div class="temp-min"><span class="icon"><i class="fas fa-long-arrow-alt-down"></i></span> {{ Math.round(weather.main.temp_min) }}°</div>
                                    </div>
                                </div>
                                <div class="weather-desc">{{ weather.weather[0].description }}</div>
                                <div class="weather-icon">
                                    <img :src="'http://openweathermap.org/img/wn/'+ weather.weather[0].icon +'@4x.png'">  
                                </div>
                            </div>
                            <div class="weather-extra-info">
                                <div>Feels like: <span>{{ Math.round(weather.main.feels_like) }}°C</span></div>
                                <div>Sunrise: <span>{{ UnixTimestamp(weather.sys.sunrise) }}</span></div>
                                <div>Sunset: <span>{{ UnixTimestamp(weather.sys.sunset) }}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="forecast-col col">
                    <div class="row">
                        <div class="forecast-item-col col"  v-for="day in forecastDays" :key="day">
                            <div class="forecast-box">
                                <div class="forecast-date">{{ UnixDays(forecast.daily[day].dt) }}</div>
                                <div class="forecast-temp">{{ Math.round(forecast.daily[day].temp.day) }}°C</div>
                                <div class="forecast-icon"><img :src="'http://openweathermap.org/img/wn/'+ forecast.daily[day].weather[0].icon +'@2x.png'"></div>
                                <div class="forecast-extra-info">
                                    <div>Feels like: <b>{{ Math.round(forecast.daily[day].feels_like.day) }}°C</b></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="actions-col col">
                    <router-link :to="{name: 'Search'}" class="btn btn-default">
                        Back to search
                    </router-link>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'Weather',
        props: ['query'],
        data() {
            return {
                api_key:'b7fe640e9a244244a6f806f3a6cbf5fc',
                url_base:'https://api.openweathermap.org/data/2.5/',
                forecastDays: 6,
                weather: {},
                forecast: {}
                
            }
        },
        computed: {
            dateBuilder () {
                let d = new Date(),
                    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    day = days[d.getDay()],
                    date = d.getDate(),
                    month = months[d.getMonth()],
                    year = d.getFullYear();
                return `${day} ${date}, ${month} ${year}`;
            }
        },
        methods: {
            fetchWeather(){
                fetch(`${this.url_base}weather?q=${this.query}&units=metric&appid=${this.api_key}`)
                .then(response =>{
                    return response.json()
                }).then(this.setCurrentWeather);
            },
            setCurrentWeather(results){
                this.weather = results;

                fetch(`${this.url_base}onecall?lat=${this.weather.coord.lat}&lon=${this.weather.coord.lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${this.api_key}`)
                .then(data =>{
                    return data.json()
                }).then(this.setForecast);
            },
            setForecast(results){
                this.forecast = results
            },
            UnixTimestamp(t) {
                let date = new Date(t * 1000),
                    hr = date.getHours(),
                    m = "0" + date.getMinutes(),
                    s = "0" + date.getSeconds();
                return hr + ':' + m.substr(-2) + ':' + s.substr(-2);
            },
            UnixDays(t) {
                let d = new Date(t * 1000),
                    months = ["Jan", "Feb", "March", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    day = days[d.getDay()],
                    date = d.getDate(),
                    month = months[d.getMonth()]
                return `${day} ${date}, ${month}`;
            },
            windDirection(dir) {
                if(dir <= 45 || dir > 315){
                    return "North";
                }
                if(dir > 45 && dir <= 135){
                    return "East";
                }
                if(dir > 135 && dir <= 225){
                    return "South";
                }
                if(dir > 225 && dir <= 315){
                    return "West";
                }
            }
        },
        created() {
            this.fetchWeather();
        }
    }
</script>
