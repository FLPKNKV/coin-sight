import type { Metadata } from "next"
import { ReactNode } from "react"
import { connect } from "./db/database-config"
import "./globals.css"

export const metadata: Metadata = {
    title: "AI Coin Prediction",
    description: "Made by FK",
}

export default function RootLayout({ children }: { children: ReactNode }) {
    connect();

    return (
        <html lang='en'>
            <body>{children}</body>
        </html>
    )
}
