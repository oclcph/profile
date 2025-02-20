<template>
  <h2
    class="p-4 text-white text-center text-lg font-semibold mb-4 bg-gray-800 bg-opacity-70 rounded"
  >
    ——文章列表——
  </h2>
  <div>
    <ul>
      <li
        v-for="(file, index) in sortedFiles"
        :key="index"
        @click="navigateToArticle(file.path)"
        class="p-4 bg-white bg-opacity-80 shadow-md cursor-pointer transition-colors duration-300 hover:bg-blue-100 hover:bg-opacity-90"
      >
        <div class="text-lg font-bold">
          <!-- 增加文件路径的字体大小和加粗 -->
          {{ file.path.replace(/\.md$/, '') }}
        </div>
        <div class="text-gray-600 text-sm">
          <!-- 设置类别的字体大小 -->
          {{ file.category }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import type { Files } from '../types.ts';

const fileList = ref<Files[]>([]);
const emit = defineEmits(['load-complete']);
const sortedFiles = computed(() => {
  return fileList.value.sort((a, b) => {
    const dateA = new Date(a.modified_time);
    const dateB = new Date(b.modified_time);
    return dateB.getTime() - dateA.getTime(); // 按修改时间降序排列
  });
});

onMounted(async () => {
  const response = await fetch('/profile/fileList.json');
  fileList.value = (await response.json()).files;
  console.log(fileList.value);
  emit('load-complete');
});

const router = useRouter();

const navigateToArticle = (file: string) => {
  // 在这里触发导航事件，例如使用 Vue Router 的 $router.push
  // 你需要根据你的路由配置来调整这里的代码
  router.push({ name: 'article', params: { file } });
};
</script>

<style>
/* 添加样式（可选） */
</style>
