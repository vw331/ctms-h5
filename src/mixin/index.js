
/**
 * 注射器，预留
 */
 export const injection = {
  beforeCreate(){
    console.log('beforecreate')
  },
  beforeRouteEnter(to, from, next){
    //console.log(`to: ${to}`)
    next()
  }
}