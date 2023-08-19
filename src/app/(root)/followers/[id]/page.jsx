import UsersFeed from "@/components/UsersFeed";
import { getFollowers } from "@/lib/actions";

const Followers = async ({ params }) => {
    const { id } = params;
    const followers = await JSON.parse(await getFollowers(id));

    return (
        <div className="w-full  ">
            <h1 className="text-white font-bold w-full flex justify-center mt-2 text-2xl">
                <p>Followers</p>
            </h1>
            <UsersFeed users={followers} />
        </div>
    );
};

export default Followers;
