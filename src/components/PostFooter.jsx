"use client";
import { likePost, unLikePost } from "@/lib/actions";
import Link from "next/link";
import React, { useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { BsShare } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { SlLike } from "react-icons/sl";
import { usePathname } from "next/navigation";
import { toast } from "react-hot-toast";

const PostFooter = ({ liked, likes, comments, id, currentUser_id }) => {
    const pathName = usePathname();

    const [newLike, setNewLiked] = useState(liked);

    const [likeCount, setLikeCount] = useState(likes.length);

    const handleChange = async () => {
        if (newLike) {
            const remove = await unLikePost(currentUser_id, id);
            setLikeCount((prev) => prev - 1);
            setNewLiked(false);
        } else {
            const add = await likePost(currentUser_id, id);
            setLikeCount((prev) => prev + 1);
            setNewLiked(true);
        }
    };

    return (
        <div className="flex justify-between items-center mt-2">
            <div className="flex items-center gap-2 ">
                <div className="text-white flex flex-col items-center gap-1">
                    <div
                        className="cursor-pointer"
                        onClick={handleChange}
                    >
                        {newLike ? (
                            <AiFillLike className="font-bold text-xl" />
                        ) : (
                            <SlLike className="font-bold text-xl" />
                        )}
                    </div>
                    <p className="text-xs">
                        {" "}
                        <span>{likeCount + " "}</span>
                        Likes
                    </p>
                </div>
                <Link href={`/post/${id}`}>
                    <div className="text-white flex flex-col items-center gap-1">
                        <FaRegComment className="font-bold text-xl" />

                        <p className="text-xs">
                            <span className="">{comments.length + " "} </span>
                            Comments
                        </p>
                    </div>
                </Link>
            </div>
            <div
                className="flex items-center flex-col cursor-pointer"
                onClick={() => {
                    navigator.clipboard.writeText(
                        `${window.location.host}/post/${id}`
                    );
                    toast.success("Copy to clipboard");
                }}
            >
                <BsShare className="text-lg" />
                <p className="text-xs">Share</p>
            </div>
        </div>
    );
};

export default PostFooter;
