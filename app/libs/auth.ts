import CredentialsProvider from "next-auth/providers/credentials"
import  prisma  from "./prismaDb"

import { PrismaAdapter } from "@auth/prisma-adapter"

import GoogleProvider from "next-auth/providers/google"
import { AuthOptions } from "next-auth"

export const authOptions:AuthOptions={
    adapter:PrismaAdapter(prisma),
    providers=[
        CredentialsProvider
    ]
}

