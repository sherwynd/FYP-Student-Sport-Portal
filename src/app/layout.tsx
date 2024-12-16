//import from package.json
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import MainLayout from "@/components/layouts/MainLayout";

//import from file
import "./globals.css";

//Text Font
const roboto = Roboto({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Student Sport Portal",
  description:
    "Generated by create next app, portal platform with health dashboard",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <MainLayout>
          <div className="flex min-h-screen flex-col bg-gray-100">
            {children}
          </div>
        </MainLayout>
      </body>
    </html>
  );
}
