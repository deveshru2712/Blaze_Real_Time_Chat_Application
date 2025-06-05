import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import AnimatedBlobs from "@/components/Blob";
import { Toaster } from "@/components/ui/sonner";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blaze 🔥",
  description:
    "Seamless real-time messaging with Blaze - connect instantly with friends and colleagues",
  keywords: [
    "chat",
    "messaging",
    "real-time",
    "communication",
    "blaze",
    "team chat",
    "friends chat",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${bricolage.variable} antialiased dark:bg-black/95 dark:text-white overflow-x-hidden`}
      >
        <div className="h-screen w-screen fixed -z-50 pointer-events-none">
          <AnimatedBlobs />
        </div>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative z-10 min-h-screen transition-colors duration-300 ease-in-out">
            {children}
          </div>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
