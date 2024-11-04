<template>
  <div class="hello">
    <template v-for="item in greeting" :key="item.id">
      <h3 class="myH3">{{ item.content.text }}</h3>
      <div>{{testUpdateFuc()}}</div>
    </template>
    <button @click="addOneGreeting">添加一条欢迎语</button>
    <button @click="updatesome($event)">{{event1}}</button>
    <input v-model="sonValue" type="text"/>
    <div>{{sonValue}}</div>
  </div>
</template>

<script>
import { ref, defineModel } from 'vue';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
}
</script>
<script setup>
  const sonValue = defineModel('sonValue', {default: 520})
  const greeting = ref([{id: 1, content: {text: '欢迎使用 Vue 3!'}}, {id: 2, content: {text: '欢迎使用 Vue 3!'}}, {id: 3, content: {text: '欢迎使用 Vue 3!'}}]);
    const addOneGreeting = function(){
      greeting.value = [{id: 4, content: {text: '欢迎使用 Vue 4!'}, hasOwn: {hasOwn: {hasOwn: '我的私有属性'}}}]
    }
    const updatesome = function($event){
      updateValue()
      console.log($event)
      console.log($event.value)
    }
    const event1 = ref(123)
    const state = ref({
      nested: {
        level1: {
          level2: {
            value: 42
          }
        }
      }
    });
    function testUpdateFuc(){
      return state.value.nested.level1.level2.value
    }
    // 尝试直接修改深层属性
    function updateValue() {
      state.value.nested.level1.level2.value = state.value.nested.level1.level2.value + 1
      console.log('Updated value:', state.value.nested.level1.level2.value);
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
