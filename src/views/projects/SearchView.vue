<script setup>
    import SearchBox from '../../components/SearchBox.vue';
    import ProjectCard from '../../components/ProjectCard.vue'
</script>

<template>
  <main>
    <SearchBox class="search"></SearchBox>
    <ul class="projects-list">
        <ProjectCard v-for="card in 6" v-bind:key="card"></ProjectCard>
    </ul>

  </main>
</template>

<style scoped>
    .search{
        left:50%;
        margin-top: 6rem;
        transform: translateX(-50%);
    }
    .projects-list{
        display: flex;
        flex-wrap: wrap;
        align-content:space-around;
        width: 100%;
        padding: 3rem;
        padding-top: 6rem;

    }
</style>
    