import CustomPostCard from "@/components/CustomPostCard";
import PostCard from "@/components/PostCard";
import { getUserPosts } from "@/lib/actions";
import Image from "next/image";

const Profilepage = async ({ params }) => {
    // const [posts, setPosts] = useState([]);

    // const [user, setUser] = useState(null);

    const { id } = params;

    const { newUser: getUser, newPosts: getPosts } = await getUserPosts(id);

    const user = JSON.parse(getUser);
    const posts = JSON.parse(getPosts);

    return (
        <div className="font-bold ">
            <div className="h-[150px] relative">
                <Image
                    src="/bg.jpg"
                    fill
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
                                    className="object-cover rounded-full"
                                />
                            </div>
                            <div className="mt-2 flex flex-col items-center w-full">
                                <p className="font-bold text-xl">{user.name}</p>
                                <p className="font-light text-xs w-full flex justify-center">
                                    <span className="font-bold">
                                        {" "}
                                        {posts.length}{" "}
                                    </span>{" "}
                                    <span> &nbsp; posts</span>
                                </p>
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
