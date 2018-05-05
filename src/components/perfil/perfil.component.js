import {EventBus} from '../../events/events_bus';
import firebase from 'firebase'

class Perfil{
  constructor(datos){
  this.name = datos.nombre
  this.edad = datos.edad
  console.log(this.name)
  }
}

export default {
  name: 'perfil',
  components: {},
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
      that.perfiles = []
      firebase.firestore().collection("perfiles").onSnapshot(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
      that.perfiles.push(new Perfil(doc.data()))
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
    });
});
    }
  }
}
