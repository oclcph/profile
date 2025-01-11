<template>
  <div class="p-4">
    <div v-for="category in categories" :key="category" class="mb-4">
      <h2
        class="text-2xl font-semibold cursor-pointer"
        @click="toggleCategory(category)"
      >
        {{ category }}
      </h2>

      <!-- 点击类别后展示文件列表 -->
      <div v-if="selectedCategory === category">
        <div
          v-for="(file, index) in getFilesByCategory(category)"
          :key="index"
          class="mb-2"
        >
          <router-link :to="`/articles/${file.path}`">{{
            file.title
          }}</router-link>
          <p class="text-sm text-gray-600">
            分类: {{ file.category }} | 修改时间: {{ file.modified_time }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Files } from '../types.ts';
import { computed, onMounted, ref } from 'vue';

const fileList = ref<Files[]>([]);
const emit = defineEmits(['load-complete']);
// 获取所有分类
const categories = computed(() => {
  return [...new Set(fileList.value.map((file) => file.category))]; // 获取所有唯一的分类
});

const selectedCategory = ref<string | null>(''); // 记录选中的类别

// 切换类别时展示对应的文件
const toggleCategory = (category: string) => {
  if (selectedCategory.value === category) {
    selectedCategory.value = null; // 如果已经选择该类别，则关闭
  } else {
    selectedCategory.value = category; // 选择该类别
  }
};

// 根据类别过滤文件
const getFilesByCategory = (category: string) => {
  return fileList.value.filter((file) => file.category === category);
};

onMounted(async () => {
  const response = await fetch('/profile/fileList.json');
  fileList.value = (await response.json()).files;
  console.log(fileList.value);
  emit('load-complete');
});
</script>

<style scoped></style>
