<template>
  <div v-html="renderedMarkdown"></div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { marked } from 'marked';

// 接收 markdown 字符串作为 prop
const props = defineProps<{
  content: string;  // markdown 内容
}>();

const renderedMarkdown = ref<string>('');

// 使用 watchEffect 来观察 content 属性的变化
watchEffect(() => {
  renderedMarkdown.value = marked(props.content) as string;  // 渲染 Markdown 为 HTML
  console.log(renderedMarkdown.value);
});
</script>

<style scoped>
/* 使用Tailwind CSS来处理markdown渲染的标签 */
.markdown h1 {
  @apply text-3xl font-bold text-gray-800 mb-4;
}

.markdown h2 {
  @apply text-2xl font-semibold text-gray-700 mb-4;
}

.markdown p {
  @apply text-base leading-relaxed text-gray-600 mb-4;
}

.markdown ul {
  @apply pl-5 mb-4;
}

.markdown li {
  @apply mb-2;
}

.markdown blockquote {
  @apply pl-4 border-l-4 border-gray-300 italic text-gray-500 mb-4;
}

.markdown a {
  @apply text-blue-500 hover:underline;
}
</style>
