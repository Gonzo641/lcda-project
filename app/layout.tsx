import "./globals.css";
import ClientLayout from "@/ClientLayout";
import TopBar from "@/components/TopBar/TopBar";
import type { ReactNode } from "react";
import { MenuProvider } from "@/components/Menu/menu-context";

export const metadata = {
  title: "La Cime Des Apps",
  description: "lcda app",
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
