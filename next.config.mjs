/** @type {import('next').NextConfig} */

// Static export (output: 'export') is required for the Hostinger deploy, but in
// `next dev` it makes every dynamic route 500 with a spurious
// "missing generateStaticParams()" error (a Next 14 dev-mode limitation — the
// export is present and `next build` uses it fine). So we only enable export for
// the production build; dev renders dynamic routes on-demand as normal.
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: isProd ? 'export' : undefined,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
