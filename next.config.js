const { i18n } = require("./next-i18next.config");
/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: true,
  publicRuntimeConfig: {
    BACKEND_API: process.env.BACKEND_API,
    FRONTEND_URI: process.env.FRONTEND_URI,
  },
};

module.exports = nextConfig;
