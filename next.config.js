/** @type {import('next').NextConfig} */
const nextConfig = {
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
