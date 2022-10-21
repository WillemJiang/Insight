<script setup>
import { inject, onMounted, ref, watch} from 'vue';
import {  useRoute } from 'vue-router';
import ProjectInfoCard from '../../../components/ProjectInfoCard.vue'
import bar from '../../../assets/js/bar'
import getSeries  from '../../../assets/js/getSeries'

const props = defineProps({
  'isExpand':Boolean
})

const route = useRoute()
const main_project = route.query.main
const sub_project = route.query.sub

const projectsList = inject('committee')['committees']

const show = ({domId, chart, fun, config, title}) => {
    const dom = document.getElementById(domId);
    dom.removeAttribute("_echarts_instance_");
    chart = fun(title, dom, config, chart);
    return chart
}

const main_project_info = ref(projectsList[main_project])
const sub_project_info = ref(projectsList[sub_project])

let issueChart = null
const drawIssue = function(){
    show({
        domId: 'ISSUE-OPEN',
        title:'ISSUE OPEN',
        chart: issueChart, 
        fun: bar, 
        config:getSeries.bar([{
            name:main_project,
            data:main_project_info.value['repo']['oi']
        },{
            name:sub_project,
            data:sub_project_info.value['repo']['oi']
        }])
    })
}

let openPrChart = null
const drawOpenPr = function(){
    show({
        domId: 'OPEN-PR', 
        chart: openPrChart, 
        title:'OPEN PR',
        fun: bar, 
        config:getSeries.bar([{
            name:main_project,
            data:main_project_info.value['repo']['op']
        },{
            name:sub_project,
            data:sub_project_info.value['repo']['op']
        }])
    })
}

let mergePrChart = null
const drawMergePr = function(){
    show({
        domId: 'MERGE-PR', 
        chart: mergePrChart, 
        title:'MERGE PR',
        fun: bar, 
        config:getSeries.bar([{
            name:main_project,
            data:main_project_info.value['repo']['pm']
        },{
            name:sub_project,
            data:sub_project_info.value['repo']['pm']
        }])
    })
}

let issueCommentChart = null
const drawIssueComment = function(){
    show({
        domId:'ISSUE-COMMENT', 
        chart: issueCommentChart, 
        fun: bar, 
        title:'ISSUE COMMENTS',
        config:getSeries.bar([{
            name:main_project,
            data:main_project_info.value['repo']['ic']
        },{
            name:sub_project,
            data:sub_project_info.value['repo']['ic']
        }])
    })
}

let reviewCommentChart = null
const drawReviewComment = function(){
    show({
        domId:'REVIEW-COMMENT', 
        chart: reviewCommentChart, 
        fun: bar, 
        title:'REVIEW COMMENTS',
        config:getSeries.bar([{
            name:main_project,
            data:main_project_info.value['repo']['rc']
        },{
            name:sub_project,
            data:sub_project_info.value['repo']['rc']
        }])
    })
}

let participantChart = null
const drawParticipant = function(){
    participantChart = show({
        domId:'PARTICIPANT', 
        title:'PARTICIPANT',
        chart: participantChart, 
        fun: bar, 
        config:getSeries.bar([{
            name:main_project,
            data:main_project_info.value['repo']['p']
        },{
            name:sub_project,
            data:sub_project_info.value['repo']['p']
        }])
    })
}

onMounted(() => {
  drawOpenPr()
  drawMergePr()
  drawIssueComment()
  drawReviewComment()
  drawParticipant()
  drawIssue()
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
        <ProjectInfoCard
            :name="main_project"
            :project_info="main_project_info"
        />

        <ProjectInfoCard
            :name="sub_project"
            :project_info="sub_project_info"
        />
      </div>

      <div class="charts-box">

        <!-- participants count -->
        <div id="PARTICIPANT" class="graph" >
          
        </div>
        <!-- issue open -->
        <div id="ISSUE-OPEN" class="graph" >
          
        </div>
        <!-- issue comment -->
        <div id="ISSUE-COMMENT" class="graph" >

        </div>
        <!-- review comment -->
        <div id="REVIEW-COMMENT" class="graph">

        </div>
        <!-- pr -->
        <div id="OPEN-PR" class="graph">
          
        </div>
        <!-- pr -->
        <div id="MERGE-PR" class="graph">
          
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.project-info-box{
  width: 100%;
}
.head-box .info-box, .charts-box{
  border: 1px solid rgb(180, 180, 180);
  border-radius: 5px;
  padding: 2rem;

}
.head-box{
  width:100%;
  margin-bottom: 1rem;
  display: flex;
}
.head-box .info-box {
    flex:1;
}
.head-box .info-box:first-child{
    margin-right: 1rem;
}
.graph{
  min-height: 30rem;
  min-width: 5rem;
  margin-bottom: 1rem;
}
</style>
