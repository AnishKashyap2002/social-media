import { userLikedPost } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import PostFooter from "./PostFooter";

const PostCard = async ({ post, currentUser_id }) => {
    const { image, title, user, createdAt, comments, likes, _id: id } = post;

    const { name, image: userImage, _id } = user;

    const liked = await userLikedPost(currentUser_id, id);

    return (
        <div className="px-4 py-3 bg-dark text-white w-full flex flex-col rounded-xl shadow-lg h-full">
            <div className="flex gap-5 flex-1 ">
                <Link href={`/profile/${_id}`}>
                    <div className="flex flex-col h-full items-center">
                        <div className="bg-white px-1 py-1 rounded-full relative h-10 w-10">
                            <Image
                                src={userImage}
                                alt="user image"
                                fill
                                className="object-cover rounded-full"
                            />
                        </div>
                        <p className="h-full w-[1px] opacity-80 bg-white" />
                    </div>
                </Link>
                <div className="flex flex-col ">
                    <p className="font-bold ">{name}</p>
                    <p className="font-light text-slate-200 text-xs">
                        {createdAt}
                    </p>
                    <div className="py-4">{title}</div>
                    <div className=" h-fit w-full relative rounded-2xl ">
                        <Image
                            src={image || "/error.jpg"}
                            width="0"
                            alt="this is post image"
                            height="0"
                            sizes="100vw"
                            className="w-full h-auto
                            rounded-2xl"
                        />
                    </div>
                    <PostFooter
                        likes={likes}
                        id={id}
                        currentUser_id={currentUser_id}
                        comments={comments}
                        liked={liked}
                    />
                </div>
            </div>
        </div>
    );
};

export default PostCard;
