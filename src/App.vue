<template>
    <v-app>
      <v-navigation-drawer v-model="drawer">
        <Menu></Menu>
      </v-navigation-drawer>

      <v-app-bar :elevation="2" height="auto">
          <Appbar @toggleMenu="drawer = !drawer" @newTask="addTask($event)"></Appbar>
      </v-app-bar>

      <v-main>
          <TaskList
            :tasks="tasks"
            v-on="{
              restart: restartTask,
              delete: deleteTask,
            }"          
          ></TaskList>
      </v-main>
    </v-app>
</template>

<script>
import Menu from "./views/Menu.vue";
import Appbar from "./views/AppBar.vue";
import TaskList from "./views/TaskList.vue";
import { v4 as uuid } from '@lukeed/uuid';

export default {
  components: {
    Menu,
    Appbar,
    TaskList
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
    },
    deleteTask(id){
      let taskIndex = null;
      this.tasks.forEach((task, index) => {
        if(task.id === id){
          taskIndex = index;
        }
      });
      this.tasks.splice(taskIndex, 1);
    },
  }
}
</script>

<style scoped>
  .v-app-bar{
    position: relative!important;
  }
</style>
