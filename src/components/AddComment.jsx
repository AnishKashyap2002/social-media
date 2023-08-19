"use client";

import { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { GiCrossedBones } from "react-icons/gi";
import { commentPost } from "@/lib/actions";
import { toast } from "react-hot-toast";

const AddComment = ({ post_id, currentUser_id }) => {
    const [comment, setComment] = useState("");

    const [open, setOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isCommented = await commentPost(currentUser_id, post_id, comment);
        if (isCommented) {
            toast.success("Commented successfully");
            setComment("");
            setOpen(false);
        }
    };

    return (
        <div className="fixed bottom-24 sm:right-[40%] right-5 flex w-fit items-center gap-1">
            <div
                className={`w-full duration-700 transform flex ease-in-out origin-right ${
                    open ? "scale-100" : "scale-0"
                } `}
            >
                <form className="flex items-center rounded-md text-white bg-dark  px-3 py-2">
                    <div className="">
                        <input
                            placeholder="Comment something..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="bg-dark text-white px-4 py-1 outline-none"
                        />
                    </div>
                    <div className="">
                        <button
                            onClick={handleSubmit}
                            className=" rounded-md text-xl "
                        >
                            <AiOutlineSend />
                        </button>
                    </div>
                </form>
            </div>
            <div
                className="bg-dark rounded-full p-2 text-white h-fit cursor-pointer "
                onClick={() => setOpen((prev) => !prev)}
            >
                {open ? (
                    <GiCrossedBones className="text-white text-2xl" />
                ) : (
                    <IoMdAdd className="text-white text-2xl" />
                )}
            </div>
        </div>
    );
};

export default AddComment;
