import "@/app/globals.css";
import Footer from "@/components/Footer";

export const metadata = {
    title: "Search User",
};

export default function Layout({ children }) {
    return (
        <html lang="en">
            <body>
                <div className="flex justify-center ">
                    <div className="max-w-[700px] w-full relative min-h-screen">
                        {children}
                        <Footer position="fixed" />
                    </div>
                </div>
            </body>
        </html>
    );
}
