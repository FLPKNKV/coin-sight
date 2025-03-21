import { connect } from "../../db/database-config"
import User from "../../db/models/userModel"
import { NextRequest, NextResponse } from "next/server"

const connectDB = async () => {
    connect().then(() => console.log("DB connected")).catch(error => console.log("DB Connection failed", error))
}

export async function POST(request: NextRequest) {
    try {
        connectDB();
        const { firstName, lastName, emailAddress } = await request.json()

        const user = await User.findOne({ emailAddress })
        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }
        const newUser = new User({
            firstName,
            lastName,
            emailAddress
        })
        const savedUser = await newUser.save()

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser,
        })
    } catch (error: unknown) {
        return NextResponse.json(
            {
                error: (error instanceof Error) ? error.message : "An unknown error occurred",
            },
            { status: 500 }
        )
    }
}
