<template>
    <section class="search-sec">
        <div class="wrapper">
            <div class="row">
                <div class="title-col col -center">
                    <h1>Welcome to the weather application! ⛅</h1>
                    <p>Сheck the current weather and get a six days forecast for location by entering it in the input and clicking the search button</p>
                </div>
            </div>
        </div>
        <div class="wrapper -sm">
            <div class="row">
                <div class="search-col col">
                    <div class="search-box">
                        <input 
                        type="text" 
                        class="search-bar" 
                        placeholder="Location" 
                        v-model="query">
                        <router-link :to="{name: 'DetailedWeather', params: { query: query }}" class="btn-search">
                            <i class="fas fa-search"></i>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'Search',
        data() {
            return{
                query:''
            }
        }
    }
</script>
