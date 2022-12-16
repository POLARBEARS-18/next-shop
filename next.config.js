const { withFrameworkConfig } = require('./framework/common/config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  framework: {
    name: process.env.NEXT_PUBLIC_FRAMEWORK,
  },
  i18n: {
    locales: ['en-US', 'jp'],
    defaultLocale: 'en-US',
  },
}

module.exports = withFrameworkConfig(nextConfig)

console.log('next.config.js', JSON.stringify(module.exports, null, 2))
