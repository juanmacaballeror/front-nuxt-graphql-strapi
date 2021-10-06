<template>
    <v-container>
        <h2>Agregar nueva receta</h2>
        <v-divider class="my-5"></v-divider>
        <app-forms-recipe></app-forms-recipe>
        

    </v-container>
</template>

<script>
export default {
    middleware:'auth',
}
</script>