import firebase from 'firebase'
import {
  EventBus
} from '../../events/events_bus';

export default {
  name: 'login-registro',
  components: {},
  props: [],
  data() {
    return {
      btLoginRegister: true,
      btLoginRegister2: false,
      btLoginRegister3: false,
      numeros: "0123456789",
      iEdad: 0,
      lblError: false,
      lblError2: false,
      lblError3: false,
      sRegisterEmail: '',
      sRegisterPassword: '',
      sRegisterPassword2: '',
      sLoginEmail: '',
      sLoginPassword: '',
      sNombre: '',
      sGenero: '',
      edad: 0,
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
            this.setPerfil(doc.id, doc.data())
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
      EventBus.$emit('loginRegistro_userStateChange', this.props_blIsLogin)
    });
  },
  computed: {},
  mounted() {},
  methods: {

    btnRegistrar1: function(event) {

      this.btLoginRegister2 = true
      this.btLoginRegister = false

    },
    inicioGoogle: function(event) {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });


    },
   inicioFacebook: function(event) {
     var provider = new firebase.auth.FacebookAuthProvider();
     firebase.auth().signInWithPopup(provider).then(function(result) {
       // This gives you a Facebook Access Token. You can use it to access the Facebook API.
       var token = result.credential.accessToken;
       // The signed-in user info.
       var user = result.user;
       // ...
     }).catch(function(error) {
       // Handle Errors here.
       var errorCode = error.code;
       var errorMessage = error.message;
       // The email of the user's account used.
       var email = error.email;
       // The firebase.auth.AuthCredential type that was used.
       var credential = error.credential;
       // ...
     });


    },



    //deben estar todos los campos completos
    btnRegistrar2: function(event) {
      if (this.sRegisterEmail && this.sRegisterPassword && this.sRegisterPassword2 && this.sNombre && this.sRegisterPassword == this.sRegisterPassword2 && this.sRegisterPassword.length >= 6 && this.iEdad > 0) {
        this.btLoginRegister2 = false
        this.btLoginRegister3 = true
      }

      if(!(this.sRegisterEmail && this.sRegisterPassword && this.sRegisterPassword2 && this.sNombre)){
        this.lblError3 = true
      }

      else {
        this.lblError3 = false
        if (this.sRegisterPassword.length > 6) {
          this.lblError2 = false

        } else if (this.sRegisterPassword.length < 6) {
          this.lblError2 = true

        }


        if (this.sRegisterPassword == this.sRegisterPassword2) {

          this.lblError = false
        } else if (this.sRegisterPassword != this.sRegisterPassword2) {
          this.lblError = true
          this.sRegisterPassword = ""
          this.sRegisterPassword2 = ""

        }


      }

    },



    btnCancelar: function(event) {

      this.sRegisterPassword = '',
        this.sRegisterPassword2 = '',

        this.btLoginRegister = true
      this.btLoginRegister2 = false

    },
    btnVolver: function(event) {

      this.sRegisterPassword = '',
        this.sRegisterPassword2 = '',

        this.btLoginRegister2 = true
      this.btLoginRegister3 = false

    },
    btnRegistrarse: function(event) {
      var that = this
      firebase.auth().createUserWithEmailAndPassword(this.sRegisterEmail, this.sRegisterPassword).then(

        function(user) {
          var docRef = firebase.firestore().collection("perfiles");
          user.sendEmailVerification()
          docRef.doc(user.uid + "").set({
            email: that.sRegisterEmail,
            nombreUsuario: that.sNombre,
            genero: that.sGenero,
            edad: that.iEdad
            /*gustosMusicales: that.gustosMusicales*/
          })
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
      var provider = new firebase.auth.GoogleAuthProvider();
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
