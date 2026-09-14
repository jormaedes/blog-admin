import type { Metadata } from "next";
import AuthInitializer from "@/components/AuthInitializer";
import Header from "@/components/Header";
import ThemeProvider from "@/components/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blog Admin",
  description: "Blog administration dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AuthInitializer />
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}