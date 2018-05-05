import LoginRegistro from '../LoginRegistro'
import chat from '../chat'
import perfil from '../perfil'
import {EventBus} from '../../events/events_bus'

export default {
  name: 'principal',
  components: {'loginregistro':LoginRegistro,'chat':chat,'perfil':perfil},
  props: [],
  data () {
    return {
      blLoggedUser:this.props_blIsLogin
    }
  },
  computed: {

  },
  mounted () {
EventBus.$on('loginRegistro_userStateChange',blestado => {
  this.blLoggedUser= blestado
});
  },
  methods: {


  }
}
