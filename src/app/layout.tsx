'use client'; // This makes the component client-side
import StoreProvider from "@/app/StoreProvider";
import type { Metadata } from "next";
import "@/app/globals.css";
import { Suwannaphum } from "next/font/google";
import { useEffect, useState } from "react";
import NoInternetPage from "@/app/no-internet/page"; // Import the NoInternetPage

const suwannaphum = Suwannaphum({
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-suwannaphum",
  display: "swap",
  subsets: ["khmer"],
});

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOnline, setIsOnline] = useState(true); // Default to true

  // Check internet status on mount and listen for changes
  useEffect(() => {
    // Set initial status
    setIsOnline(navigator.onLine);

    // Event listeners for online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Cleanup listeners on unmount
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
      <html lang="en">
      <body className={`${suwannaphum.className} bg-background_color`}>
      <StoreProvider>
        {isOnline ? children : <NoInternetPage />}
      </StoreProvider>
      </body>
      </html>
  );
}