const { i18n } = require("./next-i18next.config");
/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: true,
  publicRuntimeConfig: {
    BACKEND_API: process.env.BACKEND_API,
  },
};

module.exports = nextConfig;
