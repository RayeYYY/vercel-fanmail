/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // 关键：把项目打成纯静态
  distDir: 'out',   // 静态文件输出到out文件夹
  basePath: '/vercel-fanmail', // 关键：适配GitHub Pages的子路径
  assetPrefix: '/vercel-fanmail/', // 关键：静态资源路径适配
}

module.exports = nextConfig
