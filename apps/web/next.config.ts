import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  async redirects() {
    return [{ source: '/convertire-p7m-in-pdf', destination: '/strumenti/convertire-p7m-in-pdf', permanent: true }];
  },
  webpack: (config) => {
    // pdfjs-dist optionally requires the native `canvas` module (Node only).
    config.resolve.alias = { ...config.resolve.alias, canvas: false };
    return config;
  },
};

export default nextConfig;
