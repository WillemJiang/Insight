<template>
    <div class="project-card-box">
        <div class="logo-box">
            <i class="fa  fa-spinner fa-lg"></i>
        </div>
        <div class="info-box">
            <h4 class="project-name">项目名</h4>
            <p class="project-description">项目描述项目描述</p>
        </div>
    </div>
</template>

<style scoped>
.project-card-box{
    display: inline-flex;
    /* flex:1; */
    width: 25rem;
    height: 7rem; 
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    margin:2rem;
}
.project-card-box .logo-box{
    font-size: 3.5rem;
    line-height: 7rem;
    margin: 0 10px;
    width:5rem;
    height: 5rem;
}
.project-card-box .info-box{
    flex:1;
    min-width: 50%;
    margin-right: 1rem;
}
.project-card-box .info-box .project-name{
    padding: 1rem;
    font-size: 1.2rem;
    color: var(--color-heading);
}
.project-card-box .info-box .project-description{
    color:var(  --vt-c-text-light-2) ;
}

</style>
    