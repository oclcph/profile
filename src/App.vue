<template>
  <div id="app">
    <Header />
    <!-- 引入 Header 组件 -->
    <Background />
    <Breadcrumb />
    <main class="container mx-auto p-4 flex">
      <!-- 主内容区域 -->
      <div class="flex-1">
        <!-- 路由视图，根据路由显示不同页面 -->
        <router-view />
      </div>

      <!-- 右侧的 Profile 组件 -->
      <div class="w-64 ml-4">
        <Profile />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './components/Header.vue'; // 引入 Header 组件
import Background from './components/Background.vue';
import Breadcrumb from './components/Breadcrumb.vue';
import Profile from './components/Profile.vue';

export default defineComponent({
  name: 'App',
  components: {
    Header, // 注册 Header 组件
    Background,
    Breadcrumb,
    Profile,
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
</style>
