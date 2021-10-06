//recibe el contexto de nuxt

export default function({store}){
  console.log('Hola soy un middleware');
  if(store.state.categories.length === 0){
    store.dispatch('nuxtServerInit')
  }
}