<script setup>
import { inject, onMounted, ref, watch} from 'vue';
import {  useRoute } from 'vue-router';
import bar from '../../../assets/js/bar'
import getSeries  from '../../../assets/js/getSeries'

const props = defineProps({
  'isExpand':Boolean
})

const show = ({domId, chart, fun, config, title}) => {
  const dom = document.getElementById(domId);
  dom.removeAttribute("_echarts_instance_");
  chart = fun(title, dom, config, chart);
  return chart
}

const route = useRoute()
const projectsList = inject('committee')['committees']

const project_name = route.query.main
const project_info = projectsList[project_name]
const logo = ref(project_info&& project_info.logo ? project_info.logo : null)

let PMCChart = null
const drawPMCGrowth = function(){
  show({
    domId: 'PMC-MEMBER-GROWTH',
    title: 'PMC MEMBER GROWTH',
    chart: PMCChart, 
    fun: bar, 
    config:getSeries.numToDate([{
        name:'pmc',
        data:inject('committee')[project_name]['PMC']
    }])
  })
}

let issueChart = null
const drawIssue = function(){
  show({
    domId: 'ISSUE-OPEN',
    title:'ISSUE-OPEN',
    chart: issueChart, 
    fun: bar, 
    config:getSeries.numToDate([{
      name:'issue open',
      data:project_info['repo']['oi']
    }])
  })
}

let prChart = null
const drawPr = function(){
  show({
      domId: 'PR',
      title:'PR',
      chart: prChart, 
      fun: bar, 
      config:getSeries.numToDate([{
        name:'open pull',
        data:project_info['repo']['op']
      },{
        name:'merge pull',
        data:project_info['repo']['pm']
      }])
  })
}

let commentChart = null
const drawComment = function(){
  show({
      domId: 'COMMENT',
      title:'COMMENTS',
      chart: commentChart, 
      fun: bar, 
      config:getSeries.numToDate([{
        name:'issue comment',
        data:project_info['repo']['ic']
      },{
        name:'review comment',
        data:project_info['repo']['rc']
      }])
  })
}

let participantChart = null
const drawParticipant = function(){
  show({
      domId: 'PARTICIPANT',
      title:'PARTICIPANT',
      chart: participantChart, 
      fun: bar, 
      config:getSeries.numToDate([{
        name:'issue comment',
        data:project_info['repo']['p']
      }])
  })
}

onMounted(() => {
  drawIssue()
  drawPr()
  drawParticipant()
  drawComment()

})

watch(
  () => props.isExpand,
  () => {
    let timer = setInterval(()=>{
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
          <img :src="logo" :alt="name" class="logo" >
        </div>
        <div class="project-description">
          {{project_info.description}}
        </div>
      </div>
      <div class="charts-box">
        <!-- PMC MEMBER GROWTH -->
        <!-- <div id="PMC-MEMBER-GROWTH" class="graph" >
          
        </div> -->
        <!-- participants count -->
        <div id="PARTICIPANT" class="graph">
          
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

      </div>
    </div>
  </main>
</template>

<style scoped>
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
