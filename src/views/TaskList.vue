<template>
    <v-table>
        <thead>
            <tr>
                <th class="text-left">
                    Tâche
                </th>
                <th class="text-left">
                    Début - fin
                </th>
                <th class="text-left">
                    Durée
                </th>
                <th class="text-left">
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
                <td>{{ formatTimestamp(task.startTime) }} - {{ formatTimestamp(task.endTime) }}</td>
                <td>{{ durationBetweenTimestamps(task.startTime, task.endTime)}}</td>
                <td>action button</td>
            </tr>
        </tbody>
    </v-table>
</template>

<script>
    export default {
        name: "TaskList",
        props: {
            tasks: {
                type: Array,
                default: []
            }
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
            }         
        }
    }
</script>

<style lang="scss" scoped>

</style>