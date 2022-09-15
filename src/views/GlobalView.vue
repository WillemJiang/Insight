<script setup>
import chart from '../components/ChartBox.vue'

</script>

<template>
  <main>
    <div class="graphic">
      <chart></chart>
    </div>
  </main>
</template>
<style scoped>
  main{
    height: 100%;
    width: 100%;
    padding: 2rem;
  }
  .graphic{
    border: 1px solid var( --vt-c-divider-light-1);
    min-height: 100%;
    padding:2rem;
  }

</style>
