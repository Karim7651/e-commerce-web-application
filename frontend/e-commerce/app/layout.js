import { Raleway, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import { Toaster } from "sonner";

const raleway = Raleway({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body
        className={`raleway.className bg-base-700 grid grid-rows-[auto,1fr,auto] min-h-screen overflow-x-hidden`}
      >
        <Navbar />
        {children}
        <Toaster richColors />
        <Footer />
      </body>
    </html>
  );
}
