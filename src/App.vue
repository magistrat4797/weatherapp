<template>
    <div id="app">
        <section class="page-wrap">
            <router-view/>
            <Footer/>
        </section>
    </div>
</template>

<script>
    import Footer from '@/components/Footer.vue'

    export default {
        name:'app',
        components: { Footer }
    }
</script>

<style>
    @import "./assets/css/styles.css";
</style>
