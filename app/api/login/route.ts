import { NextRequest, NextResponse } from "next/server";
import User from "@/app/db/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {

    try {
        const { emailAddress, password } = await request.json();

        if (!emailAddress || !password) {
            return NextResponse.json({ error: "Email address & password are required for you to login." }, { status: 400 });
        }

        const user = await User.findOne({ emailAddress });

        if(!user){
            return NextResponse.json({ error: "User doesn't exist" }, { status: 400 });
        }

        const match = await bcrypt.compare(password, user?.password);
        
        if(!match) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });

        return NextResponse.json({
            message: "Login successful",
            success: true,
            token
        });
    }

    catch (error: unknown) {
        return NextResponse.json({ error: (error instanceof Error) ? error.message : "An unknown error occurred" }, { status: 500 });
    }
}