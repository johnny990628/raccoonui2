import NextAuth from 'next-auth/next'
import jwt_decode from 'jwt-decode'

export const authOptions = {
    providers: [
        KeycloakProvider({
            clientId: process.env.KEYCLOAK_CLIENT_ID,
            clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
            issuer: process.env.KEYCLOAK_AUTH_ISSUER,
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
            session.userProp = token.userProp
            return session
        },
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
