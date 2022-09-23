import { createRouter, createWebHistory } from 'vue-router'
import GlobalView from '../views/GlobalView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'global',
      component: GlobalView
    },
    {
      path: '/projects',
      name: 'projects',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ProjectsView.vue'),
      children:[
				{
					path:"",
					name:"search",
					component:() => import('../views/projects/SearchView.vue')
				},
			]
    }
  ]
})

export default router
