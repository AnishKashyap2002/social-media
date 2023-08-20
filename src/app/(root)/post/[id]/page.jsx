import AddComment from "@/components/AddComment";
import CommentCard from "@/components/CommentCard";
import PostCard from "@/components/PostCard";
import { getPost } from "@/lib/actions";
import { getCurrentUser } from "@/lib/getData";
import postcss from "postcss";

const Page = async ({ params }) => {
    const { id } = params;

    const currentUser = await JSON.parse(
        JSON.stringify(await getCurrentUser())
    );

    const post = await JSON.parse(await getPost(id));

    return (
        <div className="flex flex-col items-center gap-2  relative w-full mb-20">
            <div className="  flex flex-col items-center gap-4">
                <div className="h-fit  origin-top flex justify-center flex-col ">
                    <PostCard
                        currentUser_id={currentUser._id}
                        post={post}
                    />
                </div>
                {post.comments.length > 0 ? (
                    <div className="bg-dark rounded-lg w-full px-4 py-3 flex flex-col gap-4">
                        <h1 className="text-2xl text-white bold">
                            {" "}
                            Recent Comments
                        </h1>
                        <div className="flex flex-col gap-2">
                            {post.comments.map((comment, index) => (
                                <CommentCard
                                    key={index}
                                    currentUser_id={currentUser._id}
                                    comment={comment}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="bg-dark rounded-lg w-full px-4 py-3 flex flex-col gap-4">
                        <h1 className="text-2xl text-white bold">
                            {" "}
                            No comments
                        </h1>
                    </div>
                )}
            </div>
            <AddComment
                currentUser_id={currentUser._id}
                post_id={post._id}
            />
        </div>
    );
};

export default Page;
