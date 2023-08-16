import Image from "next/image";
import Link from "next/link";
import React from "react";

const UserCard = ({ user }) => {
    return (
        <Link href={`/profile/${user._id}`}>
            <div className="flex justify-between rounded-md shadow-lg items-center w-full bg-dark px-4 py-2 ">
                <div className="flex gap-2 items-center">
                    <div className="p-1 rounded-full">
                        <Image
                            src={user.image}
                            width={40}
                            height={40}
                            alt="user image"
                            className="object-contain rounded-full"
                        />
                    </div>
                    <h1 className="font-bold text-white">{user.name}</h1>
                </div>
                <div className="font-light text-white">
                    <span className="font-bold">{user.posts.length}</span>
                    &nbsp; posts
                </div>
            </div>
        </Link>
    );
};

const UsersFeed = ({ users }) => {
    return (
        <div
            className="flex flex-col 
        justify-center gap-2
        mt-10 px-4"
        >
            {users.map((user, index) => (
                <UserCard
                    key={index}
                    user={user}
                />
            ))}
        </div>
    );
};

export default UsersFeed;
