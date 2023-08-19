"use client";
import { useRouter } from "next/navigation";

import { deletePost } from "@/lib/actions";
import { toast } from "react-hot-toast";

const DeleteButton = ({ id }) => {
    const router = useRouter();

    const handleDelete = async (e) => {
        e.preventDefault();

        const isDeleted = await deletePost(id);
        if (isDeleted) {
            toast.success("Post deleted Succesfully");
            setTimeout(() => {
                router.back();
            }, [1000]);
        }
    };

    return (
        <button
            className=" fond-bold text-xl bg-[#ff0000] text-white px-4 mb-4 rounded-md py-2"
            onClick={handleDelete}
        >
            Delete
        </button>
    );
};

export default DeleteButton;
