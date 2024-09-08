import { generateSidebar } from "vitepress-sidebar";
import { defineConfig } from "vitepress";
import { name, description, repository } from "../../package.json";

export default defineConfig({
  title: name,
  description,
  srcDir: "../posts",
  head: [
    [
      "script",
      {
        async: "",
        src: "https://www.googletagmanager.com/gtag/js?id=G-BG56ZW302R",
      },
    ],
    [
      "script",
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-BG56ZW302R');`,
    ],
    [
      "meta",
      {
        name: "naver-site-verification",
        content: "67ff08576a160f454495df90f7f4021201a0b4da",
      },
    ],
  ],
  sitemap: {
    hostname: "https://logone72.github.io",
  },
  themeConfig: {
    nav: [{ text: "Home", link: "/" }],
    socialLinks: [{ icon: "github", link: repository }],
    sidebar: generateSidebar({ documentRootPath: "posts" }),
    search: {
      provider: "local",
    },
    outline: "deep",
  },
  cleanUrls: true,
  lastUpdated: true,
});
