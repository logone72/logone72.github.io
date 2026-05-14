import { devServer, routes } from './index.mjs';

const blogProxyPattern = `^${routes.blogProxy}(?:/|$)`;
const homeProxyPattern = `^(?!${routes.blogProxy}(?:/|$)).*`;

export const createDevGatewayProxy = () => ({
  [blogProxyPattern]: {
    target: devServer.blogTarget,
    changeOrigin: true,
    ws: true,
  },
  [homeProxyPattern]: {
    target: devServer.homeTarget,
    changeOrigin: true,
    ws: true,
  },
});
