import { Box, Flex } from "@chakra-ui/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Cursor from "./components/cursor/Cursor";
import "./globals.css";
import { Providers } from './providers';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nakamoto",
  description: "Stamping on BTC",
};

export default function ServerLayout({
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

            <Flex direction={{ base: 'column', md: 'row' }}>
              <Box flex="1">
                {children}
              </Box>
            </Flex>
          </Box>
        </Providers>
      </body>
    </html>
  );
}
