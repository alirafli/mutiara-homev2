import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Topbar from "@/components/ui/topbar";
import Footer from "@/components/ui/Footer";
import { ReduxProviders } from "@/lib/redux/provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Root Layout",
  description: "Generated by create next app",
  icons: "favicon.png",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ReduxProviders>
          <Topbar />
          {children}
          <Footer />
          <Toaster />
        </ReduxProviders>
      </body>
    </html>
  );
}
