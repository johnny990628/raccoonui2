import NextAuth from 'next-auth'
import KeycloakProvider from 'next-auth/providers/keycloak'
import jwt_decode from 'jwt-decode'
import { encrypt } from '../../../../functions/auth/encryption'

export const authOptions = {
    providers: [
        KeycloakProvider({
            clientId: `${process.env.KEYCLOAK_CLIENT_ID}`,
            clientSecret: `${process.env.KEYCLOAK_CLIENT_SECRET}`,
            issuer: `${process.env.KEYCLOAK_AUTH_ISSUER}`,
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            const nowTimeStamp = Math.floor(Date.now() / 1000)
            if (account) {
                token.decoded = jwt_decode(account.access_token)
                token.access_token = account.access_token
                token.id_token = account.id_token
                token.expires_at = account.expires_at
                token.refresh_token = account.refresh_token
                return token
            } else if (nowTimeStamp < token.expires_at) {
                return token
            } else {
                console.log('token expired')
                return token
            }
        },
        async session({ session, token }) {
            session.access_token = encrypt(token.access_token)
            session.id_token = encrypt(token.id_token)
            session.roles = token.decoded.realm_access.roles
            return session
        },
        async redirect({ url, baseUrl }) {
            return baseUrl
        },
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
