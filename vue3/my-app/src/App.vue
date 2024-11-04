<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <h1>父子共用v-model</h1>
  <HelloWorld msg="Welcome to Your Vue.js App" v-model:sonValue="sonValue"/>
  <div>{{sonValue}}</div>

</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue';
export default {
  
  name: 'App',
  components: {
    HelloWorld
  },
  setup(){
    const sonValue = ref(213)
    return {sonValue}
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
