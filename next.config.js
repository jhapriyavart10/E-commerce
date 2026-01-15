/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  images: {
    domains: ['cdn.shopify.com'],
  },
};

module.exports = nextConfig;
