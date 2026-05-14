import { defineConfig } from 'vite';
import { createDevGatewayProxy } from './dev-gateway.mjs';
import { devServer } from './index.mjs';

// 개발 서버 전용 site gateway 설정입니다. 배포 빌드에는 사용하지 않습니다.
export default defineConfig({
  server: {
    host: devServer.host,
    port: devServer.sitePort,
    strictPort: true,
    proxy: createDevGatewayProxy(),
  },
});
