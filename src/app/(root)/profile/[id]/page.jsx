import CustomPostCard from "@/components/CustomPostCard";
import FollowerCard from "@/components/FollowerCard";
import PostCard from "@/components/PostCard";
import { getUserPosts } from "@/lib/actions";
import { getCurrentUser } from "@/lib/getData";
import Image from "next/image";

const Profilepage = async ({ params }) => {
    const { id } = params;

    const current = await JSON.parse(JSON.stringify(await getCurrentUser()));

    const { newUser: getUser, newPosts: getPosts } = await getUserPosts(id);

    const user = await JSON.parse(getUser);
    const posts = await JSON.parse(getPosts);

    console.log(user, "this is user");
    const checkFollower = async (user, followers) => {
        for (let i = 0; i < followers.length; i++) {
            if (user == followers[i]) {
                return true;
            }
        }
        return false;
    };

    const isFollower = await checkFollower(current._id, user.followers);

    return (
        <div className="font-bold ">
            <div className="h-[150px] relative">
                <Image
                    src="/bg.jpg"
                    fill
                    alt="this bg"
                    className="w-full h-auto  z-[-1] object-cover"
                />
            </div>
            {user && (
                <div className="bg-dark text-white">
                    <div className="flex justify-center ">
                        <div className="mt-[-40px] flex flex-col items-center">
                            <div className="p-2 h-28 w-28  bg-white rounded-full relative">
                                <Image
                                    src={user?.image}
                                    fill
                                    alt="this is again an image"
                                    className="object-cover rounded-full"
                                />
                            </div>
                            <div className="mt-2 flex flex-col items-center w-full">
                                <p className="font-bold text-xl">{user.name}</p>

                                <FollowerCard
                                    isFollower={isFollower}
                                    follower_count={user.followers.length}
                                    following_count={user.following.length}
                                    currentUser_id={current._id}
                                    user_id={user._id}
                                />
                                <p className="font-light text-xs w-full flex justify-center">
                                    <span className="font-bold">
                                        {" "}
                                        {posts.length}{" "}
                                    </span>{" "}
                                    <span> &nbsp; posts</span>
                                </p>
                                <p>{user.bio}</p>
                            </div>
                        </div>
                    </div>
                    <h1 className="font-bold mt-4 text-2xl px-4 py-2">
                        Recent Posts
                    </h1>
                    <div className="flex flex-wrap w-full h-full gap-2 ">
                        {posts.map((post, index) => (
                            <CustomPostCard
                                key={index}
                                current={current}
                                post={post}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profilepage;
