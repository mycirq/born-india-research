/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',            // static HTML export for GitHub Pages
  trailingSlash: true,         // /brief -> /brief/index.html (Pages-friendly)
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
