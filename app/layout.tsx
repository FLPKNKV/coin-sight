import type { Metadata } from "next"
import { ReactNode } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { connect } from "./db/database-config"
import "./globals.css"

export const metadata: Metadata = {
    title: "AI Coin Prediction",
    description: "Made by FK",
}

export default function RootLayout({ children }: { children: ReactNode }) {
    connect();

    return (
        <>
        <html lang="en" suppressHydrationWarning>
          <head />
          <body>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </body>
        </html>
      </>
    )
}
