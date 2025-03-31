import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['127.0.0.1','178.128.115.99',
      "encrypted-tbn0.gstatic.com", 
      "storage.googleapis.com",
      "dietitianjohna.com",
      "miro.medium.com",
      "157.245.204.6",
      "orange1.jpg",
      "167.172.69.43",
      "example.com",
      "img.youtube.com"
    ], // Add the external domain for images
  },
    // Ensure the build is standalone
    output: 'standalone',
};

export default nextConfig;
