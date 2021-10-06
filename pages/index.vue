<template>
   <v-container>
    <v-row>
      <v-col cols="3" v-for="category in categories" :key="category.id">
        <app-ui-nav-card :category="category"></app-ui-nav-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>

// import {categorias} from "../graphql/querys"


export default{
  middleware:"initData",
  data(){
    return{
      // query: categorias
      //  categories : [],      
    }
  },
  computed:{
    categories(){
      return this.$store.getters.readCategories;
    }
  },
//fetch ciclo de vida de Nuxt
// async fetch(){
//   //  const client = this.$apollo.getClient();
//    const query = {
//       query:require("../graphql/categories.gql")
//     }
//     // await client.query(query).then(data=>{
//     await this.$apollo.query(query).then(data=>{
//       this.categories = data.data.categories;
//     })
// },

  //ciclo de vida de NUXT
  //asyncData solo se puede usar dentro de la carpeta page. OJO NO EN LAYOUT, NO EN COMPONENT
  // async asyncData(context){
  //   // estos datos los saca del contexto(nuxt.config apollo: {clientConfigs.........})
  //   //está apuntando al endpoint http://localhost:1337/graphql
  //   const client = context.app.apolloProvider.defaultClient

  //   const query = {
  //     query:require("../graphql/categories.gql")
  //   }

  //   let categories = [];

  //   await client.query(query).then(data=>{
  //     console.log(data);
  //     categories = data.data.categories;
  //   })
  //   return {categories}
  // }
  // apollo:{
  //   patata:{
  //     query:categorias,
  //     update: data=>data.categories
  //   }
  // }
};

</script>
