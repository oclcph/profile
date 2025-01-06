<template>
  <header class="bg-blue-600 text-white p-4">
    <nav class="flex justify-between items-center">
      <ul class="flex space-x-6">
        <li>
          <router-link to="/" class="text-white hover:text-gray-200">首页</router-link>
        </li>
        <li>
          <router-link to="/articles" class="text-white hover:text-gray-200">文章</router-link>
        </li>
        <li>
          <router-link to="/about" class="text-white hover:text-gray-200">关于</router-link>
        </li>
        <li>
          <router-link to="/search" class="text-white hover:text-gray-200">搜索</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
export default {
  name: 'Header',
};
</script>

<style scoped>
/* Header 样式 */
header {
  font-family: 'Arial', sans-serif;
}
</style>
