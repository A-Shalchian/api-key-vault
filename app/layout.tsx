import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const ibmPlex = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // optional
  variable: "--font-ibmplex",
});

export const metadata: Metadata = {
  title: "API Key Vault",
  description: "Securely store and manage your API keys",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${ibmPlex.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
