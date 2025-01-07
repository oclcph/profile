<template>
  <div>
    <MarkDownFinder />
  </div>
</template>

<script setup lang="ts">
import MarkDownFinder from '../components/MarkDownFinder.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<style>
/* 添加样式（可选） */
</style>
