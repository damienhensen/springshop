/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'd3iydi14awu73y.cloudfront.net',
            },
        ],
    },
}

module.exports = nextConfig
