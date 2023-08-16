import Image from "next/image";
import Link from "next/link";

const PostCard = ({ post }) => {
    const { image, title, user, createdAt } = post;
    const { name, image: userImage, _id } = user;
    return (
        <div className="px-4 py-3 bg-dark text-white w-full flex flex-col rounded-xl shadow-lg">
            <div className="flex gap-5 flex-1 ">
                <Link href={`/profile/${_id}`}>
                    <div className="bg-white px-1 py-1 rounded-full h-fit">
                        <Image
                            src={userImage}
                            height={40}
                            alt="user image"
                            width={40}
                            className="object-contain rounded-full"
                        />
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
                            src={image}
                            width="0"
                            alt="this is post image"
                            height="0"
                            sizes="100vw"
                            className="w-full h-auto
                            rounded-2xl"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
