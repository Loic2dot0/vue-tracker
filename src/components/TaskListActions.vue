<template>
    <v-btn
        variant="outlined"
        icon="mdi-content-copy"
        size="small"
        @click="copyToClipboard(taskName)"
    >
    </v-btn>
    <v-btn
        variant="flat"
        icon="mdi-restart"
        color="info"
        size="small"
        @click="sendRestart"
    ></v-btn>
    <v-btn
        variant="flat"
        icon="mdi-trash-can"
        color="error"
        size="small"
        @click="sendDelete"
    ></v-btn>
</template>

<script>
    export default {
        name: "TaskListActions",
        emits: ["restart", "delete"],
        props: {
            taskName: {
                type: String,
                default: ""
            },
            taskId: {
                type: String,
                require: true
            }
        },
        data(){
            return {
                info: null,
            } 
        },
        methods: {
            copyToClipboard(text){
                if(!navigator.clipboard){
                    this.info = "Copie impossible ❌";
                    console.error(this.info);
                    return;
                }

                const vm = this;
                navigator.clipboard.writeText(text)
                    .then(
                        function() {
                            vm.info = "Copie ✔️";
                            console.log(vm.info);
                        },
                        function() {
                            vm.info = "Echec copie ❌";
                            console.error(vm.info);
                        });
            },
            sendRestart(){
                this.$emit("restart", this.taskId);
            },
            sendDelete(){
                this.$emit("delete", this.taskId);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .v-btn{
        margin: 2px 5px;
    }
</style>