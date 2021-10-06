<template>
    <v-container>
        <h2>Bienvenido {{$auth.user.username}}</h2>
        <v-divider class="my-5"></v-divider>
        <h3>Lista de recetas</h3>
        <v-btn color="primary" small class="my-3" to="user/newRecipe">Agregar receta</v-btn>
        
        <div v-if="recipes">
           <app-ui-list-recipes :recipes="recipes"></app-ui-list-recipes>
        </div>
        <div v-else>Cargando...</div>
    </v-container>
</template>

<script>
export default {
    middleware:'auth',
    async asyncData({app}){
        let client = app.apolloProvider.defaultClient
        let id = app.$auth.user.id
        let query = {
            query:require("../../graphql/userRecipes.gql"),
            variables:{id},
           /// fetchPolicy:'no-cache' ,//con esto no cachea las peticiones y siempre va a la bbdd para traer los datos
        }
        let recipes = null
        await client.query(query).then(data => {
            recipes = data.data.recipes
        })
        return {recipes}
    }
}
</script>