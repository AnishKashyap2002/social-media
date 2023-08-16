"use client";
import CustomPostCard from "@/components/CustomPostCard";
import PostCard from "@/components/PostCard";
import Image from "next/image";
import { useEffect, useState } from "react";

const Profilepage = ({ params }) => {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);
    const { id } = params;

    useEffect(() => {
        const getPosts = async () => {
            const response = await fetch("/api/posts/user", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: id,
                }),
            });
            const newPosts = await response.json();
            console.log(newPosts);
            setPosts(newPosts);
        };
        const getUser = async () => {
            const response = await fetch("/api/user", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: id,
                }),
            });
            const newUser = await response.json();
            console.log(newUser);
            setUser(newUser);
        };
        getPosts();
        getUser();
    }, []);
    return (
        <div className="font-bold ">
            <div className="h-[150px] relative">
                <Image
                    src="/bg.jpg"
                    fill
                    className="w-full h-auto  z-[-1] object-cover"
                />
            </div>
            {user && (
                <div className="bg-dark text-white">
                    <div className="flex justify-center ">
                        <div className="mt-[-40px] flex flex-col items-center">
                            <div className="p-2 bg-white rounded-full">
                                <Image
                                    src={user?.image}
                                    height={90}
                                    width={90}
                                    className="object-contain rounded-full"
                                />
                            </div>
                            <div className="mt-2 flex flex-col items-center w-full">
                                <p className="font-bold text-xl">{user.name}</p>
                                <p className="font-light text-xs w-full flex justify-center">
                                    <span className="font-bold">
                                        {" "}
                                        {posts.length}{" "}
                                    </span>{" "}
                                    <span> &nbsp; posts</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <h1 className="font-bold mt-4 text-2xl px-4 py-2">
                        Recent Posts
                    </h1>
                    <div className="flex flex-wrap w-full h-full gap-2 ">
                        {posts.map((post, index) => (
                            <CustomPostCard
                                key={index}
                                post={post}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profilepage;
