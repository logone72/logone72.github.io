import { spawn } from 'node:child_process';

const commands = [
  {
    name: 'home',
    command: 'npm',
    args: ['run', 'dev:home'],
  },
  {
    name: 'blog',
    command: 'npm',
    args: ['run', 'dev:blog'],
  },
];

const children = new Map();
let shuttingDown = false;

const stopAll = (signal = 'SIGTERM') => {
  if (shuttingDown) return;
  shuttingDown = true;

  for (const child of children.values()) {
    if (!child.killed) {
      child.kill(signal);
    }
  }
};

for (const { name, command, args } of commands) {
  const child = spawn(command, args, {
    stdio: 'inherit',
    shell: true,
  });

  children.set(name, child);

  child.on('exit', (code, signal) => {
    children.delete(name);

    if (!shuttingDown) {
      console.error(
        `[dev:${name}] exited with ${signal ? `signal ${signal}` : `code ${code}`}`,
      );
      stopAll();
      process.exitCode = code ?? 1;
    }
  });
}

process.on('SIGINT', () => stopAll('SIGINT'));
process.on('SIGTERM', () => stopAll('SIGTERM'));
