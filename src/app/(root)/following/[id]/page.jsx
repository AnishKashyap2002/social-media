import UsersFeed from "@/components/UsersFeed";
import { getFollowing } from "@/lib/actions";

const Following = async ({ params }) => {
    const { id } = params;
    const following = await JSON.parse(await getFollowing(id));

    return (
        <div className="w-full  ">
            <h1 className="text-white font-bold w-full flex justify-center mt-2 text-2xl">
                <p>Following</p>
            </h1>
            <UsersFeed users={following} />
        </div>
    );
};

export default Following;
