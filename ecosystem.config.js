module.exports = {
  apps: [
    {
      name: 'yammi',
      exec_mode: 'cluster',
      instances: process.env.PM2_INSTANCE, // Or a number of instances
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start'
    }
  ]
}
