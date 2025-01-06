<template>
  <div id="app">
    <Header />  <!-- 引入 Header 组件 -->
    <router-view />  <!-- Vue Router 渲染的页面 -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './components/Header.vue';  // 引入 Header 组件

export default defineComponent({
  name: 'App',
  components: {
    Header,  // 注册 Header 组件
  },
});
</script>

<style>
/* 如果有需要在全局应用的样式可以放这里 */
</style>
