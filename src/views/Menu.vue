<template>
    <v-list>
        <v-list-subheader>Menu</v-list-subheader>
        <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :value="item"
            active-color="primary"
            :disabled="item.disabled"
        >
            <template v-slot:prepend>
                <v-icon :icon="item.icon"></v-icon>
            </template>
            <v-list-item-title v-text="item.text"></v-list-item-title>
      </v-list-item>
    </v-list>
</template>

<script>
export default {
    name: "Menu",
    data(){
        return{
            selectedItem: 1,
            items: [
                { text: "Tracker", icon: "mdi-timer-star-outline", disabled: false },
                { text: "Catégories", icon: "mdi-folder-open-outline", disabled: true },
                { text: "Paramètres", icon: "mdi-cog-outline", disabled: true }
            ]
        }
    }
}

</script>

<style lang="scss" scoped>
    .v-list-subheader{
        font-size: 1.2rem;
        font-weight: bold;
    }
</style>