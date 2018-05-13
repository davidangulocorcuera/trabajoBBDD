import {EventBus} from '../../events/events_bus';
import firebase from 'firebase'
import chat from '../chat'

class Perfil{
  constructor(datos){
  this.name = datos.nombreUsuario
    this.email = datos.email
  this.edad = datos.edad
    this.genero = datos.genero
    this.edad = datos.edad
  console.log(this.name)
  }
}

export default {
  name: 'perfil',
  components: {'chat':chat},
  props: [],
  data () {
    return {
      perfiles : []
    }
  },
  created: function() {

  },
  computed: {

  },
  mounted () {
    EventBus.$on('loginRegistro_userStateChange',blestado => {
      //this.blLoggedUser= blestado

      if(blestado){

        this.descargarPerfiles()
      }

    });
  },
  methods: {
    descargarPerfiles: function(){
      var that=this

      firebase.firestore().collection("perfiles").onSnapshot(function(querySnapshot) {
        that.perfiles = []
      querySnapshot.forEach(function(doc) {
      that.perfiles.push(new Perfil(doc.data()))
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
    });
});
    }
  }
}
