import firebase from 'firebase'

export default {
  name: 'login-registro',
  components: {},
  props: [],
  data () {
    return {
    btLoginRegister : true,
    sRegisterEmail: ' ',
    sRegisterPassword: ' ',
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    btnRegistrar1: function (event){
      this.btLoginRegister = false
    },
    btnCancelar: function (event){
      this.btLoginRegister = true
    },
  btnRegistrarse: function (event){
      firebase.auth().createUserWithEmailAndPassword(this.sRegisterEmail,this.sRegisterPassword).then(
        function(user){
          alert("tu cuenta fue creada");
        },
        function(err){
          console.log(err)
          alert("error en la creacion de cuenta");
        }
      );


    }
  }
}
