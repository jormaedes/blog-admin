import type { Metadata } from "next";
import AuthInitializer from "@/components/AuthInitializer";
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
    <html lang="pt" suppressHydrationWarning>
      <body className="min-h-screen bg-[#FAF9F6] text-[#20211F] antialiased selection:bg-[#c2573a] selection:text-white dark:bg-[#141614] dark:text-[#F0F0EB]">
        <ThemeProvider>
          <AuthInitializer />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}