<template>
    <v-app>
      <v-navigation-drawer v-model="drawer">
        <Menu></Menu>
      </v-navigation-drawer>

      <v-app-bar :elevation="2" height="auto">
          <Appbar @toggleMenu="drawer = !drawer" @newTask="addTask($event)"></Appbar>
      </v-app-bar>

      <v-main>  
          {{ tasks }}
      </v-main>
    </v-app>
</template>

<script>
import Menu from "./views/Menu.vue";
import Appbar from "./views/AppBar.vue";
import { v4 as uuid } from '@lukeed/uuid';

export default {
  components: {
    Menu,
    Appbar
  },
  data(){
    return {
      drawer: null,
      tasks: [],
    } 
  },
  methods: {
    addTask({name, startTime}){
      // ajout de la tâche en local
      this.tasks.unshift({
        id: uuid(),
        name,
        startTime,
        endTime: Date.now()
      });
    }
  }
}
</script>

<style scoped>
  .v-app-bar{
    position: relative!important;
  }
</style>
