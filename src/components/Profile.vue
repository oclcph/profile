<template>
  <div class="flex flex-col items-center">
    <!-- 点击头像打开大图 -->
    <img
      :src="avatarUrl"
      alt="头像"
      class="avatar w-24 h-24 rounded-full border-2 border-gray-300 cursor-pointer"
      @click="openModal"
    />

    <h2 class="mt-4 text-xl font-semibold">{{ name }}</h2>
    <p class="mt-2 text-gray-600 text-center">{{ description }}</p>

    <!-- Header 内容竖着排列 -->
    <div class="mt-4 flex flex-col space-y-2">
      <router-link to="/" class="link">首页</router-link>
      <router-link to="/articles" class="link">文章</router-link>
      <router-link to="/about" class="link">关于</router-link>
    </div>

    <!-- 模态框 -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="closeModal"
    >
      <img
        :src="avatarUrl"
        alt="大图"
        class="max-w-full max-h-full"
        @click.stop
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const avatarUrl = './cl.jpg'; // 头像路径
const name = 'ocphl';
const description = '相关信息描述';
const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};
</script>

<style scoped>
/* 如果需要自定义样式，可以在这里添加 */
.link {
  color: #6b7280; /* 灰色 */
  padding: 10px 50px; /* 添加内边距 */
  border-radius: 4px; /* 圆角 */
  transition: background-color 0.3s; /* 添加过渡效果 */
}

.link:hover {
  background-color: rgba(107, 114, 128, 0.2); /* 悬停时背景加深 */
}
</style>
