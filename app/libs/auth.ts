import Credentials from "next-auth/providers/credentials"
import  prisma  from "./prismaDb"
import bcrypt from "bcrypt";

import { PrismaAdapter } from "@auth/prisma-adapter"

import GoogleProvider from "next-auth/providers/google"
import { AuthOptions } from "next-auth"

export const authOptions:AuthOptions={
    adapter:PrismaAdapter(prisma),
    providers:[
        Credentials({
            name:"Credentials",
            credentials:{
                email:{label:"Email",type:"email",placeholder:"example@gmail.com"},
                password:{label:"Password",type:"password"}
            },
            async authorize(credentials:any){
                if(!credentials?.password || !credentials?.email){
                    throw new Error("Invalid credentials");
                }
                const hashedPassword=await bcrypt.hash(credentials.password,10);
                const existingUser=await prisma.user.findFirst({
                    where:{
                        email:credentials.email
                    }
                });

                if(!existingUser || !existingUser?.hashedPassword){
                    throw new Error("Invalid credentials");
                }

                if(existingUser){
                    const passwordValidation=await bcrypt.compare(credentials.password,existingUser.hashedPassword||"")
                    if(passwordValidation){
                        return existingUser      
                   }
                    return null;
                }

                // try{
                //     const newUser=await prisma.user.create({
                //         data:{
                //             email:credentials.email,
                //             hashedPassword:hashedPassword
                //         }
                //     });

                //     return newUser

                    
                // }
                // catch(err){
                //     console.log(err);
                // }
                return null;
            }
        }),

        GoogleProvider({
            clientId:process.env.AUTH_GOOGLE_ID || "",
            clientSecret:process.env.AUTH_GOOGLE_SECRET || ""
        })
    ],
    // pages:{
    //     signIn:'app/components/AuthForm'
    // },
    secret:process.env.JWT_SECRET||"secret",
    callbacks:{
        async session({token,session}:any){
            session.user.id=token.sub

            return session
        }
    }
}

