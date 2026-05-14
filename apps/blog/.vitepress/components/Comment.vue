<script lang="ts" setup>
import { useData } from 'vitepress';
import { onMounted, ref } from 'vue';

const { isDark } = useData();
const darkComment = ref<HTMLElement | null>(null);
const lightComment = ref<HTMLElement | null>(null);

const loadScript = (commentEl: HTMLElement | null, theme: string) => {
  if (commentEl) {
    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.setAttribute('repo', 'logone72/logone72.github.io');
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('theme', theme);
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    commentEl.appendChild(script);
  }
};

onMounted(() => {
  loadScript(darkComment.value, 'github-dark');
  loadScript(lightComment.value, 'github-light');
});
</script>

<template>
  <div v-show="isDark" ref="darkComment" />
  <div v-show="!isDark" ref="lightComment" />
</template>

<style lang="scss" scoped></style>
