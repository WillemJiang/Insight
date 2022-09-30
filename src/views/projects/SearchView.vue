<script setup>
import SearchBox from '../../components/SearchBox.vue';
import ProjectCard from '../../components/ProjectCard.vue';
import { useRouter } from 'vue-router';
import { inject } from 'vue';

const router = useRouter();

// projects card
const projectList = inject('committee')['committees']

const turnTo = (project) => {
    router.push(`/projects/detail/compare${project}`);
};

</script>

<template>
    <main>
        <SearchBox class="search"/>

        <ul class="projects-list">
            <ProjectCard 
            v-for="(project, key) in projectList" 
            v-bind:key="key" 
            :name="key"
            :project_info="project"
            @click="turnTo(key)"
            />
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
    padding-top: 6rem;
}
</style>