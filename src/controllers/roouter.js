import { createWebHistory, createRouter } from 'vue-router'

import index from '@/screens/index.vue';
import localstorage from '@/screens/localstorage.vue';
import indexdb from '@/screens/indexdb.vue';
import Firebase from '@/screens/firebase.vue';
import Zincronisacion from '@/screens/zincronisacion.vue';

const routes = [
  { path: '/', component: index },
  { path: '/localstorage',name:'localstorage', component: localstorage },
  { path: '/indexdb',name:'indexdb',component:indexdb },
  { path: '/firebase',name:'indexdb',component:Firebase },
  { path: '/zindata',name:'indexdb',component:Zincronisacion }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;