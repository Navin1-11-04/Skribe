import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConvexClientProvider } from "@/components/providers/convex-provider";

export const metadata: Metadata = {
  title: "Notik",
  description: "AI-powered collaborative note-taking platform.",
  icons:{
    icon:[
      {
      media:"(prefers-color-scheme: light)",
      url:"/notik_light.svg",
      href:"/notik_light.svg"
    },
     {
      media:"(prefers-color-scheme: dark)",
      url:"/notik_dark.svg",
      href:"/notik_dark.svg"
    }
  ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased font-urbanist">
      <ConvexClientProvider>
          <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="notik-theme-2"
          >
            <Toaster position="bottom-center"/>
            {children}
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
