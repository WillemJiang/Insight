<script setup>
import { inject, onMounted, ref, watch } from 'vue';
import {  useRoute } from 'vue-router';
import PMCGrowth from '../../../assets/js/PMCGrowth';  

const props = defineProps({
  'isExpand':Boolean
})

const route = useRoute()
const projectsList = inject('committee')['committees']

const project_name = ref(route.query.project)
const project_info = ref(projectsList[project_name.value])
const logo = ref(project_info.value && project_info.value.logo ? project_info.value.logo : null)
const PMCChart = ref(null)

const drawPMCGrowth = function(){
  const dom = document.getElementById('PMC-MEMBER-GROWTH')
  PMCChart.value = PMCGrowth(dom)
  window.onresize = () => {
    PMCChart.value.resize()
  }
}

onMounted(() => {
  drawPMCGrowth()
})

watch(
  () => props.isExpand,
  () => {
    let timer = setInterval(()=>{
      PMCChart.value.resize()
    }, 10)
    setTimeout(()=>{
      clearInterval(timer)
    },300)
  }
);

const updateData = function(name){
  project_info.value = projectsList[name]
  logo.value = project_info.value && project_info.value.logo ? project_info.value.logo : null
}

watch(() => route.query.project,(newValue)=> {
  project_name.value = newValue
  updateData(newValue)
},{ immediate: true })

</script>

<template>
  <main>
    <div class="project-info-box">
      <div class="head-box">
        <div v-if="logo"  class="logo-box">
          <img :src="logo" :alt="name" class="logo">
        </div>
        <div class="project-description">
          {{project_info.description}}
        </div>
      </div>
      <div class="charts-box">
        <!-- PMC MEMBER GROWTH -->
        <div id="PMC-MEMBER-GROWTH" class="graph">
          
        </div>
        <!-- issue open -->
        <div id="ISSUE-OPEN" class="graph">
          
        </div>
        <!-- pr -->
        <div id="PR" class="graph">
          
        </div>
      </div>
    </div>
  </main>
</template>

<style>
.project-info-box{
  width: 100%;
}
.head-box, .charts-box{
  border: 1px solid rgb(180, 180, 180);
  border-radius: 5px;
  padding: 2rem;

}
.head-box{
  width:100%;
  margin-bottom: 1rem;
}
.head-box .logo-box{
  height: 5rem;
  width: 15rem;
}
.head-box .logo-box .logo{
  max-width: 100%;
  max-height: 100%;
  position: absolute;
}
.graph{
  min-height: 30rem;
  min-width: 5rem;
  border: 1px solid pink;
  margin-bottom: 1rem;
}
</style>
