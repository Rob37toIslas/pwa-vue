import { createWebHistory, createRouter } from 'vue-router'

import index from '@/screens/index.vue';
import localstorage from '@/screens/localstorage.vue';
import indexdb from '@/screens/indexdb.vue';

const routes = [
  { path: '/', component: index },
  { path: '/localstorage',name:'localstorage', component: localstorage },
  { path: '/indexdb',name:'indexdb',component:indexdb }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;