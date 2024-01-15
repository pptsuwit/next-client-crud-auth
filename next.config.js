/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    API_URL: process.env.API_URL,
    API_URL_VERSION: process.env.API_URL_VERSION,
    TOKEN_NAME: process.env.TOKEN_NAME,
    REDIRECT_TO_LOGIN: process.env.REDIRECT_TO_LOGIN,
  },
};

module.exports = nextConfig;
