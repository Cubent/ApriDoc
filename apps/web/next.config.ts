import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  async redirects() {
    const renamed: Record<string, string> = {
      'unisci-pdf': 'unisci-pdf-online',
      'dividere-pdf': 'dividi-pdf-online',
      'ruotare-pdf': 'ruota-pdf-online',
      'organizza-pdf': 'organizza-pdf-online',
      'jpg-in-pdf': 'convertire-jpg-in-pdf',
      'pdf-in-jpg': 'convertire-pdf-in-jpg',
      'numero-di-pagine': 'numerare-pagine-pdf',
      'filigrana-pdf': 'aggiungere-filigrana-pdf',
    };
    return [
      { source: '/convertire-p7m-in-pdf', destination: '/strumenti/convertire-p7m-in-pdf', permanent: true },
      ...Object.entries(renamed).map(([from, to]) => ({
        source: `/strumenti/${from}`,
        destination: `/strumenti/${to}`,
        permanent: true,
      })),
    ];
  },
  webpack: (config) => {
    // pdfjs-dist optionally requires the native `canvas` module (Node only).
    config.resolve.alias = { ...config.resolve.alias, canvas: false };
    return config;
  },
};

export default nextConfig;
