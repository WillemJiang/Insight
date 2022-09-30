<script setup>
    import ProjectCard from "../../components/ProjectCard.vue"
    import {ref, inject} from 'vue';
    import {useRoute} from 'vue-router'
    
    //    接收参数

    const route = useRoute()
    const project_name = route.query.project

    // nav 
    const projects_list = inject('committee')['committees']
    const NavShow = ref(false)
    const NavSwitch = () => {
        NavShow.value = !NavShow.value
    }
    // 点击card，切换项目详情页
    

    // 拖拽
    const dragItem = ref(null)
    const list2 = ref([])
    const canvas = ref(null)
    const dragstart = (e, item) => {
        dragItem.value = item;
        // 设置元素的放置行为——移动
        canvas.value.addEventListener("dragenter", dragenter);
        // 在目标元素经过 必须要阻止默认行为 否则不能触发drop
        canvas.value.addEventListener("dragover", dragover);
        // 离开目标元素时设置元素的放置行为——不能拖放
        canvas.value.addEventListener("dragleave", dragleave);
        // 拖动元素在目标元素松手时添加元素到画布
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
        list2.value.push(code);
        dragItem.value = null;
    }


</script>

<template>
    <main>
        <div class="graphic-box">
            <div class="graphic" ref="canvas">
                <RouterView/>
            </div>
        </div>
        <div class="right-nav" :class="NavShow?'right-nav-active':'right-nav-hidden'"  >
            <button class="nav-switch-open" @click="NavSwitch"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>
            <button class="nav-switch-close" @click="NavSwitch"><i class="fa fa-times"></i></button>

            <ul class="projects-list">
                <div v-for="(project, key) in projects_list" v-bind:key="key">
                    <ProjectCard   
                    @click="turnTo(project)" 
                    @dragstart="e => dragstart(e, item)" 
                    @dragend="dragend"
                    :name="key"
                    :project_info="project"/>
                </div>
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
    height: 100%;
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
</style>
    