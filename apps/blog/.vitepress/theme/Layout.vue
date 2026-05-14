<script setup>
import { useData } from 'vitepress';
import DefaultTheme from 'vitepress/theme';

import Comment from '../components/Comment.vue';

const { Layout } = DefaultTheme;
const { frontmatter, page } = useData();
</script>

<template>
  <Layout>
    <template #doc-after>
      <Comment
        v-if="frontmatter.disableComments !== true"
        :key="page.relativePath"
      />
    </template>
  </Layout>
</template>
