"use client";
import { AiFillDelete, AiOutlineDelete } from "react-icons/ai";

import { toast } from "react-hot-toast";
import { deleteComment } from "@/lib/actions";

const DeleteComment = ({ post_id, comment_id }) => {
    const handleDelete = async (e) => {
        e.preventDefault();

        const isDeleted = await deleteComment(post_id, comment_id);
        if (isDeleted) {
            toast.success("Comment Deleted");
        }
    };

    return (
        <div
            className="text-white text-lg cursor-pointer"
            onClick={handleDelete}
        >
            <AiFillDelete />
        </div>
    );
};

export default DeleteComment;
