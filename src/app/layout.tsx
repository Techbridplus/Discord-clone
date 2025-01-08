import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { ThemeProvider } from "@/components/providers/theme-provider"
import { ModalProvider } from "@/components/providers/modal-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ModalProvider/>
            {children}
        </ThemeProvider>
          
        </body>
      </html>
    </ClerkProvider>
  )
}