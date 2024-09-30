import {
  Inter,
} from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import { Toaster } from "sonner";
import { UserProvider } from "./_contexts/userContext";
import { CartProvider } from "./_contexts/cartContext";

// Define all the fonts
const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  title: "Kimmerce",
  description: "E-Commerce webapp created by Karim Atef",
  author: "Karim Atef",
  charset: "UTF-8",
  keywords: "e-commerce, online store, shopping, buy, products, Karim Atef",
  openGraph: {
    type: "website",
    url: "https://your-website-url.com",
    title: "E-Commerce",
    description: "E-Commerce webapp created by Karim Atef",
    images: [
      {
        url: "https://your-website-url.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "E-Commerce webapp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourTwitterHandle",
    title: "E-Commerce",
    description: "E-Commerce webapp created by Karim Atef",
    image: "https://your-website-url.com/twitter-image.jpg",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body
        className={`${inter.className}  grid grid-rows-[auto,1fr,auto] min-h-screen overflow-x-hidden bg-base-100 text-base-content`}
      >
        <Toaster richColors />
        <UserProvider>
          <CartProvider>
          <Navbar />
          <main>{children}</main>
          </CartProvider>
        </UserProvider>
        <Footer />
      </body>
    </html>
  );
}
