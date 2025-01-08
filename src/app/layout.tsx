import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { ThemeProvider } from "@/components/providers/theme-provider"
import { ModalProvider } from "@/components/providers/modal-provider";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
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
          <NextSSRPlugin
          routerConfig={extractRouterConfig(ourFileRouter)}
          />
            {children}
        </ThemeProvider>
          
        </body>
      </html>
    </ClerkProvider>
  )
}