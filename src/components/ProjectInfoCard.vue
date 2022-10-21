<script setup>

const props = defineProps({
  'name':String,
  'project_info':Object
})

const card_title = props.name?props.name.toUpperCase():null
const logo = props.project_info && props.project_info.logo ? props.project_info.logo : null
const description = props.project_info && props.project_info.description ? props.project_info.description : null

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
</style>
