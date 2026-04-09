/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // 必须加这个，变成纯静态
  distDir: 'out',
}

module.exports = nextConfig
