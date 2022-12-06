import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Empty from '../views/Empty.vue'
import Floor from '../views/Floor.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Empty',
    component: Empty
  },
  {
    path: '/floor/:id',
    name: 'FloorView',
    component: Floor
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
