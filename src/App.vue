<template>
  <div id="app">
    <Header />  <!-- 引入 Header 组件 -->
    <main class="container mx-auto p-4">
      <!-- 路由视图，根据路由显示不同页面 -->
      <router-view />
    </main>
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
#app {
  font-family: 'Arial', sans-serif;
  min-height: 100vh;
}

body {
  margin: 0;
}
.fixedFooter {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 30px;
  padding: 10px; /* 示例内边距 */
}
.relativeFooter {
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  height: 30px;
  padding: 10px; /* 示例内边距 */
}
</style>
