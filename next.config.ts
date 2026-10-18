import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      allowedOrigins: [
        'ais-dev-az5r444kzbmq5afpdxzwyk-439511188286.asia-east1.run.app',
        'ais-pre-az5r444kzbmq5afpdxzwyk-439511188286.asia-east1.run.app',
        'localhost:3000',
        '*.run.app',
      ],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/services',
        destination: '/',
        permanent: true,
      },
      {
        source: '/services/:slug((?!$).*)',
        destination: '/:slug',
        permanent: true,
      },
      {
        source: '/industry',
        destination: '/',
        permanent: true,
      },
      {
        source: '/industries',
        destination: '/',
        permanent: true,
      },
      {
        source: '/industries/:slug((?!$).*)',
        destination: '/:slug',
        permanent: true,
      },
      {
        source: '/location',
        destination: '/',
        permanent: true,
      },
      {
        source: '/locations/:slug((?!$).*)',
        destination: '/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

