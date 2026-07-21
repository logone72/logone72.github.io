export const siteOrigin = 'https://logone72.github.io';

export const routes = {
  home: '/',
  homeKo: '/ko/',
  blog: '/blog/',
  blogProxy: '/blog',
};

export const absoluteRoutes = {
  home: `${siteOrigin}${routes.home}`,
  homeKo: `${siteOrigin}${routes.homeKo}`,
};

const sitePort = 5173;
const blogPort = 5174;
const homePort = 5175;

export const devServer = {
  host: '0.0.0.0',
  sitePort,
  homePort,
  blogPort,
  homeTarget: `http://localhost:${homePort}`,
  blogTarget: `http://localhost:${blogPort}`,
};

export const withBlogBase = (url) => {
  const normalized =
    url === '/' || url === '' ? '/' : `/${url.replace(/^\/+/, '')}`;

  return `${routes.blogProxy}${normalized}`;
};
