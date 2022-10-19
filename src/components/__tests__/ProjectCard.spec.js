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
