import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
    title: "AI Coin Prediction",
    description: "Made by FK",
}

import { ReactNode } from "react"

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang='en'>
            <head>
                <link
                    href='https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Poppins:wght@300&display=swap'
                    rel='stylesheet'
                />
                <link
                    href='https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Host+Grotesk:ital,wght@0,300..800;1,300..800&family=Poppins:wght@300&display=swap'
                    rel='stylesheet'
                />
                <link
                    href='https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Host+Grotesk:ital,wght@0,300..800;1,300..800&family=Poppins:wght@300&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap'
                    rel='stylesheet'
                />
            </head>
            <body>{children}</body>
        </html>
    )
}
