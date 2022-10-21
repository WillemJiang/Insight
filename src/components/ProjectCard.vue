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
    <div class="project-card-box" :class="logo?'has-logo':''" draggable="true">
        <div v-if="logo"  class="logo-box">
            <img :src="logo" :alt="name" class="logo">
        </div>
        <div v-else  class="logo-box">
            <i class="logo-text" :style="{ 'fontSize':25 / (card_title.length + 2) + 'rem' }">{{card_title}}</i>
        </div>
        <div class="info-box">
            <h4 class="project-name">{{card_title}}</h4>
            <p class="project-description">{{description}}</p>
        </div>
    </div>
</template>

<style scoped>
.project-card-box{
    width: 25rem;
    height: 10rem; 
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    margin:2rem;
    overflow:hidden;
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
.project-card-box .logo-box .logo{
    max-width: 90%;
    max-height: 90%;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
}
.project-card-box .logo-box .logo-text{
    display: block;
    position: absolute;
    font-size: 3rem;
    line-height: 10rem;
    left:50%;
    transform: translateX(-50%);
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
    color:var(--vt-c-text-light-2) ;
}


</style>
    