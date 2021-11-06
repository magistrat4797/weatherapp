<template>
    <router-link :to="{name: 'Search'}">
        Back to search
    </router-link>
    <section class="weather-sec">
        <div class="wrapper">
            <div class="row">
                <div class="weather-col col">
                    <div class="weather-app" v-if="typeof weather.main != 'undefined'">
                        <div class="location-box">
                            <div class="location">{{weather.name}},{{weather.sys.country}}</div>
                            <div class="date">{{ dateBuilder() }}</div>
                        </div>
                        <div class="weather-box">
                            <div class="temp">{{ Math.round(weather.main.temp) }}°C</div>
                            <div class="wheather">{{ weather.weather[0].description }}</div>
                        </div>
                    </div>
                    <div class="extra"  v-if="typeof weather.main != 'undefined'">
                        <div info-box>
                            <p>Minimum temperature: {{Math.round(weather.main.temp_min)}}°C</p>
                            <p>Maximum temperature: {{Math.round(weather.main.temp_max)}}°C</p>
                            <p>Thermal sensation: {{Math.round(weather.main.feels_like)}}°C</p>
                            <p>Humidity: {{weather.main.humidity}}%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'Weather',
    data() {
        return {
            api_key:'b7fe640e9a244244a6f806f3a6cbf5fc',
            url_base:'https://api.openweathermap.org/data/2.5/',
            weather: {}
        }
    },
    props: ['query'],
    methods: {
        fetchWeather(){
            fetch(`${this.url_base}weather?q=${this.query}&units=metric&appid=${this.api_key}`)
            .then(response =>{
                return response.json()
            }).then(this.setResults);
        },
        setResults(results){
            this.weather = results;
        },
        dateBuilder () {
            let d = new Date();
            let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            let day = days[d.getDay()];
            let date = d.getDate();
            let month = months[d.getMonth()];
            let year = d.getFullYear();
            return `${day} ${date} ${month} ${year}`;
        }
    },
    created() {
        this.fetchWeather()
    }
}
</script>
