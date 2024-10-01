import { Box, Flex } from "@chakra-ui/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/layout/Header";
import "./globals.css";
import { Providers } from './providers';
// import FooterNavigation from "./components/layout/FooterNavigation";
import Cursor from "./components/cursor/Cursor";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nakamoto",
  description: "Stamping on BTC",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en">
      <body>
        <Cursor />
        <Providers>
          <Box bg="background" color="text" minH="100vh">
            <Header />
            <Flex direction={{ base: 'column', md: 'row' }}>
              <Box flex="1">
                {children}
              </Box>
            </Flex>
            {/* <FooterNavigation /> */}
          </Box>
        </Providers>
      </body>
    </html>
  );
}