<script setup>
    import { inject } from 'vue';
import { useRoute } from 'vue-router'

    const route = useRoute()
    const project_name = route.query.project

    const project_info = inject('committee')['committees'][project_name]
  
</script>

<template>
    <main>
        <div class="project-info-box">
            {{project_name}}
            {{project_info}}
        </div>
    </main>
</template>

<style>

</style>
