/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    images: {
        domains: ['tws-raccoon-dicom.luckypig.net'],
        remotePatterns: [
            // {
            //     protocol: 'http',
            //     hostname: 'tws-raccoon.luckypig.net',
            //     port: '8081',
            //     pathname: '/api/dicom/**',
            // },
            {
                protocol: 'https',
                hostname: 'tws-raccoon-dicom.luckypig.net',
                port: '',
                pathname: '/api/dicom/**',
            },
        ],
    },
}

module.exports = nextConfig
