import {EventBus} from '../../events/events_bus';
import firebase from 'firebase'
export default {
  name: 'perfil',
  components: {},
  props: [],
  data () {
    return {

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

      firebase.firestore().collection("perfiles").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
});
    }
  }
}
