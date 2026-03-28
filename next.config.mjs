/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    /** Allow sharper `quality` on `<Image />` (default list is [75] only in some versions). */
    qualities: [75, 80, 85, 90, 92, 95, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
