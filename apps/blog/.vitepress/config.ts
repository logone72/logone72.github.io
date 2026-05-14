import { withSidebar } from 'vitepress-sidebar';
import { defineConfig } from 'vitepress';
import { repository } from '../../../package.json';

const documentRootPath = 'content/blog';
const withBlogBase = (url: string) => {
  const normalized =
    url === '/' || url === '' ? '/' : `/${url.replace(/^\/+/, '')}`;

  return `/blog${normalized}`;
};

export default defineConfig(
  withSidebar(
    {
      base: '/blog/',
      title: 'logone72',
      description: '프론트엔드 개발자 logone72 입니다.',
      srcDir: '../../content/blog',
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
        [
          'script',
          { type: 'text/javascript' },
          `(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "u08gul678r");
          `,
        ],
        ['link', { rel: 'icon', href: '/blog/favicon.ico' }],
      ],
      lang: 'ko-KR',
      sitemap: {
        hostname: 'https://logone72.github.io',
        transformItems: (items) =>
          items.map((item) => ({
            ...item,
            url: withBlogBase(item.url),
          })),
      },
      themeConfig: {
        logo: '/icons8-dev-30.png',
        nav: [
          { text: 'Home', link: 'https://logone72.github.io/' },
          { text: 'Blog', link: '/' },
        ],
        socialLinks: [{ icon: 'github', link: repository }],
        search: {
          provider: 'local',
        },
        outline: 'deep',
      },
      cleanUrls: true,
      lastUpdated: true,
      ignoreDeadLinks: 'localhostLinks',
    },
    {
      documentRootPath,
      useTitleFromFileHeading: true,
    },
  ),
);
