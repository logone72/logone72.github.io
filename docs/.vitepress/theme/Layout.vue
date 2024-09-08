<script setup>
import Comment from "../components/Comment.vue";
import DefaultTheme from "vitepress/theme";
import { useData } from 'vitepress'

const { Layout } = DefaultTheme;
const { frontmatter, page } = useData();
</script>

<template>
  <Layout>
    <template #doc-after>
      <Comment v-if="frontmatter.disableComments !== true" :key="page.relativePath"/>
    </template>
  </Layout>
</template>