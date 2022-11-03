/* 
 *    Copyright 2022 Insight authors
 *   
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *  
 *        http://www.apache.org/licenses/LICENSE-2.0
 *  
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

import { createRouter, createWebHashHistory} from 'vue-router'
import GlobalView from '../views/GlobalView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
				{
					path:"detail",
					name:"Detail",
					component:() => import('../views/projects/ProjectDetail.vue'),
          children:[{
            path:"project",
            component:() => import('../views/projects/ChartTemplates/SingleProjectTemplate.vue'),
          },{
            path:"compare",
            component:() => import('../views/projects/ChartTemplates/MultiProjectTemplates.vue'),
          }]
				},
			]
    }
  ]
})

export default router
