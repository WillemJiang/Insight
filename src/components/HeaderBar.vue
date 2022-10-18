<template>
  <header class="header-bar">
    <nav class="header-nav">
      <RouterLink class="header-link" to="/">global</RouterLink>
      <RouterLink class="header-link" to="/projects">projects</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.header-bar{
    display: flex;
    width:100%;
    height: 3.5rem;
    border-bottom: 1px solid var(--vt-c-text-dark-2);
}
.header-nav{
    height: 100%;
    left:50%;
    transform: translateX(-50%);
    
}
.header-nav .header-link{
    display: inline-block;
    color:var(--vt-c-text-light-2);
    padding:1rem 2rem;
}

.header-nav  .router-link-active{
  border-bottom:1px solid var(--high-light-color);
}
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
    