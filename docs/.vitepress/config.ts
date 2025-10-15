import { generateSidebar, withSidebar } from 'vitepress-sidebar';
import { defineConfig } from 'vitepress';
import { name, description, repository } from '../../package.json';

const documentRootPath = 'posts';

export default defineConfig(
  withSidebar(
    {
      title: name,
      titleTemplate: '기술 블로그',
      description,
      srcDir: `../${documentRootPath}`,
      head: [
        [
          'script',
          {
            async: '',
            src: 'https://www.googletagmanager.com/gtag/js?id=G-BG56ZW302R',
          },
        ],
        [
          'script',
          {},
          `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-BG56ZW302R');
          `,
        ],
        [
          'meta',
          {
            name: 'naver-site-verification',
            content: '67ff08576a160f454495df90f7f4021201a0b4da',
          },
        ],
        ['link', { rel: 'icon', href: '/favicon.ico' }],
      ],
      sitemap: {
        hostname: 'https://logone72.github.io',
      },
      themeConfig: {
        logo: '/icons8-dev-30.png',
        nav: [{ text: 'Home', link: '/' }],
        socialLinks: [{ icon: 'github', link: repository }],
        search: {
          provider: 'local',
        },
        outline: 'deep',
      },
      cleanUrls: true,
      lastUpdated: true,
    },
    {
      documentRootPath,
      useTitleFromFileHeading: true,
    },
  ),
);
