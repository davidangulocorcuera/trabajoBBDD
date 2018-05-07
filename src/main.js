// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import props from './Mixins/props'
import firestore from 'firebase/firestore'
import Chat from 'vue-beautiful-chat'


Vue.config.productionTip = false

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyARizM8fhUXZq2eLWqrgSsO9XijQzdFjiE',
  authDomain: 'proyectobbdd-2c4de.firebaseapp.com',
  databaseURL: 'https://proyectobbdd-2c4de.firebaseio.com',
  projectId: 'proyectobbdd-2c4de',
  storageBucket: 'proyectobbdd-2c4de.appspot.com',
  messagingSenderId: '524444401805'
};
firebase.initializeApp(config);
Vue.use(firebase)
Vue.use(firestore)
Vue.mixin(props);
Vue.use(Chat);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
