<template>
    <v-app>
      <v-navigation-drawer v-model="drawer">
        <Menu></Menu>
      </v-navigation-drawer>

      <v-app-bar :elevation="2" height="auto">
          <Appbar @toggleMenu="drawer = !drawer" @newTask="addTask($event)"></Appbar>
      </v-app-bar>

      <v-main>
        <!-- -->
      </v-main>
    </v-app>
</template>

<script>
import Menu from "./views/Menu.vue";
import Appbar from "./views/AppBar.vue";

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
      this.tasks.push({name, startTime});
      console.log(this.tasks)
    }
  }
}
</script>

<style scoped>

</style>
