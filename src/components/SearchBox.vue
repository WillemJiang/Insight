<script setup>
import {ref, inject, defineEmits, onMounted} from 'vue';


const emit = defineEmits(['search'])

const projects_list = inject('committee')['committees']
const keywords = ref('')
const search = function(){
    const res = Object.entries(projects_list).filter(([key]) => key.indexOf(keywords.value.toLowerCase()) >= 0)
    emit('search', res)
    return res
}
onMounted(() => {
    search()
})
</script>
<template>
    <div class="search-box">
        <input type="text" v-model="keywords" @keyup.enter="search">
        <i class="fa fa-search fa-lg" @click="search"></i>
    </div>
</template>

<style scoped>
    .search-box{
        border: 1px solid var(--color-border);
        border-radius: 5px;
        width:25rem;
        height: 2.5rem;
    }
    .search-box input{
        height:100%;
        width: 100%;
        border-style: none;
        background-color: transparent;
        padding: 0 2rem 0 1rem;
    }
    i{
        position: absolute; 
        line-height: 2.5rem;
        right: .5rem;
    }

</style>
    