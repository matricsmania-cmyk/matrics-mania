import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  experimental: {
    serverActions: {
      allowedOrigins: [
        '*',
        'ais-dev-az5r444kzbmq5afpdxzwyk-439511188286.asia-east1.run.app',
        'ais-pre-az5r444kzbmq5afpdxzwyk-439511188286.asia-east1.run.app',
        'localhost:3000',
      ],
    },
  },
  async headers() {
    return [
      {
        source: '/_next/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: '*' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/home/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
