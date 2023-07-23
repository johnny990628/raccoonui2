/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'tws-raccoon.luckypig.net',
                port: '8081',
                pathname: '/api/dicom/**',
            },
        ],
    },
}

module.exports = nextConfig
