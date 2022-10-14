<script setup>
import { inject, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import PMCGrowth from '../../../assets/js/PMCGrowth'  

const route = useRoute()
const project_name = route.query.project
const project_info = inject('committee')['committees'][project_name]
const logo = project_info && project_info.logo ? project_info.logo : null

const drawPMCGrowth = function(){
  const dom = document.getElementById('PMC-MEMBER-GROWTH')
  const PMCChart = PMCGrowth(dom)
  window.onresize = () => {
    PMCChart.resize()
  }
}

onMounted(() => {
  drawPMCGrowth()
})

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
        <div id="ISSUE-OPEN" class="graph">
          
        </div>
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
