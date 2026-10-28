 import type { Metadata } from "next";
 import { Geist, Geist_Mono, Poppins } from "next/font/google";
  import "@/app/globals.css";
import Navbar from "@/components/ui/Navbar";
 import QueryProvider from "@/providers/QueryProvider";

 const poppins = Poppins({
   variable: "--font-sans",
   subsets: ["latin"],
   weight: ["400", "500", "600", "700"],
 });

 const geistSans = Geist({
   variable: "--font-geist-sans",
   subsets: ["latin"],
 });

 const geistMono = Geist_Mono({
   variable: "--font-geist-mono",
   subsets: ["latin"],
 });

 export const metadata: Metadata = {
  title: "Safarni",
   description: "Explore destinations and book your next trip with Safarni.",
 };

 export default function RootLayout({ children }: LayoutProps<"/">) {
   return (
     <html lang="en" className={`${poppins.className} h-full antialiased`}>
       <body className="app-container flex flex-col">
         <QueryProvider>
           <Navbar />
           {children}
       </QueryProvider>
       </body>
     </html>
   );
 



}



















