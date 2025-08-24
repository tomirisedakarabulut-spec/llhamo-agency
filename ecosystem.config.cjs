// PM2 Ecosystem Configuration
module.exports = {
  apps: [
    {
      name: 'lhamo-dev',
      script: 'npm',
      args: 'run dev -- --port 3003 --hostname 0.0.0.0',
      cwd: '/Users/unicorn/Lhamo',
      watch: false,
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
      env: {
        NODE_ENV: 'development',
        NEXT_TELEMETRY_DISABLED: '1'
      }
    },
    {
      name: 'lhamo-tunnel',
      script: 'npx',
      args: 'cloudflared tunnel --url http://localhost:3003',
      cwd: '/Users/unicorn/Lhamo',
      watch: false,
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s'
    }
  ]
}
