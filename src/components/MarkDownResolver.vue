<template>
  <div v-html="renderedMarkdown"></div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { marked } from 'marked';
import katex from 'katex';

// 接收 markdown 字符串作为 prop
const props = defineProps<{
  content: string; // markdown 内容
}>();

const renderedMarkdown = ref<string>('');

const renderer = new marked.Renderer();

// 替换行内公式 $...$
function processInlineFormulas(content: string): string {
  const inlineFormulaRegex = /\$(.+?)\$/g;
  return content.replace(inlineFormulaRegex, (_, formula) => {
    return katex.renderToString(formula, {
      throwOnError: false,
      output: 'mathml',
    });
  });
}

// 替换块级公式 $$...$$
function processBlockFormulas(content: string): string {
  const blockFormulaRegex = /\$\$([\s\S]+?)\$\$/g;
  return content.replace(blockFormulaRegex, (_, formula) => {
    return `<p>${katex.renderToString(formula, { displayMode: true, throwOnError: false, output: 'mathml' })}</p>`;
  });
}

// 自定义 Markdown 渲染器
renderer.paragraph = (text) => {
  // 先处理块级公式
  const withBlockFormulas = processBlockFormulas(text.text);

  // 再处理行内公式
  const withInlineFormulas = processInlineFormulas(withBlockFormulas);

  return `<p>${withInlineFormulas}</p>`;
};

// 确保 renderer.text 不处理公式
renderer.text = (text) => {
  return text.text; // 避免重复渲染
};

// 使用 watchEffect 来观察 content 属性的变化
watchEffect(() => {
  renderedMarkdown.value = marked(props.content, { renderer }) as string; // 渲染 Markdown 为 HTML
  console.log(renderedMarkdown.value);
});
</script>

<style scoped></style>
