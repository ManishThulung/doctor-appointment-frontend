import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/context/query-provider";
import ErrorBoundary from "@/components/error-boundry/ErrorBoundary";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "@/context/auth-provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Doctor appointment system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <QueryProvider>
            <AuthContextProvider>
              {children}
              <ReactQueryDevtools initialIsOpen={false} />
              <ToastContainer position="top-right" autoClose={3000} />
            </AuthContextProvider>
          </QueryProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
