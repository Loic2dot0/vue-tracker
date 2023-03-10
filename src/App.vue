<template>
    <v-app>
      <v-navigation-drawer v-model="drawer">
        <Menu></Menu>
      </v-navigation-drawer>

      <v-app-bar :elevation="2" height="auto">
          <Appbar
            ref="appbar" 
            @toggleMenu="drawer = !drawer"
            @newTask="addTask($event)"
            @notification="displayNotification($event)"
          ></Appbar>
      </v-app-bar>

      <v-main>
          <TaskList
            :tasks="tasks"
            :loading="loading"
            v-on="{
              restart: sendRestartTask,
              delete: deleteTask,
            }"          
          ></TaskList>
      </v-main>

      <v-snackbar v-model="isNotification" timeout="2500" :color="error.color" location="top right">
        <div class="text-subtitle-1 pb-2">{{ error.title}}</div>
        <p>{{ error.message }}</p>
        <template v-slot:actions>
            <v-btn
                variant="text"
                @click="isNotification = false"
            >X</v-btn>
        </template>
    </v-snackbar>
    </v-app>
</template>

<script>
import { v4 as uuid } from '@lukeed/uuid';
import * as TaskService from './services/TaskService.js';

import Menu from "./views/Menu.vue";
import Appbar from "./views/AppBar.vue";
import TaskList from "./views/TaskList.vue";

export default {
  components: {
    Menu,
    Appbar,
    TaskList
  },
  data(){
    return {
      drawer: null,
      loading: false,
      tasks: [],
      isNotification: false,
      error:{
        title: null,
        message: null,
        color: null
      }
    } 
  },
  watch:{
    tasks:{
      // Mise à jour des tâches dans l'API
      deep: true, // détecte les changements dans les sous-objets
      async handler(newVal, oldVal){
        if(newVal != null && oldVal != null){
          try{
            await TaskService.updateAllTasks(this.tasks);
          }
          catch (error){
            console.error(error);
            this.displayNotification({
              title: 'Mode hors-ligne',
              message: 'Synchronisation des tâches impossible.',
              color: 'warning'
            });
          }
        }
      }
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
    deleteTask(taskId){
      // Récupération de l'id de la tache à supprimer
      let taskIndex = null;
      this.tasks.forEach((task, index) => {
        if(task.id === taskId){
          taskIndex = index;
        }
      });
      // Suppression de la tâche en local
      this.tasks.splice(taskIndex, 1);
    },
    sendRestartTask(taskId){
      // Récupération du nom de la tache à relancer
      let newTaskname = null;
      this.tasks.forEach(task => {
        if(task.id === taskId){
          newTaskname = task.name;
        }
      });
      // Relancement de la tâche
      // $refs pour passer par le composant Appbar pour pouvoir utiliser la fonction restartTask)
      this.$refs.appbar.restartTask(newTaskname);
    },
    displayNotification({title, message, color}){
      this.error = {
        title,
        message,
        color
      }
      this.isNotification = true;
    }
  },
  async created(){
    this.loading = true;
    // Récupération des tâches enregistrées
    try {
      this.tasks = await TaskService.getAllTasks();
    }
    catch (error){
      console.error(error);
      this.displayNotification({
        title: 'Mode hors-ligne',
        message: 'Synchronisation des tâches impossible.',
        color: 'warning'
      });
    }
    this.loading = false;
  }
}
</script>

<style scoped>
  .v-app-bar{
    position: relative!important;
  }
</style>
