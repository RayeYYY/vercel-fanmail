/** @type {import('next').NextConfig} */
const nextConfig = {
  // 删掉 output: 'export'，让Netlify正常部署Next.js服务端路由
  trailingSlash: true,
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
