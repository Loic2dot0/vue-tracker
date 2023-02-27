<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer>
        <TheMenu></TheMenu>
      </v-navigation-drawer>

      <v-app-bar :elevation="2" >
        <v-app-bar-nav-icon><v-icon icon="mdi-menu" /></v-app-bar-nav-icon>
        <v-app-bar-title>Vue Tracker</v-app-bar-title>
      </v-app-bar>

      <v-main></v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
import TheMenu from "./components/TheMenu.vue";

</script>

<style scoped>
main{
  height: 100vh;
}
</style>
