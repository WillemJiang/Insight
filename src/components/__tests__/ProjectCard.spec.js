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

import { expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import ProjectCard from '../ProjectCard.vue'


test('ProjectCard.vue', () => {
  const props = {
    name: 'echarts',
    project_info:{  
      logo: "https://apache.org/logos/res/echarts/default.png",
      description: 'a multi-model database that enables graph and relational models built on PostgreSQL'
    }
  }
  const wrapper = mount(ProjectCard,{props: props})
  const logo_image = wrapper.findAll('[class="logo"]')

  expect(logo_image.length).toBe(1)
  expect(wrapper.html()).toContain(logo_image[0].html())
  expect(wrapper.text()).toContain(props.project_info.description)
})

test('ProjectCard.vue', () => {
  const props = {
    name: 'echarts',
    project_info:{  
      description: 'a multi-model database that enables graph and relational models built on PostgreSQL'
    }
  }
  const wrapper = mount(ProjectCard,{props: props})
  const logo_image = wrapper.findAll('[class="logo"]')
  
  expect(logo_image.length).toBe(0)
  expect(wrapper.text()).toContain(props.project_info.description)
})
