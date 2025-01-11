<template>
  <div class="flex space-x-4">
    <MarkdownResolver
      :content="markdownContent"
      v-if="markdownContent"
      class="flex-1"
      @load-complete="onLoadComplete"
    />
    <Profile v-if="isMarkDownLoaded" class="w-64" />
    <!-- 设置固定宽度 -->
  </div>
</template>

<script setup lang="ts">
import MarkdownResolver from '../components/MarkDownResolver.vue';
import { ref, onMounted } from 'vue';
import Profile from '../components/Profile.vue';

const markdownContent = ref<string>('');

const props = defineProps<{
  file: string;
}>();

const fetchContent = async () => {
  const response = await fetch(`/profile/articles/${props.file}`);
  console.log(props.file);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  markdownContent.value = await response.text();
  console.log('Markdown content:', markdownContent.value); // 调试输出
};

onMounted(async () => {
  await fetchContent();
});

const isMarkDownLoaded = ref(false);
const onLoadComplete = () => {
  console.log('load complete');
  isMarkDownLoaded.value = true;
};
</script>

<style>
/* 添加样式（可选） */
</style>
