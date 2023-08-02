'use client'

import { SessionProvider } from 'next-auth/react'

export default ({ children }) => {
    return <SessionProvider>{children}</SessionProvider>
}
