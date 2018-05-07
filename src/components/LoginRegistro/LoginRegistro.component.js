import firebase from 'firebase'
import {EventBus} from '../../events/events_bus';
export default {
    name: 'login-registro',
    components: {},
    props: [],
    data() {
        return {
            btLoginRegister: true,
            btLoginRegister2: false,
            btLoginRegister3: false,


            lblError: false,
            sRegisterEmail: '',
            sRegisterPassword: '',
            sRegisterPassword2: '',
            sLoginEmail: '',
            sLoginPassword: '',
            sNombre: '',
            blHombre: false,
            blMujer: false,
            edad:0,
            sGustosMusicales: [],

        }
    },
    created: function() {
        //esto se ejecuta antes que todo el programa
        firebase.auth().onAuthStateChanged((user) => {
            this.props_objuser = user
            if (user) {

                this.props_blIsLogin = true
                var docRef = firebase.firestore().collection("perfiles").doc(user.uid + "");
              docRef.get().then(function(doc) {
                if (doc.exists) {
                  //this.props_objPerfil = doc.data()
                  this.setPerfil(doc.id,doc.data())
                  //console.log("Document data:", doc.data());
                } else {
                  // doc.data() will be undefined in this case
                  console.log("NO EXISTE ESE PERFIL");
                }
              }).catch(function(error) {
                console.log("ERROR DESCARGANDO PERFIL", error);
              });

            } else {
                this.props_blIsLogin = false
            }
            EventBus.$emit('loginRegistro_userStateChange',this.props_blIsLogin)
        });
    },
    computed: {},
    mounted() {},
    methods: {

        btnRegistrar1: function(event) {
            this.btLoginRegister2 = true
            this.btLoginRegister = false
        },
        //deben estar todos los campos completos
        btnRegistrar2: function(event) {

            this.btLoginRegister2 = false
            this.btLoginRegister3 = true



        },



        btnCancelar: function(event) {
            this.sRegisterEmail = '',
            this.sRegisterPassword = '',
            this.sRegisterPassword2 = '',
            this.sNombre = '',
            this.btLoginRegister = true
            this.btLoginRegister2 = false

        },
        btnVolver: function(event) {
            this.sRegisterEmail = '',
            this.sRegisterPassword = '',
            this.sRegisterPassword2 = '',
              this.sNombre = '',
            this.btLoginRegister2 = true
            this.btLoginRegister3 = false

        },
        btnRegistrarse: function(event) {
          var that=this
            firebase.auth().createUserWithEmailAndPassword(this.sRegisterEmail, this.sRegisterPassword).then(

                function(user) {
                  var docRef = firebase.firestore().collection("perfiles");
                  user.sendEmailVerification()
                  docRef.doc(user.uid+ "").set({email: that.sRegisterEmail, nombreUsuario: that.sNombre , hombre: that.blHombre , mujer: that.blMujer , /*gustosMusicales: that.gustosMusicales*/ })
                    alert("tu cuenta fue creada");
                    that.btLoginRegister3 = false
                    that.btLoginRegister = true
                    that.sGustosMusicales = []

                },
                function(err) {
                    console.log(err)
                    alert(err);
                    this.btLoginRegister2 = true
                    this.btLoginRegister3 = false

                }
            );
        },
        btnLogin: function(event) {

            firebase.auth().signInWithEmailAndPassword(this.sLoginEmail, this.sLoginPassword).then(
                function(user) {

                    alert("te logeastes correctamente");
                },
                function(err) {
                    console.log(err)
                    alert("NO TE LOGEASTE" + err);
                }
            );
        },
        logout: function(event) {
            firebase.auth().signOut()
        }
    }
}
