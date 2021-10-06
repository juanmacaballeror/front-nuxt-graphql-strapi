<template>
  <v-container>
    <h1 class="secondary--text">
      Recetas favoritas
      <v-icon large class="secondary--text">mdi-heart</v-icon>
    </h1>
    <p class="secondary--text">Tus recetas favoritas</p>
    <v-row>
      <v-col cols="4" v-for="favorite in favorites" :key="favorite.id">
        <app-ui-nav-card-recipe :recipe="favorite"></app-ui-nav-card-recipe>
      </v-col>
    </v-row>
    <div class="mt-3">
      <v-alert type="info" v-if="favorites.length == 0">
        <p>No tienes recetas favoritas</p>
      </v-alert>
    </div>
    <div class="mt-3">
      <app-ui-back-btn></app-ui-back-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  middleware: "auth",
  async asyncData({ app, store }) {
    let client = app.apolloProvider.defaultClient;
    let id = app.$auth.user.id;
    let query = {
      context: {
        headers: {
          authorization: app.$auth.strategy.token.get(),
        },
      },
      query: require("../../graphql/userFavorites.gql"),
      fetchPolicy: "no-cache",
      variables: { id },
    };
    let favorites = null;
    await client
      .query(query)
      .then((data) => {
        favorites = data.data.user.favorites;
        store.commit("user/setFavorites", favorites)
      })
      .catch((e) => console.log(e));
    return { favorites };
  },
};
</script>