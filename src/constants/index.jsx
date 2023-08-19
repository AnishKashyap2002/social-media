import { AiOutlineDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";

export const dropdownItems = [
    {
        name: "Edit",
        bgColor: "bg-[#00ff00]",
        icon: <FaEdit />,
        path: "/editPost",
    },
    {
        name: "Delete",
        bgColor: "bg-[#ff0000]",
        icon: <AiOutlineDelete />,
        path: "/deletePost",
    },
];
