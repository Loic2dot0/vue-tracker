<template>
    <div class="tasklist-loader" v-if="loading">
        <v-progress-circular
            indeterminate
            color="info"
        ></v-progress-circular>
        <p>Chargement des tâches...</p>
    </div>
    <div class="tasklist-empty" v-else-if="tasks.length == 0">
        <p>Aucune tâche</p>
    </div>    
    <v-table v-else>
        <thead>
            <tr>
                <th class="text-left">
                    Tâche
                </th>
                <th class="text-center">
                    Heure Début / Fin
                </th>
                <th class="text-center">
                    Durée
                </th>
                <th class="text-center">
                    Actions
                </th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="task in tasks"
                :key="task.id"
            >
                <td>{{ task.name }}</td>
                <td class="text-center">{{ formatTimestamp(task.startTime) }} - {{ formatTimestamp(task.endTime) }}</td>
                <td class="text-center">{{ durationBetweenTimestamps(task.startTime, task.endTime)}}</td>
                <td class="text-center tasklistactions">
                    <TaskListActions 
                        :taskName="task.name"
                        :taskId="task.id"
                        v-on="{
                            restart: sendRestart, 
                            delete: sendDelete,
                        }"
                    ></TaskListActions>
                </td>
            </tr>
        </tbody>
    </v-table>
</template>

<script>
    import TaskListActions from "../components/TaskListActions.vue";

    export default {
        name: "TaskList",
        emits: ["restart", "delete"],
        props: {
            tasks: {
                type: Array,
                default: []
            },
            loading: {
                type: Boolean,
                default: true
            }
        },
        components: {
            TaskListActions
        },
        data(){
            return {
         
            } 
        },
        methods: {
            formatTimestamp(timestamp){
                return new Intl.DateTimeFormat('fr-FR', { 
                    hour: '2-digit',
                    minute: '2-digit'
                }).format(timestamp);
            },
            durationBetweenTimestamps(start, end){
                let seconds = Math.floor((end / 1000) - (start / 1000));
                let minutes = Math.floor(seconds / 60);
                let hours = Math.floor(minutes / 60);
                seconds = seconds % 60;
                minutes= minutes % 60;                
                return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            },
            sendRestart(id){
                this.$emit("restart", id);
            },
            sendDelete(id){
                this.$emit("delete", id);
            }         
        }
    }
</script>

<style lang="scss" scoped>
    .tasklist-loader, .tasklist-empty{
        padding-top: 50px;
        text-align: center;

        .v-progress-circular{
            margin-bottom: 10px;
        }
    }
</style>