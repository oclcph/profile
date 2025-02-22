<template>
  <div class="flex flex-col items-center w-full">
    <!-- 个人信息 -->
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
      <!-- GitHub 图标 -->
    </a>

    <!-- 导航链接 -->
    <div class="mt-4 flex flex-col space-y-2">
      <router-link to="/" class="link">首页</router-link>
      <router-link to="/articles" class="link">文章</router-link>
      <router-link to="/about" class="link">关于</router-link>
    </div>

    <!-- 目录（TOC） -->
    <div v-if="showTOC && headers.length > 0" ref="tocContainer" class="mt-6">
      <div
        :class="{ 'fixed w-64': isSticky }"
        :style="{ top: topOffset }"
        class="bg-white bg-opacity-60 shadow-lg p-4 border border-gray-300 rounded-lg transition-all duration-300"
      >
        <h2 class="text-lg font-bold mb-2">📌 目录</h2>
        <ul class="space-y-2">
          <li
            v-for="header in headers"
            :key="header.id"
            :class="`cursor-pointer p-1 rounded-md hover:bg-gray-200 transition-all duration-200 ease-in-out ml-${header.level * 2} text-sm`"
            @click="scrollToSection(header.id)"
          >
            <span v-html="processTitle(header.title)"></span>
          </li>
        </ul>
      </div>
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
import { ref, onMounted, onUnmounted } from 'vue';
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

defineProps<{
  headers: { id: string; title: string; level: number }[];
  showTOC: boolean;
}>();

const tocContainer = ref<HTMLElement | null>(null);
const isSticky = ref(false);
let lastScrollY = window.scrollY; // 记录上一次滚动位置
const topOffset = ref('42px'); // 记录目录的 `top` 位置

const handleScroll = () => {
  if (!tocContainer.value) return;

  const { top } = tocContainer.value.getBoundingClientRect();
  const currentScrollY = window.scrollY; // 当前滚动位置
  const isScrollingUp = currentScrollY < lastScrollY; // 是否向上滚动

  if (top <= 80) {
    isSticky.value = true;
    topOffset.value = isScrollingUp ? '80px' : '20px'; // 向上滚动固定在 80px，否则 0px
    // topOffset.value = "80px"; // 向上滚动固定在 80px，否则 0px
  } else {
    isSticky.value = false;
  }

  lastScrollY = currentScrollY; // 更新滚动位置
};

const scrollToSection = (id: string) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

const processTitle = (title: string) => {
  // 替换掉被 `==` 包围的部分，或者为其应用不同的样式
  const regex = /==([^=]+)==/g; // 匹配被 `==` 包围的文本
  return title.replace(regex, '<mark>$1</mark>');
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
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
