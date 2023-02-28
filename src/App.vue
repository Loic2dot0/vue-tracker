<template>
    <v-app>
      <v-navigation-drawer v-model="drawer">
        <Menu></Menu>
      </v-navigation-drawer>

      <v-app-bar :elevation="2" >
        <v-app-bar-nav-icon @click="drawer = !drawer" ></v-app-bar-nav-icon>
        <v-app-bar-title>Vue Tracker</v-app-bar-title>
      </v-app-bar>

      <v-main>

      </v-main>
    </v-app>
</template>

<script>
import Menu from "./views/Menu.vue";

export default {
  data(){
    return {
      drawer: null
    } 
  }
}
</script>

<style scoped>
main{
  height: 100vh;
}
</style>
