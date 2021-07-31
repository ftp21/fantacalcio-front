import Vue from 'vue'
import VueRouter from 'vue-router'
import Rose from '../views/Rose'
import Home from '../views/Home'
import Svincolati from '../views/Svincolati'
import Impostazioni from '../views/Impostazioni'
import GestioneSquadre from '../views/GestioneSquadre'
import Public from "@/views/Public";

Vue.use(VueRouter)

const routes = [

  {
    path: '/manage/index',
    name: 'Home',
    component: Home,
  },
  {
    path: '/manage/rose',
    name: 'Rose',
    component: Rose
    
  },
  {
    path: '/manage/svincolati',
    name: 'Svincolati',
    component: Svincolati
    
  },
  {
    path: '/manage/impostazioni',
    name: 'Impostazioni',
    component: Impostazioni
    
  },
  {
    path: '/manage/squadre',
    name: 'GestioneSquadre',
    component: GestioneSquadre
  },
  {
    path: '/',
    name: 'Public',
    component: Public
  },
  {
    path: '/:notFound(.*)',
    redirect: '/'
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
