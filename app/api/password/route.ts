import User from "@/app/db/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
    try {
        const { emailAddress, password } = await request.json();
        const user = await User.findOne({ emailAddress });

        if(!user){
            return NextResponse.json({ error: "User doesn't exist" }, { status: 400 });
        }

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)

        await user.save()

        return NextResponse.json({
            message: "Password set successfully, you can now log in",
            success: true,
        })

    } catch(error:any){
        return NextResponse.json({error: error.message}, { status: 500 });
    }
}