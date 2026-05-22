import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'geshtalt.az' }],
        destination: 'https://gestalt.az/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'gestalt-therapy.az' }],
        destination: 'https://gestalt.az/:path*',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
