import User from "../../db/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
    try {
        const { firstName, lastName, emailAddress, password, repeatPassword } = await request.json()

        const user = await User.findOne({ emailAddress })

        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }

        if(password !== repeatPassword){
            return NextResponse.json({ error: "Passwords do not match" }, { status: 400 })
        }

        const newUser = new User({
            firstName,
            lastName,
            emailAddress,
            password: await bcrypt.hash(password, 10),
        })
        const savedUser = await newUser.save()

        return NextResponse.json(
            {
                message: "User created successfully",
                success: true,
                savedUser,
            },
            { status: 201 }
        )
    } catch (error: unknown) {
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : "An unknown error occurred",
            },
            { status: 500 }
        )
    }
}
