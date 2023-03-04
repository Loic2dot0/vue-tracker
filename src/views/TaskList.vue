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
                <td>{{ task.startTime }} - {{ task.endTime }}</td>
                <td>00:00:00</td>
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
        }
    }
</script>

<style lang="scss" scoped>

</style>