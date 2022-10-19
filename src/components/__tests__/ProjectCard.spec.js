import { expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import ProjectCard from '../ProjectCard.vue'


test('ProjectCard.vue', () => {
  const props = {
    name: 'echarts',
    project_info:{  
      logo: "https://apache.org/logos/res/age/default.png",
      description: 'a multi-model database that enables graph and relational models built on PostgreSQL'
    }
  }
  const wrapper = mount(ProjectCard,{props: props})
  expect(wrapper.text()).toContain(props.project_info.description)
})
