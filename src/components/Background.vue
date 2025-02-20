<template>
  <div>
    <!-- 背景图片区域 -->
    <div
      class="background-image"
      :style="{ backgroundImage: `url(${currentBackground})` }"
    ></div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';

const fadeClass = ref('');

export default {
  name: 'BackgroundWithSticky',
  setup() {
    const backgrounds = [
      '/profile/background/bg1.jpg',
      '/profile/background/bg2.jpg',
      '/profile/background/bg3.jpg',
      '/profile/background/bg4.jpg',
      '/profile/background/bg5.jpg',
      '/profile/background/bg6.jpg',
      '/profile/background/bg7.jpg',
      '/profile/background/bg8.jpg',
    ];
    const currentBackground = ref(backgrounds[0]);

    const changeBackground = () => {
      fadeClass.value = 'fade-out'; // 开始淡出
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * backgrounds.length);
        currentBackground.value = backgrounds[randomIndex]; // 切换图片
        fadeClass.value = ''; // 恢复淡入
      }, 1000); // 与 CSS 过渡时间匹配
    };

    onMounted(() => {
      setInterval(changeBackground, 8000); // 每 5 秒切换一次
    });

    return {
      currentBackground,
    };
  },
};
</script>

<style scoped>
/* 背景图片样式 */
.background-image {
  position: relative;
  width: 100%;
  height: 60vh; /* 背景容器高度 */
  background-size: 110%; /* 初始背景图片大小 */
  background-position: top; /* 居中显示 */
  background-repeat: no-repeat;
  z-index: 1; /* 确保背景在底层 */
  animation: zoomInEffect 8s infinite alternate ease-in-out; /* 应用放大效果 */
  transition:
    background-image 1s ease-in-out,
    opacity 1s ease-in-out; /* 增加透明度过渡 */
  opacity: 1; /* 设置透明度，0完全透明，1完全不透明 */
}

/* 定义背景图片放大动画 */
@keyframes zoomInEffect {
  0% {
    background-size: 110%; /* 缩小至初始状态 */
  }
  100% {
    background-size: 125%; /* 完全放大 */
  }
}

/* 正文内容样式 */
.content {
  padding: 20px;
  font-size: 1rem;
  line-height: 1.5;
}
</style>
