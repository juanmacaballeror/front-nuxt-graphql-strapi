export const strict = false

export const state = () => ({
    counter: 0,
    categories:[],
    loadedRecipes:[]
})


export const getters = {
    readCategories(state){
        return state.categories
    },
    readLoadedRecipes(state){
        return state.loadedRecipes
    },
    readCounter(state) {
        return state.counter
    }
}

export const mutations = {
    addCategories(state, payload){
        state.categories = payload
    },
    addLoadedRecipes(state, payload){
        state.loadedRecipes = payload
    },
    increment(state) {
        state.counter++
    }
}

export const actions = {
    //nuxtServerInit es la primera funcion que se ejecuta en el ciclo de vida de nuxt
    //con esta funcion estamos inicializando los datos desde la $store
    //OJO, solo se puede ejecutar desde el $store.

    // ojo se puede usar nuxtServerInit, retornando una promesa o con el uso de asyn/await
    async nuxtServerInit({commit}) {
      console.log("Hola nuxt server")
       // return new Promise((resolve, reject) => {
            const client = this.app.apolloProvider.defaultClient
            const query = {
                query: require("../graphql/categories.gql")
            }

            await client.query(query).then(data => {
                commit('addCategories', data.data.categories)
                //commit('addLoadedRecipes', data.data.recipes)
               // resolve()
            }).catch(error => {
                console.log(error)
               // reject()
            })
       // })
    },
    searchRecipe({commit}, payload){
        let client = this.app.apolloProvider.defaultClient
        const query = {
            query:require('../graphql/searchRecipe.gql'),
            variables:{term:payload}
        }
        client.query(query).then(data => {
            console.log(data)
            commit('addLoadedRecipes', data.data.recipes)
        }).catch(e => console.log(e))
    },
    increment(context){
      setTimeout(() => {
        context.commit("increment")
      }, 1000);
    }
}

