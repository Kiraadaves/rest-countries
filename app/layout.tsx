"use client";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import Providers from "./Redux/Provider";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { cn } from "@/lib/utils";
import Header from "@/components/header";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#ffffff]">
        <QueryClientProvider client={queryClient}>
          <Providers>
            <div className=" ">
              <div className="">{children}</div>
              <ToastContainer />
            </div>
          </Providers>
        </QueryClientProvider>
      </body>
    </html>
  );
}
