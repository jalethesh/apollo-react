const path = require('path');

const withPlugins = require('next-compose-plugins');
const withSvgr = require('next-plugin-svgr');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    TOKEN_COOKIE_NAME: 'accountAddress',
    TOKEN_COOKIE_EXPIRATION: 60 * 60 * 1,
    REFRESH_TOKEN_COOKIE: 'SETPAY-ORT',
  },
  // keep development cache indefinitely
  onDemandEntries: {
    maxInactiveAge: 1000 * 60 * 1000,
    pagesBufferLength: 1000,
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_API_SERVER_ADDRESS: process.env.NEXT_PUBLIC_API_SERVER_ADDRESS,
    NEXT_PUBLIC_API_ALGOEXPLORER: process.env.NEXT_PUBLIC_API_ALGOEXPLORER,
    NEXT_PUBLIC_NETWORK: process.env.NEXT_PUBLIC_NETWORK,
    NEXT_PUBLIC_WEB3_STORAGE_API_TOKEN:
      process.env.NEXT_PUBLIC_WEB3_STORAGE_API_TOKEN,
    NEXT_PUBLIC_API_ALGO_EXPLORER_INDEXER:
      process.env.NEXT_PUBLIC_API_ALGO_EXPLORER_INDEXER,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  poweredByHeader: false,
};

module.exports = withPlugins(
  [
    [
      withSvgr,
      {
        svgrOptions: {
          configFile: path.resolve(__dirname, 'svgr.config.js'),
        },
      },
    ],
  ],
  nextConfig
);
