<template>
  <div>
    <!-- 背景图片区域 -->
    <div class="background-image"></div>

    <!-- 固定标题 -->
    <header>
      <h1>文章标题</h1>
    </header>

    <!-- 正文内容 -->
    <main class="content">
      <p>这里是正文内容。</p>
      <p>滚动时背景会逐渐被正文遮挡。</p>
      <p>这是额外内容，用来模拟页面滚动。</p>
      <p>继续滚动，直到背景被完全遮挡。</p>
    </main>
  </div>
</template>

<script lang="ts">
export default {
  name: 'BackgroundWithSticky',
};
</script>

<style scoped>
/* 背景图片样式 */
.background-image {
  position: relative;
  width: 100%;
  height: 60vh; /* 背景容器高度 */
  background-image: url('../assets/bg1.jpg'); /* 替换为你的图片路径 */
  background-size: 110%; /* 初始背景图片大小 */
  background-position: top; /* 居中显示 */
  background-repeat: no-repeat;
  z-index: 1; /* 确保背景在底层 */
  animation: zoomInEffect 8s infinite alternate ease-in-out; /* 应用放大效果 */
}

/* 定义背景图片放大动画 */
@keyframes zoomInEffect {
  0% {
    background-size: 110%; /* 初始背景大小 */
  }
  100% {
    background-size: 125%; /* 放大后的背景大小 */
  }
}

/* 正文内容样式 */
.content {
  padding: 20px;
  font-size: 1rem;
  line-height: 1.5;
}
</style>
