<template>
    <section class="search-sec">
        <div class="wrapper">
            <div class="row">
                <div class="search-col col">
                    <div class="search-box">
                        <input 
                        type="text" 
                        class="search-bar" 
                        placeholder="Enter city" 
                        v-model="query">
                        <router-link :to="{name: 'DetailedWeather', params: { query: query }}">
                            Check Weather
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
