import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@ethannet/messages",
    "@ethannet/navigation",
    "@ethannet/types",
  ],
};

export default nextConfig;
