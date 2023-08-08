import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { decrypt } from './encryption'

export async function getAccessToken() {
    const session = await getServerSession(authOptions)
    return session ? decrypt(session.access_token) : null
}

export async function getIdToken() {
    const session = await getServerSession(authOptions)
    return session ? decrypt(session.id_token) : null
}

export async function getAccessTokenForRegistration() {
    const tokenResponse = await fetch(process.env.NEXT_PUBLIC_KEYCLOAK_AUTH_TOKEN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `grant_type=client_credentials&client_id=${process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_SECRET}`,
    })

    const tokenData = await tokenResponse.json()
    return tokenData.access_token
}
