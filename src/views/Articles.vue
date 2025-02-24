<template>
  <div class="p-4 space-y-4">
    <!-- 优化过渡效果 -->
    <transition-group name="category" tag="div">
      <div
        v-for="category in categories"
        :key="category"
        class="group transition-all"
      >
        <!-- 标题优化 -->
        <button
          @click="toggleCategory(category)"
          class="w-full text-left px-5 py-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex items-center justify-between"
          aria-controls="category-content"
        >
          <span class="text-2xl font-semibold text-gray-800">
            {{ category }}
          </span>
          <!-- 动态箭头 -->
          <span
            class="transform transition-transform duration-300"
            :class="{ 'rotate-180': selectedCategory === category }"
          >
            ▼
          </span>
        </button>

        <!-- 内容过渡优化 -->
        <transition
          enter-active-class="transition-all duration-300 origin-top"
          leave-active-class="transition-all duration-200 origin-top"
          enter-from-class="opacity-0 scale-y-0"
          enter-to-class="opacity-100 scale-y-100"
        >
          <div
            v-if="selectedCategory === category"
            class="mt-2 ml-4 border-l-2 border-blue-100 pl-4"
          >
            <!-- 文件卡片化 -->
            <div
              v-for="(file, index) in getFilesByCategory(category)"
              :key="index"
              class="mb-2 p-4 rounded-lg bg-white hover:bg-blue-50 transition-colors shadow-sm hover:shadow-md"
            >
              <router-link
                :to="`/articles/${file.path}`"
                class="block text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors"
              >
                {{ file.title }}
              </router-link>
              <!-- 元信息优化 -->
              <div class="mt-2 flex items-center space-x-3 text-sm">
                <span class="px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                  {{ file.category }}
                </span>
                <span class="text-gray-500"> 📅 {{ file.modified_time }} </span>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition-group>
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
