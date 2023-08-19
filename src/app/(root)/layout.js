import Navbar from "@/components/Navbar";
import "../globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import Provider from "@/components/Provider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Socials",
    description: "Socialize with people have fun with soicals",
};

export default function RootLayout({ children }) {
    return (
        <Provider>
            <html lang="en">
                <body
                    className={`${inter.className} flex justify-center bg-background `}
                >
                    <div className=" w-full max-w-[700px] min-h-screen relative pb-20">
                        <Navbar />
                        {children}
                        <Footer position="fixed" />
                    </div>
                    <Toaster />
                </body>
            </html>
        </Provider>
    );
}
