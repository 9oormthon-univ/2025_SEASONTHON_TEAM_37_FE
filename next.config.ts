import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        // destination: 'http://localhost:8080/api/v1/:path*',
        destination: 'http://221.149.176.198:8082/api/v1/:path*',
        // destination: 'https://api.reboundlabs.site/api/v1/:path*',
      },
    ];
  },
};

export default nextConfig;
