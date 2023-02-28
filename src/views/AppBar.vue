<template>
    <v-app-bar-nav-icon @click="sendToggleMenu()" ></v-app-bar-nav-icon>
    <v-app-bar-title>Vue Tracker</v-app-bar-title>
</template>

<script>
    export default {
        emits:['toggleMenu'],
        name: "AppBar",
        data(){
            return {
        
            } 
        },
        methods: {
            sendToggleMenu(){
                this.$emit('toggleMenu');
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>