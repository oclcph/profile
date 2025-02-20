<template>
  <div class="flex flex-col items-center">
    <!-- 点击头像打开大图 -->
    <img
      :src="avatarUrl"
      alt="头像"
      class="avatar w-24 h-24 rounded-full border-2 border-gray-300 cursor-pointer"
      @click="openModal"
    />

    <h2
      class="mt-4 text-xl font-semibold cursor-pointer"
      @click="routerToAbout"
    >
      {{ name }}
    </h2>
    <p class="mt-2 text-gray-600 text-center">{{ description }}</p>

    <a
      href="https://github.com/oclcph"
      target="_blank"
      rel="noopener noreferrer"
      class="flex items-center mt-4 text-gray-600 hover:text-gray-800"
    >
      <i class="fab fa-github"></i>
      <!-- Font Awesome GitHub 图标 -->
    </a>
    <!-- Header 内容竖着排列 -->
    <div class="mt-4 flex flex-col space-y-2">
      <router-link to="/" class="link">首页</router-link>
      <router-link to="/articles" class="link">文章</router-link>
      <router-link to="/about" class="link">关于</router-link>
    </div>

    <!-- 模态框 -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
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
import { useRouter } from 'vue-router';

const avatarUrl = './cl.jpg'; // 头像路径
const name = 'ocphl';
const description = '我行其野，芃芃其麦';
const isModalOpen = ref(false);
const router = useRouter();

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const routerToAbout = () => {
  router.push('/about');
};
</script>

<style scoped>
/* 如果需要自定义样式，可以在这里添加 */
.link {
  color: #000000;
  padding: 10px 50px;
  border-radius: 4px;
  transition:
    background-color 0.3s,
    color 0.3s;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.link:hover {
  background-color: rgba(107, 114, 128, 0.5);
  color: #ffffff;
  animation: pulse 0.5s infinite; /* 添加脉冲动画 */
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
</style>
