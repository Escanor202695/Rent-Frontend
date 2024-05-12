/**
 * @type {import('next').NextConfig}
 */

// const { i18n } = require("./next-i18next.config");
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

module.exports = withPWA({
  reactStrictMode: false,
  // i18n,
  // pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],
  env: {
    API_URL: "http://localhost:3000/api",
  },
});
