import "./globals.css";
import ClientLayout from "@/ClientLayout";
import TopBar from "@/components/TopBar/TopBar";
import type { ReactNode } from "react";
import { MenuProvider } from "@/components/Menu/menu-context";

export const metadata = {
  title: "Terrene | MWT by Codegrid ",
  description: "Monthly Website Template by Codegrid | August 2025",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
      <ClientLayout>
        <MenuProvider>
        <TopBar />
        <main>{children}</main>
        </MenuProvider>
      </ClientLayout>
      </body>
    </html>
  );
}


