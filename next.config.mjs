/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/vrtx-studio',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
