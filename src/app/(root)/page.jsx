"use client";
import PostCard from "@/components/PostCard";
import { fetchAllPosts } from "@/lib/actions";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setLoading(true);
        try {
            const fetchPosts = async () => {
                const newPosts = await fetchAllPosts();

                setPosts(JSON.parse(newPosts));
            };
            fetchPosts();
        } catch (error) {
            console.log("error is", error);
        } finally {
            setLoading(false);
        }
    }, []);
    return (
        <div
            className="flex sm:flex-wrap gap-10
         flex-col"
        >
            {loading ? (
                <div className="flex items-center justify-center">
                    <h1 className="text-black text-2xl ">Loading...</h1>
                </div>
            ) : (
                <div className="flex flex-wrap gap-5 sm:flex-row flex-col mt-5">
                    {posts.map((post, index) => (
                        <PostCard
                            key={index}
                            post={post}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
