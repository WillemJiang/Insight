<script setup>
import { inject } from 'vue';

const repo = inject('repo')
const qi_data = inject('qi')

const props = defineProps({
  'name':String,
  'project_info':Object
})

const card_title = props.name?props.name.toUpperCase():null
const logo = props.project_info && props.project_info.logo ? props.project_info.logo : null
const description = props.project_info && props.project_info.description ? props.project_info.description : null
const issue = props.name && repo[props.name] && repo[props.name].issue ? repo[props.name].issue : null
const star = props.name && repo[props.name] && repo[props.name].star ? repo[props.name].star : null
const pr = props.name && repo[props.name] && repo[props.name].pr ? repo[props.name].pr : null
const fork = props.name && repo[props.name] && repo[props.name].fork ? repo[props.name].fork : null
const Qi = props.name && qi_data[props.name]['Health score'] ? qi_data[props.name]['Health score'] : null


</script>

<template>
  <div class="info-box">
    <div v-if="logo"  class="logo-box">
      <img :src="logo" :alt="name" class="logo" >
    </div>
    <div v-else  class="logo-box">
      <i class="logo-text" :style="{ 'fontSize':15 / (card_title.length + 2) + 'rem' }">{{card_title}}</i>
    </div>
    <div class="project-description">
      {{description}}
    </div>
    <ul class="attr-box">
      <li class="star" v-if="star">
        <i class="fa fa-circle-o" aria-hidden="true"></i> star {{star}}
      </li>
      <li class="fork" v-if="fork">
        <i class="fa fa-circle-o" aria-hidden="true"></i> fork {{fork}}
      </li>
      <li class="issue" v-if="issue">
        <i class="fa fa-circle-o" aria-hidden="true"></i> issue {{issue}}
      </li>
      <li class="pr" v-if="pr">
        <i class="fa fa-circle-o" aria-hidden="true"></i> pr {{pr}}
      </li>
      <li class="Qi" v-if="Qi">
        <i class="fa fa-circle-o" aria-hidden="true"></i> Qi {{Qi}}
      </li>
  </ul>
  </div>
</template>

<style scoped>

.info-box{
  border: 1px solid rgb(180, 180, 180);
  border-radius: 5px;
  padding: 2rem;
  width:100%;
  margin-bottom: 1rem;
}
.info-box .logo-box{
  height: 5rem;
  width: 20rem;
}
.info-box .logo-box .logo{
  max-width: 100%;
  max-height: 100%;
  position: absolute;
}
.info-box .logo-box .logo-text{
  display: block;
  position: absolute;
  font-size: 3rem;
  line-height: 5rem;
}
.attr-box {
    margin-top: 1rem;
}
.attr-box li{
   display: inline-block;
   margin-right: 2rem; 
}
</style>
