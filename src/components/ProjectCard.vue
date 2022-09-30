<script setup>
import { ref } from 'vue';

const props = defineProps({
    'name':String,
    'project_info':Object
})

const card_title = ref(props.name.toUpperCase())


</script>
<template>
    <div class="project-card-box" :class="project_info.logo?'has-logo':''" draggable="true">
        <div v-if="project_info.logo"  class="logo-box">
            <img  :src="project_info.logo" :alt="name" class="logo">
        </div>
        <div class="info-box">
            <h4 class="project-name">{{card_title}}</h4>
            <p class="project-description">{{project_info.description}}</p>
        </div>
    </div>
</template>

<style scoped>
.project-card-box{
    /* display: inline-flex; */
    width: 25rem;
    height: 10rem; 
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    margin:2rem;
    overflow:hidden ;
    cursor: pointer;
}
.project-card-box .logo-box{
    height: 100%;
    width: 100%;
    top: 0;
    
}
.has-logo:hover .logo-box, .has-logo:hover .info-box{
    transition: all .3s;
    top:-100%;
}
.project-card-box .logo-box img{
    max-width: 90%;
    max-height: 90%;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
}
.project-card-box .info-box{
    position: relative;
    top: 0;
    height: 100%;
    width: 100%;
    padding:1rem;
}
.project-card-box .info-box .project-name{
    font-size: 2rem;
    line-height: 2;
    color: var(--color-heading);
}
.project-card-box .info-box .project-description{
    color:var(  --vt-c-text-light-2) ;
}

</style>
    