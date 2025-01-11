<template>
  <div class="p-4">
    <!-- 添加标题 -->
    <h2 class="text-gray-400 text-center text-lg font-semibold mb-4">
      ——文章列表——
    </h2>
    <!-- MarkDownFinder 组件 -->
    <div class="flex space-x-4">
      <!-- MarkDownFinder 组件 -->
      <MarkDownFinder class="flex-1" @load-complete="onLoadComplete" />
      <!-- Profile 组件 -->
      <Profile v-if="isMarkDownLoaded" class="w-64" />
      <!-- 设置固定宽度 -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MarkDownFinder from '../components/MarkDownFinder.vue';
import Profile from '../components/Profile.vue';

// 用于跟踪 MarkDownFinder 是否加载完成
const isMarkDownLoaded = ref(false);

// 当 MarkDownFinder 加载完成时调用的函数
const onLoadComplete = () => {
  console.log('load complete');
  isMarkDownLoaded.value = true;
};
</script>
