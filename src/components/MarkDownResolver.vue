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

</style>
