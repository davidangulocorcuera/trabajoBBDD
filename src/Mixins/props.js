class Perfil{
  constructor(datos){
    this.name = datos.nombre
    this.edad = datos.edad
    console.log(this.name)
  }
}



export default{
  computed:{
  setPerfil(id,datosPerfil) {
    props_objPerfil = new Perfil(id,datosPerfil)

  }
  },
  data(){
    return {
      //variables globales
      props_blIsLogin: false,
      props_objUser: {},
      props_objPerfil: {}
    }
  },

}
