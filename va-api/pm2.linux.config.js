module.exports = {
  apps: [
    {
      name: 'va-api',
      script: 'index.js',
      instances: 2,
      watch: true,
      cwd: '/opt/apps/va-api/dist',
      env: {
        PORT: 3000,
        NODE_ENV: 'production',
        VA_DB_URL: 'postgres://va:password@192.168.10.69:26250/va',
      },
    },
  ],
};
