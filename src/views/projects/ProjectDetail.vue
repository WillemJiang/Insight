<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import ProjectCard from "../../components/ProjectCard.vue"
import SearchBox from "../../components/SearchBox.vue";
    
const router = useRouter();
const route = useRoute()

const projectList = ref([])
const isNone = ref(false)
const updateProjectsList = (e) => {
    if (e.length > 0){
        projectList.value = Object.fromEntries(e)
        isNone.value = false
    }else{
        projectList.value = []
        isNone.value = true
    }
}

// nav 
const NavShow = ref(false)
const NavSwitch = () => {
    NavShow.value = !NavShow.value
}     

// projects card click
const projectCurrent = ref(null)
const turnTo = (...args) => {
    if(args.length == 1){
        router.push(`/projects/detail/project?main=${args.toString()}`);
    }
    if(args.length == 2){
        router.push(`/projects/detail/compare?main=${args.join('&sub=')}`);
    }
    setTimeout(()=>{
        projectCurrent.value = args.toString()
    })
};

// projects card drag
const dragItem = ref(null)
const canvas = ref(null)

const dragstart = (e, item) => {

    e.dataTransfer.setDragImage(e.target.childNodes[0].childNodes[0], 150, 80);

    dragItem.value = item;
    canvas.value.addEventListener("dragenter", dragenter);
    canvas.value.addEventListener("dragover", dragover);
    canvas.value.addEventListener("dragleave", dragleave);
    canvas.value.addEventListener("drop", drop);
}
const dragend = () => {
    canvas.value.removeEventListener("dragenter", dragenter);
    canvas.value.removeEventListener("dragover", dragover);
    canvas.value.removeEventListener("dragleave", dragleave);
    canvas.value.removeEventListener("drop", drop);
}
const dragenter = (e) => {
    e.dataTransfer.dropEffect = "move";
}
const dragover = (e) => {
    e.preventDefault();
}
const dragleave = (e) => {
    e.dataTransfer.dropEffect = "none";
}
const drop = () => {
    const code= dragItem.value;
    if(route.query.main != code && route.query.sub != code){
        turnTo(route.query.main,code);
    }
}

</script>

<template>
    <main>
        <div class="graphic-box" :class="{'isFolded': NavShow}">
            <div class="graphic" ref="canvas">
                <RouterView :isExpand="!NavShow" :key="projectCurrent"/>
            </div>
        </div>
        <div class="right-nav" :class="NavShow?'right-nav-active':'right-nav-hidden'"  >
            <button class="nav-switch-open" @click="NavSwitch"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>
            <button class="nav-switch-close" @click="NavSwitch"><i class="fa fa-times"></i></button>
            <div class="search-box">
                <SearchBox @search="updateProjectsList"/>
            </div>
            <ul class="projects-list">
                <div v-for="(project, key) in projectList" v-bind:key="key">
                    <ProjectCard   
                    @click="turnTo(key)" 
                    @dragstart="e => dragstart(e, key)" 
                    @dragend="dragend"
                    :name="key"
                    :project_info="project"/>

                </div>
                <i class="fa fa-x" v-show="isNone">No result found</i>
            </ul>
        </div>        
    </main>

</template>

<style scoped>
main{
    width: 100%;
    display: flex;
    padding:0;
    overflow-x: hidden;
}
.graphic-box{
    flex: 1;
    padding:2rem 4rem 2rem 2rem;
    background-color: var(--vt-c-white-mute);
}
.graphic{
    width: 100%;
    height: 100%;
    background-color: white;
    overflow-y: auto;
}
.tag-nav{
    width: 6rem;
    background-color: white;
}
.right-nav{
    background: white;
    transition: .3s all;
}
.right-nav-active{
    width: 33rem;
    overflow-x: hidden;
    padding: 2rem;
}
.right-nav-hidden{
    width: 0;
}
.right-nav-hidden .nav-switch-open{
    display: block;
    position: absolute;
    width: 2.5rem;
    height: 2.5rem;
    top:2rem;
    left:0;
    transform: translateX(-100%);
    background-color: white;
    border-radius: 40% 0 0 40%;
    cursor: pointer;
    border-style: none;
} 
.nav-switch-close{
    border-style: none;
    background-color: white;

}
.right-nav-active .nav-switch-open{
    display: none;
}
.right-nav-active .nav-switch-close{
    font-size: 1.3rem;
    cursor: pointer;
}
.search-box{
   left:50%;
   transform: translateX(-50%);
   margin-bottom: 1rem;
}
.right-nav-hidden .search-box{
    display: none;
}
.projects-list{
    flex:1;
    overflow-y: auto;
}
.isFolded{
  width:calc(100% - 33rem);
}
</style>
    