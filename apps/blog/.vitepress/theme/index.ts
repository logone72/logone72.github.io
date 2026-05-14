import './custom.css';

import DefaultTheme from 'vitepress/theme';

import Comment from '../components/Comment.vue';
import Layout from './Layout.vue';

export default {
  extends: DefaultTheme,
  Layout: Layout,
  enhanceApp({ app }) {
    app.component('Comment', Comment);
  },
};
