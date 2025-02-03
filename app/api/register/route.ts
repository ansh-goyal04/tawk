import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import prisma from "@/app/libs/prismaDb";
import { stat } from "fs";

export async function POST(request:Request){
    try{
        const body=await request.json();
    const {email,password,name}=body;

    if(!email || !name || !password){
        return new NextResponse("Missing credentials",{status:400});
    }

    const hashedPassword=await bcrypt.hash(password,12);
    const newUser=await prisma.user.create({
        data:{
            email,
            name,
            hashedPassword
        }
    })
    return NextResponse.json(newUser);
    }

    catch(err){
        console.log(err,"registration error");
        return new NextResponse("Internal server error",{status:500})
        
    }

}