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
