import CustomPostCard from "@/components/CustomPostCard";
import DeleteButton from "@/components/DeleteButton";
import { currentUser, deletePost, getPost } from "@/lib/actions";
import { getCurrentUser } from "@/lib/getData";
import { toast } from "react-hot-toast";

const Page = async ({ params }) => {
    const { id } = params;

    const result = await getPost(id);

    const current = await getCurrentUser();

    const post = await JSON.parse(result);

    return (
        <div className="w-full flex  justify-center mb-20 px-4">
            <div className="mt-10 rounded-xl bg-slate-900 text-white flex flex-col gap-2 items-center justify-center w-fit overflow-hidden ">
                <p className="font-bold text-[#ff0000] px-4 py-2 ">
                    Are you sure you want to delte this post..
                </p>
                {post && (
                    <CustomPostCard
                        post={post}
                        current={current}
                    />
                )}
                <DeleteButton id={id} />
            </div>
        </div>
    );
};

export default Page;
