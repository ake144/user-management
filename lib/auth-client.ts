import { createAuthClient } from 'better-auth/react'

export const { signIn, signUp, signOut, useSession } = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_APP_URL || "https://user-management-nine-sooty.vercel.app"
})