import User from "@/app/db/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
    try {
        const { emailAddress, password, repeatPassword } = await request.json();
        const user = await User.findOne({ emailAddress });

        if(!user){
            return NextResponse.json({ error: "User doesn't exist" }, { status: 400 });
        }

        if (password !== repeatPassword) {
            return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
        }

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)

        await user.save()

        return NextResponse.json({
            message: "Password set successfully, you can now log in",
            success: true,
        })

    } catch(error:unknown){
        return NextResponse.json({error: (error instanceof Error) ? error.message : "An unknown error occurred",}, { status: 500 });
    }
}