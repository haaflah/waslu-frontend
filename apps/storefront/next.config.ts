import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@waslu/ui", "@waslu/api-client", "@waslu/config"]
};

export default nextConfig;
