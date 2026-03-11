import { spawn } from 'node:child_process';

const processes = [];
let shuttingDown = false;

function start(name, command, args, color) {
  const child = spawn(command, args, {
    stdio: ['inherit', 'pipe', 'pipe'],
    shell: process.platform === 'win32',
    env: process.env,
  });

  const prefix = `\x1b[${color}m[${name}]\x1b[0m`;

  child.stdout.on('data', (chunk) => {
    process.stdout.write(`${prefix} ${chunk}`);
  });

  child.stderr.on('data', (chunk) => {
    process.stderr.write(`${prefix} ${chunk}`);
  });

  child.on('exit', (code, signal) => {
    if (shuttingDown) return;

    const reason = signal ? `signal ${signal}` : `code ${code ?? 0}`;
    console.error(`${prefix} exited with ${reason}`);
    shutdown(code ?? 1);
  });

  processes.push(child);
}

function shutdown(exitCode = 0) {
  if (shuttingDown) return;
  shuttingDown = true;

  for (const child of processes) {
    if (!child.killed) {
      child.kill('SIGTERM');
    }
  }

  setTimeout(() => {
    for (const child of processes) {
      if (!child.killed) {
        child.kill('SIGKILL');
      }
    }
    process.exit(exitCode);
  }, 1000).unref();
}

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

start('api', process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'dev:api'], '36');
start('web', process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'dev'], '35');
