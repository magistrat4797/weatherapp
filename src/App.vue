<template>
    <!-- <div id="app" :class="typeof weather.main != 'undefined' && weather.main.temp > 23 ? 'warm' : '' "> -->
    <div id="app">
        <section class="page-wrap">
            <router-view/>
        </section>
    </div>
</template>

<script>
    export default {
        name:'app'
    }
</script>

<style>
    @import "./assets/css/styles.css";
</style>
