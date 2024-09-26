<template>
  <div id="app">
    <div id="pageMain">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
#pageMain{
  width: 80vw;
  margin: 0 auto;
}
</style>
