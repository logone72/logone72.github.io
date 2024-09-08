import { generateSidebar } from "vitepress-sidebar";
import { defineConfig } from "vitepress";
import { name, description, repository } from "../../package.json";

export default defineConfig({
  title: name,
  description,
  srcDir: "../posts",

  head: [
    [
      "meta",
      {
        name: "google-site-verification",
        content: "f5b8urfLVM-IRsORykWqUAMVws-ISJnIYUiFhZDF1rU",
      },
    ],
  ],
  themeConfig: {
    nav: [{ text: "Home", link: "/" }],
    socialLinks: [{ icon: "github", link: repository }],
    sidebar: generateSidebar({ documentRootPath: "posts" }),
  },
  rewrites: {
    "": "블로그/obsidian으로%20작성하는%20vitepress%20블로그",
  },
});
