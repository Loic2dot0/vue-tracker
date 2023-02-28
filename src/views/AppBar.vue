<template>
    <v-app-bar-nav-icon @click="drawer = !drawer" ></v-app-bar-nav-icon>
    <v-app-bar-title>Vue Tracker</v-app-bar-title>
</template>

<script>
    export default {
        name: "AppBar",
        data(){
            return {
            drawer: null
            } 
        }
    }
</script>

<style lang="scss" scoped>

</style>