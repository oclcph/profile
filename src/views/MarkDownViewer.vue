<template>
  <div>
    <MarkdownResolver :content="markdownContent" v-if="markdownContent" />
  </div>
</template>

<script setup lang="ts">
import MarkdownResolver from '../components/MarkDownResolver.vue';
import { ref, onMounted } from 'vue';

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
</script>

<style>
/* 添加样式（可选） */
</style>
