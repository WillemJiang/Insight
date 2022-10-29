<script setup>
import { onMounted, ref} from 'vue';
import rankPie from '../assets/js/rankPie'
import rankBar from '../assets/js/rankBar'


let rankPieChart = null

const drawPieChart = function(dataList){
  const dom = document.getElementById('QiChart');
  dom.removeAttribute("_echarts_instance_");
  rankPieChart = rankPie(dom, rankPieChart, dataList)
  rankPieChart.on('click',(params) => {
    const selected = params.event.target.selected
    const name = params.name
    expand.value = selected
    if(selected){
      drawBarChart(dataList,name)
    }
  })
}

let qiBarChart = null
const drawBarChart = function(dataList,name){
  const dom = document.getElementById('RanckBar');
  dom.removeAttribute("_echarts_instance_");
  qiBarChart = rankBar(dom, qiBarChart, dataList,name)
}

const ObjToList = function(obj){
  let li = []
  for (let key in obj){
    const rank = obj[key]["description"].split(': ')[1].replace('!','')
    li.push({
      name:key,
      score:obj[key]["Health score"],
      rank:rank
    })
  }
  return li
}

let qiData = null
let qiList = []

const getQiData = function(){
  const request = new XMLHttpRequest();
  request.open("get",'@/../Qi/qi.json');
  request.send(null);
  request.onload = () => {
    if(request.status == 200) {
      qiData = JSON.parse(request.responseText); 
      qiList = ObjToList(qiData)  
      drawPieChart(qiList)
    }
  }
}

onMounted(() => {
  getQiData()
})

const expand = ref(false)

</script>

<template>
  <main>

    <div class="graphic">
      <div class="Qi-box" id="QiChart" :class="{'left-chart': expand}">
        
      </div>
      <div class="project-box" :class="{'right-chart': expand}">
        <div class="RanckBar" id="RanckBar">

        </div>
      </div>

    </div>
  </main>
</template>

<style scoped>
main{
  background-color:var( --vt-c-divider-light-2) ;
  overflow-x: hidden;
}
.graphic{
  height: 100%;
  width: 100%;
  display: flex;
}
.Qi-box{
  width: 50%;
  height:100%;
  left:50%;
  transform: translateX(-50%);
  transition: all .3s;
}

.project-box{
  width: 50%;
  height:100%;
  left:55%;
  top:0;
  transition: all .3s;
  padding:0 2rem;
}
.left-chart{
  transform: translateX(-100%);
}
.right-chart{
  transform: translateX(-110%);
}
.RanckBar{
  height: 100%;
  width: 100%;
}
</style>
