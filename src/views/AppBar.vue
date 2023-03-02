<template>
    <v-container>
        <v-row>
            <v-col cols="12" class="head-bar">
                <v-app-bar-nav-icon @click="sendToggleMenu()" ></v-app-bar-nav-icon>
                <v-app-bar-title>Vue Tracker</v-app-bar-title>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="9">
                <v-text-field label="Nom de votre tâche" :rules="rules" hide-details="auto" v-model="taskname"></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" class="container-btnTimer">
                <v-btn
                    v-if="!isTaskInProgress"
                    variant="flat"
                    icon="mdi-restart"
                    color="info"
                    @click="startTask()"
                ></v-btn>
                <v-btn
                    v-else
                    variant="flat"
                    icon="mdi-stop"
                    color="error"
                ></v-btn>
                <span class="currentDuration">00:00:00</span>
            </v-col>
        </v-row>
    </v-container>  
</template>

<script>
    export default {
        emits:['toggleMenu'],
        name: "AppBar",
        data(){
            return {
                rules: [value => !!value || 'Required.'],
                taskname: '',
                isTaskInProgress: false,
                errorMsg: null,
                startTime: null,
                nowTime: null,
            } 
        },
        methods: {
            sendToggleMenu(){
                this.$emit('toggleMenu');
            },
            startTask(){
                // vérifications
                if(this.taskname.length == 0){
                    this.errorMsg = 'Le nom de la tâche ne peut être vide.';
                    console.error(this.errorMsg);
                    return;
                } else if(this.isTaskInProgress){
                    this.errorMsg = 'Une tâche est déjà en cours.';
                    console.error(this.errorMsg);
                    return;
                } else {
                    this.errorMsg = null;
                }
                // lancement de la tâche
                this.isTaskInProgress = true;
            },
            stopTask(){
                // vérifications
                if(!this.isTaskInProgress){
                    this.errorMsg = 'Aucune tâche n\'est en cours.';
                    console.error(this.errorMsg);
                    return;
                } 

                // Envoie de la tâche
                this$emit('newTask', {
                    name : this.taskname, 
                    startTime: this.startTime
                });

                // arrêt de la tâche
                this.isTaskInProgress = false;
                this.errorMsg = null;
                this.taskname = '';
            }
        }
    }
</script>

<style lang="scss" scoped>
    .v-container{
        padding: 5px;
        margin: 0;
    }
    .head-bar{
        display: flex;
        align-items: center;
    }
    .container-btnTimer{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>