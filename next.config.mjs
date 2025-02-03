import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig = {
  experimental: {
    reactCompiler: false,
  },
  trailingSlash: true,
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
    ],
    formats: ["image/avif", "image/webp"], // Modern image formats
    minimumCacheTTL: 86400, // Cache images for 24 hours
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default withPayload(nextConfig);
