export const siteOrigin = 'https://logone72.github.io';

export const routes = Object.freeze({
  home: '/',
  blog: '/blog/',
  blogProxy: '/blog',
  blogSitemap: '/blog/sitemap.xml',
});

export const absoluteRoutes = Object.freeze({
  home: new URL(routes.home, siteOrigin).toString(),
  blogSitemap: new URL(routes.blogSitemap, siteOrigin).toString(),
});

const sitePort = 5173;
const blogPort = 5174;
const homePort = 5175;

export const devServer = Object.freeze({
  host: '0.0.0.0',
  sitePort,
  homePort,
  blogPort,
  homeTarget: `http://localhost:${homePort}`,
  blogTarget: `http://localhost:${blogPort}`,
});

export const withBlogBase = (url) => {
  const normalized =
    url === '/' || url === '' ? '/' : `/${url.replace(/^\/+/, '')}`;

  return `${routes.blogProxy}${normalized}`;
};
