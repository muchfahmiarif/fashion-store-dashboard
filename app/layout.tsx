import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import ModalProvider from "@/providers/modal.provider";
import { ToastProvider } from "@/providers/toast.provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard Fashion Store",
  description: "Dashboard Fashion Store",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        {/* suppressHydrationWarning for suppress the warning that is logged when a server-rendered element mismatches with the client-rendered element */}
        <body className={inter.className} suppressHydrationWarning={false}>
          {children}
          <ModalProvider />
          <ToastProvider />
        </body>
      </html>
    </ClerkProvider>
  );
}
