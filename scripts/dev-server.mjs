import { spawn } from 'node:child_process';
import { devServer } from '../src/router/index.mjs';

const servers = {
  site: {
    command: 'vite',
    args: [
      '--config',
      'src/router/dev-gateway.vite.config.ts',
      '--host',
      devServer.host,
      '--port',
      String(devServer.sitePort),
      '--strictPort',
    ],
  },
  home: {
    command: 'vite',
    args: [
      '--config',
      'apps/home/vite.config.ts',
      '--host',
      devServer.host,
      '--port',
      String(devServer.homePort),
      '--strictPort',
    ],
  },
  blog: {
    command: 'vitepress',
    args: [
      'dev',
      'apps/blog',
      '--host',
      devServer.host,
      '--port',
      String(devServer.blogPort),
      '--strictPort',
    ],
  },
};

const name = process.argv[2];
const server = servers[name];

if (!server) {
  console.error(`Unknown dev server: ${name}`);
  process.exit(1);
}

const child = spawn(server.command, server.args, {
  stdio: 'inherit',
  shell: true,
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
