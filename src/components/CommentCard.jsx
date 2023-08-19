import { getComment } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import DeleteComment from "./DeleteComment";

const CommentCard = async ({ comment, currentUser_id }) => {
    const { user } = JSON.parse(await getComment(comment._id));

    const isOwner = currentUser_id == user._id;

    return (
        <div className="px-4 py-3 bg-dark text-white w-full flex flex-col rounded-xl shadow-lg h-full">
            <div className="flex gap-5 flex-1 ">
                <Link href={`/profile/${user._id}`}>
                    <div className="flex flex-col h-full items-center">
                        <div className="bg-white px-1 py-1  rounded-full relative h-10 w-10 overflow-hidden">
                            <Image
                                src={user.image}
                                alt="user image"
                                fill
                                className="object-cover rounded-full"
                            />
                        </div>
                        <p className="h-full w-[1px] opacity-80 bg-white" />
                    </div>
                </Link>

                <div className="flex flex-col w-full ">
                    <div className="flex justify-between  ">
                        <div className="flex flex-col">
                            <p className="font-bold ">{user.name}</p>
                            <p className="font-light text-slate-200 text-xs">
                                {comment.createdAt}
                            </p>
                        </div>
                        {isOwner && (
                            <DeleteComment
                                comment_id={comment._id}
                                post_id={comment.post}
                            />
                        )}
                    </div>
                    <div className="py-4">{comment.title}</div>
                </div>
            </div>
        </div>
    );
};

export default CommentCard;
