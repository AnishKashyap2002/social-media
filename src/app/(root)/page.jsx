import PostCard from "@/components/PostCard";
import { fetchAllPosts } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
import { getCurrentUser } from "@/lib/getData";

export default async function Home() {
    // const [loading, setLoading] = useState(false);
    // const [posts, setPosts] = useState([]);

    // const { data: session } = useSession();

    // useEffect(() => {
    //     setLoading(true);
    //     try {
    //         const fetchPosts = async () => {
    //             const newPosts = await fetchAllPosts();

    //             setPosts(JSON.parse(newPosts));
    //         };
    //         fetchPosts();
    //     } catch (error) {
    //         console.log("error is", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // }, []);

    const result = await fetchAllPosts();

    const response = await getCurrentUser();

    const currentUser = JSON.parse(JSON.stringify(response));

    const posts = await JSON.parse(result);

    return (
        <div
            className="flex sm:flex-wrap gap-10
         flex-col"
        >
            <div className="flex flex-wrap gap-5 sm:flex-row flex-col mt-5">
                {posts.map((post, index) => (
                    <PostCard
                        key={index}
                        currentUser_id={currentUser._id}
                        post={post}
                    />
                ))}
            </div>
        </div>
    );
}
