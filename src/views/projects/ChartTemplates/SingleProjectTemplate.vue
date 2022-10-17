<script setup>
import { inject, onMounted, ref, watch } from 'vue';
import {  useRoute } from 'vue-router';
import PMCGrowth from '../../../assets/js/PMCGrowth';  
import issue from '../../../assets/js/issue'
import pr from '../../../assets/js/pr'
import comment from '../../../assets/js/comment'
import participant from '../../../assets/js/participant'




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
  PMCChart.value = PMCGrowth(dom, inject('committee')['committee_detail'][project_name.value])
}

const issueChart = ref(null)
const drawIssue = function(){
  const dom = document.getElementById('ISSUE-OPEN')
  issueChart.value = issue(dom, project_info.value['repo']['oi'])
}

const prChart = ref(null)
const drawPr = function(){
  const dom = document.getElementById('PR')
  prChart.value = pr(dom, [{name:'open pull',data:project_info.value['repo']['op']},{name:'merge pull',data:project_info.value['repo']['pm']}])
}

const commentChart = ref(null)
const drawComment = function(){
  const dom = document.getElementById('COMMENT')
  commentChart.value = comment(dom, [{name:'issue comment',data:project_info.value['repo']['ic']},{name:'review comment',data:project_info.value['repo']['rc']}])
}

const participantChart = ref(null)
const drawParticipant = function(){
  const dom = document.getElementById('PARTICIPANT')
  participantChart.value = participant(dom, project_info.value['repo']['p'])

}
console.log(project_info.value);

onMounted(() => {
  drawPMCGrowth()
  drawIssue()
  drawPr()
  drawParticipant()
  drawComment()

})

watch(
  () => props.isExpand,
  () => {
    let timer = setInterval(()=>{
      PMCChart.value.resize()
      issueChart.value.resize()
    }, 10)
    setTimeout(()=>{
      clearInterval(timer)
    },300)
  }
);

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
        <!-- comment -->
        <div id="COMMENT" class="graph">

        </div>
        <!-- pr -->
        <div id="PR" class="graph">
          
        </div>
        <!-- participants count -->
        <div id="PARTICIPANT" class="graph">
          
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
  margin-bottom: 1rem;
}
</style>
