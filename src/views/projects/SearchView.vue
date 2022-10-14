<script setup>
import SearchBox from '../../components/SearchBox.vue';
import ProjectCard from '../../components/ProjectCard.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();

// projects card
const turnTo = (project) => {
    router.push(`/projects/detail/project?project=${project}`);
};

// search
const projectList = ref([])
const isNone = ref(false)
const updateProjectsList = (e) => {
    if (e.length > 0){
        isNone.value = false
        paging(e)
    }else{
        projectList.value = []
        isNone.value = true
    }
}

// paging
const pageSize = 12
const pageCurrent = ref(0)
const pageTotal = ref(1)

const paging = function(e){
    pageCurrent.value = 0 
    projectList.value = sliceArr(e, pageSize)
    pageTotal.value = projectList.value.length
}
const nextPgae = function(){
    if (pageCurrent.value >= 0 && pageCurrent.value < pageTotal.value - 2){
        pageCurrent.value = pageCurrent.value+ 1
    }
}
const prePgae = function(){
    if (pageCurrent.value > 0 && pageCurrent.value < pageTotal.value - 1){
        pageCurrent.value = pageCurrent.value - 1
    }
}

const sliceArr= function(array, size){
    let result = []
    for (var x = 0; x < Math.ceil(array.length / size); x++){
        var start = x * size
        var end = start + size
        result.push(Object.fromEntries(array.slice(start, end)))
    }
    return result
}


</script>

<template>
    <main>
        <SearchBox class="search"
        @search="updateProjectsList"/>

        <ul class="projects-list" >
            <i v-show="pageCurrent > 0" class="fa fa-angle-left fa-3x pre-page" aria-hidden="true" @click="prePgae"></i>
            <ProjectCard 
            v-for="(project, key) in projectList[pageCurrent]" 
            v-bind:key="key" 
            :name="key"
            :project_info="project"
            @click="turnTo(key)"
            />
            <i v-show="pageCurrent < pageTotal - 2" class="fa fa-angle-right fa-3x next-page" aria-hidden="true" @click="nextPgae"></i>
            <i class="fa fa-2x" v-show="isNone">未查询到结果</i>
        </ul>



    </main>
</template>

<style scoped>
.search {
    left: 50%;
    margin-top: 6rem;
    transform: translateX(-50%);
}

.projects-list {
    display: flex;
    flex-wrap: wrap;
    align-content: space-around;
    width: 100%;
    padding: 3rem;
    padding-top: 4rem;
}
.pre-page{
    position: absolute;
    left:2rem;
    top:50%;
}
.next-page{
    position: absolute;
    right:2rem;
    top:50%;
}
</style>