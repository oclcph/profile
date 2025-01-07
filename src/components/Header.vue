<template>
  <header
    :class="['fixed-header', { hidden: !isVisible }]"
    class="fixed top-0 left-0 w-full z-10 p-4 transition-transform duration-300"
  >
    <nav class="flex justify-between items-center">
      <ul class="flex space-x-6">
        <router-link to="/" class="anime-link">首页</router-link>
        <router-link to="/articles" class="anime-link">文章</router-link>
        <router-link to="/about" class="anime-link">关于</router-link>
        <router-link to="/search" class="anime-link">搜索</router-link>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  name: 'Header',
  setup() {
    const isVisible = ref(true); // 控制 Header 显示状态
    const backgroundHeight = 500; // 背景图片的高度（可以根据实际情况调整）
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 当滚动距离小于背景图片高度时，Header 始终显示
      if (currentScrollY < backgroundHeight) {
        isVisible.value = true;
      } else {
        // 超过背景图片高度后，根据滚动方向显示或隐藏 Header
        isVisible.value = currentScrollY < lastScrollY;
      }

      lastScrollY = currentScrollY;
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      isVisible,
    };
  },
};
</script>

<style scoped>
/* Header 样式 */
.fixed-header {
  background-color: rgba(0, 0, 0, 0.6); /* 半透明背景，确保可读性 */
  color: white;
  position: fixed; /* 固定在页面顶部 */
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10; /* 确保 Header 在最前面 */
  backdrop-filter: blur(5px); /* 背景模糊效果（可选） */
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.anime-link {
  font-size: 1rem;
  font-weight: bold;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  color: #e0e6f8;
  transition:
    color 0.2s ease,
    background-color 0.2s ease;
  padding: 5px 10px;
  border-radius: 5px;
}

.anime-link:hover {
  color: #c3d1f9;
  background-color: rgba(255, 255, 255, 0.15);
}
</style>
