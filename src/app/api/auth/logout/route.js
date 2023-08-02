import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { getIdToken } from '@/functions/auth/token'

export async function GET() {
    const session = await getServerSession(authOptions)

    if (session) {
        const idToken = await getIdToken()

        // this will log out the user on Keycloak side
        const url = `${process.env.KEYCLOAK_LOGOUT_URL}?id_token_hint=${idToken}&post_logout_redirect_uri=${encodeURIComponent(
            process.env.NEXTAUTH_URL
        )}`

        try {
            const res = await fetch(url, { method: 'GET' })
        } catch (err) {
            console.error(err)
            return new Response({ status: 500 })
        }
    }
    return new Response({ status: 200 })
}
