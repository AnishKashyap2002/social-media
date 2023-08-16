import { BsSearchHeartFill, BsFire } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import Link from "next/link";
import { currentUser } from "@/lib/actions";

const Footer = async ({ position }) => {
    return (
        <div
            className={`flex justify-between items-center
    bg-dark text-white max-w-[700px] w-full ${position} bottom-0
    sm:py-2 py-4 px-4`}
        >
            <Link href={"/"}>
                <div className="cursor-pointer ">
                    <div className="px-2 py-2 rounded-full bg-white">
                        <BsFire className="w-6 h-6 text-dark" />
                    </div>
                    <p className="text-white text-xs py-0 sm:block hidden">
                        Home
                    </p>
                </div>
            </Link>
            <Link href="/search/">
                <div className="cursor-pointer ">
                    <div className="px-2 py-2 rounded-full bg-white">
                        <BsSearchHeartFill className="w-6 h-6 text-dark" />
                    </div>
                    <p className="text-white text-xs py-0 sm:block hidden">
                        Search
                    </p>
                </div>
            </Link>
            <Link href="/addpost">
                <div className="cursor-pointer ">
                    <div className="px-2 py-2 rounded-full bg-white  ">
                        <AiOutlinePlusCircle className="w-6 h-6 text-dark" />
                    </div>
                    <p className="text-white text-xs py-0 sm:block hidden">
                        Create
                    </p>
                </div>
            </Link>
            <Link href="/editProfile">
                <div className="cursor-pointer flex flex-col items-center ">
                    <div className="px-2 py-2 rounded-full bg-white  ">
                        <FiSettings className="w-6 h-6 text-dark" />
                    </div>
                    <p className="text-white text-xs py-0 sm:block hidden">
                        Settings
                    </p>
                </div>
            </Link>
        </div>
    );
};

export default Footer;
