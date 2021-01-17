module.exports = {
  apps: [
    {
      name: 'VAAPI',
      script: 'index.js',
      instances: 2,
      watch: true,
      cwd: '/opt/apps/vaapi',
      env: {
        PORT: 3080,
        NODE_ENV: 'production',
        VA_DB_URL: 'postgres://va@192.168.10.69:26257/va',
      },
    },
  ],
};
