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
                <v-text-field label="Nom de votre tâche" hide-details="auto" v-model="taskname"></v-text-field>
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
                    @click="stopTask()"
                ></v-btn>
                <span class="currentDuration">{{ currentDuration }}</span>
            </v-col>
        </v-row>
    </v-container>  
</template>

<script>
    export default {
        emits:['toggleMenu', 'newTask'],
        name: "AppBar",
        data(){
            return {
                taskname: '',
                isTaskInProgress: false,
                errorMsg: null,
                startTime: null,
                nowTime: null,
            } 
        },
        computed:{
            currentDuration(){
                if(this.startTime && this.nowTime){
                    return this.durationBetweenTimestamps(this.startTime, this.nowTime);
                } else {
                    return '00:00:00';
                }
            }
        },
        watch:{
            isTaskInProgress(isInprogress){
                if(isInprogress){
                    this.interval = setInterval(() => {
                        this.nowTime = Date.now();
                    }, 1000);
                } else {
                    clearInterval(this.interval);
                }
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
                this.startTime = Date.now();
                this.nowTime = Date.now();
            },
            stopTask(){
                // vérifications
                if(!this.isTaskInProgress){
                    this.errorMsg = 'Aucune tâche n\'est en cours.';
                    console.error(this.errorMsg);
                    return;
                } 

                // Envoie de la tâche
                this.$emit('newTask', {
                    name : this.taskname, 
                    startTime: this.startTime
                });

                // arrêt de la tâche
                this.isTaskInProgress = false;
                this.errorMsg = null;
                this.taskname = '';
                this.startTime = null;
                this.nowTime = null;
            },
            durationBetweenTimestamps(start, end){
                let seconds = Math.floor((end / 1000) - (start / 1000));
                let minutes = Math.floor(seconds / 60);
                let hours = Math.floor(minutes / 60);
                seconds = seconds % 60;
                minutes= minutes % 60;                
                return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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