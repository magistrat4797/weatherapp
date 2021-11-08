<template>
    <div class="forecast-item-col col">
        <div class="forecast-box">
            {{ forecast.daily[0].dt }}
            <br/><br/>
            <!-- <div class="forecast-date">{{ UnixDays(forecast.daily[0].dt) }}</div> -->
            <!-- <div class="forecast-temp">{{ Math.round(forecast.daily[0].temp.day) }}°C</div>
            <div class="forecast-icon"><img :src="'http://openweathermap.org/img/wn/'+ forecast.daily[0].weather[0].icon +'@4x.png'">  </div> -->
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ForecastItem',
        props: ['forecast'],
        methods: {
            UnixDays(t) {
                let d = new Date(t * 1000),
                    months = ["Jan", "Feb", "March", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    day = days[d.getDay()],
                    date = d.getDate(),
                    month = months[d.getMonth()]
                return `${day} ${date}, ${month}`;
            }
        }
    }
</script>