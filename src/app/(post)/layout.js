import Footer from "@/components/Footer";
import toast, { Toaster } from "react-hot-toast";

import "@/app/globals.css";

export const metadata = {
    title: "Create a post",
};

export default function Layout({ children }) {
    return (
        <html lang="en">
            <body>
                <div className="flex justify-center w-full bg-[url('/form-bg.jpg')] bg-no-repeat bg-cover relative">
                    <div className="max-w-[700px] w-full relative min-h-screen">
                        {children}
                    </div>
                    <Footer position="absolute" />
                </div>
                <Toaster />
            </body>
        </html>
    );
}
