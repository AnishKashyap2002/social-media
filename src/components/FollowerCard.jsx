"use client";
import {
    addFollower,
    likePost,
    removeFollower,
    unLikePost,
} from "@/lib/actions";
import Link from "next/link";
import React, { useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { BsShare } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { SlLike } from "react-icons/sl";
import { toast } from "react-hot-toast";
import { RiUserFollowLine, RiUserUnfollowLine } from "react-icons/ri";

const FollowerCard = ({
    follower_count,
    currentUser_id,
    following_count,
    isFollower,
    user_id,
}) => {
    const [newFollower, setNewFollower] = useState(isFollower);

    const [followerCount, setFollowerCount] = useState(follower_count);

    const handleChange = async () => {
        if (newFollower) {
            const remove = await removeFollower(currentUser_id, user_id);
            toast.error("Unfollowed :(");
            setFollowerCount((prev) => prev - 1);
            setNewFollower(false);
        } else {
            const add = await addFollower(currentUser_id, user_id);
            setFollowerCount((prev) => prev + 1);
            toast.success("Followed :)");
            setNewFollower(true);
        }
    };

    return (
        <div className="flex flex-col items-center gap-2 mb-2">
            <div className="">
                {currentUser_id != user_id && (
                    <div
                        className="cursor-pointer"
                        onClick={handleChange}
                    >
                        {newFollower ? (
                            <p className="hover:bg-red-500 text-white px-4 py-2 rounded-xl bg-red-700 flex gap-2 items-center">
                                <RiUserUnfollowLine className="font-bold text-xl" />
                                <span>Unfollow</span>
                            </p>
                        ) : (
                            <p className="hover:bg-blue-500 text-white px-4 py-2 rounded-xl bg-blue-700 flex gap-2 items-center">
                                {" "}
                                <RiUserFollowLine className="font-bold text-xl" />
                                <span>Follow</span>
                            </p>
                        )}
                    </div>
                )}
            </div>
            <div className=" flex gap-4 items-center">
                <Link href={`/followers/${user_id}`}>
                    <div className="px-4 py-2 bg-indigo-600 rounded-lg">
                        {followerCount}{" "}
                        <span className="font-light">Followers</span>{" "}
                    </div>
                </Link>
                <Link href={`/following/${user_id}`}>
                    <div className=" bg-purple-700 px-4 py-2 rounded-lg">
                        {following_count}{" "}
                        <span className="font-light">Following</span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default FollowerCard;

{
    /* <div
                        className="cursor-pointer"
                        onClick={handleChange}
                    >
                        {newFollower ? (
                            < RiUserUnfollowLine className="font-bold text-xl" />
                        ) : (
                            <RiUserFollowLine className="font-bold text-xl" />
                        )}
                    </div> */
}
