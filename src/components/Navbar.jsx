"use client";

import Image from "next/image";
import Link from "next/link";
import { BsFire } from "react-icons/bs";
import { BiDownArrow, BiLogOut, BiUpArrow } from "react-icons/bi";
import { useEffect, useState } from "react";
import { RiProfileFill } from "react-icons/ri";
import { AiOutlineLogout, AiOutlineLogin } from "react-icons/ai";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const { data: session } = useSession();

    const router = useRouter();

    const [isDown, setIsDown] = useState(false);

    return (
        <>
            <div
                className="bg-dark flex
        text-white items-center justify-between px-5 py-2"
            >
                <Link href="/">
                    <div className="flex gap-2 items-center  ">
                        <div className="bg-white rounded-full px-2 py-2">
                            <BsFire className=" text-dark w-8 h-8" />
                        </div>
                        <span>Socials</span>
                    </div>
                </Link>
                {session?.user ? (
                    <div>
                        <div className="flex flex-col items-center relative">
                            <div
                                className="flex gap-2 cursor-pointer"
                                onClick={() => setIsDown(!isDown)}
                            >
                                <div
                                    className="px-1 py-1 bg-white
                            rounded-full h-10 w-10 relative"
                                >
                                    <Image
                                        src={session?.user?.image}
                                        alt="Avatar image"
                                        fill
                                        className="object-cover rounded-full  "
                                    />
                                </div>
                                <div className=" flex gap-1 items-center">
                                    <p>{session?.user?.name}</p>
                                    {isDown ? (
                                        <BiUpArrow className="text-white" />
                                    ) : (
                                        <BiDownArrow className="text-white" />
                                    )}
                                </div>
                            </div>

                            <div
                                className={`absolute top-10 z-10 px-2 py-1 shadow-md w-full
                                bg-light text-black rounded-lg transition ease-in-out duration-[1s]
                                mt-4
                                ${
                                    isDown
                                        ? "translate-y-[0px]"
                                        : "translate-y-[-300px]"
                                }`}
                            >
                                <Link href={`/profile/${session?.user._id}`}>
                                    <p
                                        className="flex gap-2 items-center px-2 py-1 rounded-lg
                                    hover:bg-white
                                        "
                                    >
                                        <span className="cursor-pointer">
                                            <RiProfileFill />
                                        </span>
                                        <span className="cursor-pointer ">
                                            Profile
                                        </span>
                                    </p>
                                </Link>
                                <p
                                    className="flex gap-2 items-center px-2 py-1 rounded-lg
                                    hover:bg-white "
                                    onClick={signOut}
                                >
                                    <span className="cursor-pointer">
                                        <AiOutlineLogin />
                                    </span>
                                    <span className="cursor-pointer ">
                                        Logout
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div
                        className="flex cursor-pointer"
                        onClick={signIn}
                    >
                        <div className="flex flex-row gap-2 items-center">
                            <AiOutlineLogin className="" />
                            <span>SignIn</span>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Navbar;
