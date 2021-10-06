<template>
    <v-container>
        <h2>Editar receta</h2>
        <v-divider class="my-5"></v-divider>
        <div v-if="recipe">
            <app-forms-recipe :recipe="recipe"></app-forms-recipe>
        </div>
        
        

    </v-container>
</template>

<script>
export default {
    middleware:'auth',
    async asyncData({app, route}){
        const client = app.apolloProvider.defaultClient
        const id = route.params.id
        const query = {
            query:require("../../../graphql/recipe.gql"),
            variables:{id}
        }
        let recipe = null
        await client.query(query).then(data =>{
            recipe = data.data.recipe
        })
        return {recipe}
    }
}
</script>