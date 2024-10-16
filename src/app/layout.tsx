//import from package.json
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/layouts/MainLayout";
import { Box, ChakraProvider } from "@chakra-ui/react";

//import from file

//Text Font
const roboto = Roboto({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Student Sport Portal",
  description:
    "Generated by create next app, portal platform with health dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <ChakraProvider>
          <MainLayout>
            <Box bg="gray.200">{children}</Box>
          </MainLayout>
        </ChakraProvider>
      </body>
    </html>
  );
}
