import Provider from "@/components/Provider";
import Footer from "@/components/Footer";

import "@/app/globals.css";

export const metadata = {
    title: "Create a post",
};

export default function Layout({ children }) {
    return (
        <html lang="en">
            <body>
                <div className="flex justify-center w-full bg-gradient-to-r from-slate-200 to-slate-400 ">
                    <div className="max-w-[700px] w-full relative min-h-screen">
                        {children}
                        <Footer position="absolute" />
                    </div>
                </div>
            </body>
        </html>
    );
}
