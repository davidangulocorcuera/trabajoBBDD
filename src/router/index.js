import Vue from 'vue'
import Router from 'vue-router'
import Principal from '@/components/Principal'
import LoginRegistro from '@/components/LoginRegistro'
import perfil from '@/components/perfil'
import chat from '@/components/chat'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Principal',
      component: Principal
    },

    {
      path: '/login',
      name: 'LoginRegistro',
      component: LoginRegistro
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: perfil
    },
    {
      path: '/chat',
      name: 'chat',
      component: chat
    }
  ]
})
