import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import prisma from './prisma'

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "https://esperanza.et",
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "AFFILIATE"
      },
      firstName: {
        type: "string",
        required: false
      },
      lastName: {
        type: "string",
        required: false
      },
      phone: {
        type: "string",
        required: false,
        input: true
      },
      referralCode: {
        type: "string",
        required: false,
        input: true
      },
      referredById: {
        type: "string",
        required: false,
        input: true
      },
      country: {
        type: "string",
        required: false,
        input: true,
        defaultValue: "Ethiopia"
      },
      city: {
        type: "string",
        required: false,
        input: true,
        defaultValue: "Addis Ababa"
      }
    }
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    },
  },
  trustedOrigins: [
    'http://localhost:3000', 
    'http://localhost:3000/api',
    'https://user-management-nine-sooty.vercel.app',
    process.env.NEXT_PUBLIC_APP_URL || ""
  ].filter(Boolean),
})