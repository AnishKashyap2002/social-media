/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["lh3.googleusercontent.com", "uploadthing.com"],
    },
    experimental: {
        serverActions: true,
    },
};

module.exports = nextConfig;
