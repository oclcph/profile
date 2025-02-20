<template>
  <div id="app" class="flex flex-col min-h-screen bg-other-image">
    <Header />
    <Background />
    <Breadcrumb />
    <!--    <div class="wave-divider"></div>-->
    <main class="container main-content mx-auto p-4 flex flex-1">
      <!-- 主内容区域 -->
      <div class="flex-1">
        <!-- 路由视图，根据路由显示不同页面 -->
        <router-view />
      </div>

      <!-- 右侧的 Profile 组件 -->
      <aside class="w-64 ml-4">
        <Profile />
      </aside>
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

.flex-1 {
  flex: 1; /* 让主内容区域自适应 */
}

/* 响应式设计 */
@media (max-width: 768px) {
  .flex {
    flex-direction: column; /* 小屏幕时改变布局为列 */
  }
  .w-64 {
    width: 100%; /* 右侧 Profile 在小屏幕时全宽 */
    margin-left: 0; /* 清除左边距 */
  }
}

.wave-divider {
  position: relative;
  height: 60px; /* 根据需要调整高度 */
  overflow: hidden;
  background: transparent; /* 背景透明 */
}

.wave-divider::before {
  content: '';
  position: absolute;
  bottom: 0; /* 放置在底部 */
  left: 0;
  width: 200%; /* 为了使波浪效果更明显 */
  height: 100%;
  background: linear-gradient(
    to right,
    transparent 20%,
    rgba(0, 0, 255, 0.5) 50%,
    transparent 80%
  );
  border-radius: 50%;
  animation: wave 4s infinite linear; /* 动画效果 */
}

@keyframes wave {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%); /* 动画移动 */
  }
}

.bg-other-image {
  position: relative; /* 使伪元素定位相对于这个元素 */
  overflow: hidden; /* 确保伪元素不会超出容器 */
}

.bg-other-image::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('/bizhi.png'); /* 背景图片 */
  background-size: cover; /* 确保背景图覆盖整个区域 */
  background-position: center; /* 背景图居中 */
  background-repeat: no-repeat; /* 不重复背景图 */
  opacity: 0.5; /* 设置透明度，0 为完全透明，1 为完全不透明 */
  z-index: 0; /* 确保伪元素在最底层 */
  background-attachment: fixed; /* 固定背景图 */
}

.main-content {
  position: relative; /* 确保主要内容在伪元素之上 */
  z-index: 1; /* 设置较高的 z-index，确保内容可见 */
}
</style>
