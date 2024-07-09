/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
    DISABLE_LANDING: process.env.DISABLE_LANDING,
    DISABLE_STATIC_PAGES: process.env.DISABLE_STATIC_PAGES,
  },
};

export default nextConfig;
