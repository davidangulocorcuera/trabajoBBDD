import firebase from 'firebase'

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
            sGenero: '',

        }
    },
    created: function() {
        //esto se ejecuta antes que todo el programa
        firebase.auth().onAuthStateChanged((user) => {

            if (user) {

                this.props_blIsLogin = true
            } else {
                this.props_blIsLogin = false
            }
        });
    },
    computed: {},
    mounted() {},
    methods: {
        btnRegistrar1: function(event) {
            this.btLoginRegister2 = true
            this.btLoginRegister = false
        },
        btnRegistrar2: function(event) {

            this.btLoginRegister2 = false
            this.btLoginRegister3 = true



        },



        btnCancelar: function(event) {
            this.btLoginRegister = true
            this.btLoginRegister2 = false
        },
        btnVolver: function(event) {

            this.btLoginRegister2 = true
            this.btLoginRegister3 = false

        },
        btnRegistrarse: function(event) {

            firebase.auth().createUserWithEmailAndPassword(this.sRegisterEmail, this.sRegisterPassword).then(
                function(user) {
                    alert("tu cuenta fue creada");
                    this.btLoginRegister3 = false
                    this.btLoginRegister = true

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
