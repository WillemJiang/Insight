<script setup>
import { inject, onMounted, watch} from 'vue';
import {  useRoute } from 'vue-router';
import ProjectInfoCard from '../../../components/ProjectInfoCard.vue'
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

let issueChart = null
const drawIssue = function(){
  issueChart = show({
    domId: 'ISSUE-OPEN',
    title:'ISSUE-OPEN',
    chart: issueChart, 
    fun: bar, 
    config:getSeries.bar([{
      name:'issue open',
      data:project_info['repo']['oi']
    }])
  })
}

let prChart = null
const drawPr = function(){
  prChart = show({
      domId: 'PR',
      title:'PR',
      chart: prChart, 
      fun: bar, 
      config:getSeries.bar([{
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
  commentChart = show({
      domId: 'COMMENT',
      title:'COMMENTS',
      chart: commentChart, 
      fun: bar, 
      config:getSeries.bar([{
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
  participantChart = show({
      domId: 'PARTICIPANT',
      title:'PARTICIPANT',
      chart: participantChart, 
      fun: bar, 
      config:getSeries.bar([{
        name:'participant',
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
      issueChart.resize()
      prChart.resize()
      commentChart.resize()
      participantChart.resize()
    }, 10)
    setTimeout(()=>{
      clearInterval(timer)
    },300)
  }
);
</script>

<template>
  <main >
    <div class="project-info-box" >
      <ProjectInfoCard
        :name="project_name"
        :project_info="project_info"
      />

      <div class="charts-box" >
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
.charts-box{
  border: 1px solid rgb(180, 180, 180);
  border-radius: 5px;
  padding: 2rem;
}

.graph{
  min-height: 30rem;
  min-width: 5rem;
  margin-bottom: 1rem;
}
</style>
