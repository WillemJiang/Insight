<template>
    <div class="search-box">
        <input type="text">
        <i class="fa fa-search fa-lg"></i>
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
    