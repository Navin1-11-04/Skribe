import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import { ModalProvider } from "@/components/providers/modal-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";


export const metadata: Metadata = {
  title: "Skribe",
  description: "AI-powered collaborative note-taking platform.",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/Skribe_light.svg",
        href: "/Skribe_light.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/Skribe_dark.svg",
        href: "/Skribe_dark.svg",
      },
    ],
  },
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
          <EdgeStoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              storageKey="Skribe-theme-2"
            >
             <Toaster position="bottom-center" />
                <ModalProvider />
                {children}
            </ThemeProvider>
          </EdgeStoreProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
