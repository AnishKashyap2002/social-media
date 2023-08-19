import Image from "next/image";
import CustomDropdown from "./CustomDropdown";

const CustomPostCard = async ({ post, current }) => {
    const { image, title, user, createdAt, _id } = post;

    return (
        <div className="px-4 py-3 bg-dark text-white w-full flex flex-col rounded-xl shadow-lg">
            <div className="flex gap-5 flex-1 ">
                <div className="flex flex-col ">
                    <div className="flex justify-between ">
                        <div>
                            <div className="py-1">{title}</div>
                            <p className="font-light text-slate-200 text-xs justify-end">
                                {createdAt}
                            </p>
                        </div>

                        {current._id == user && (
                            <div className="cursor-pointer">
                                {/* dropdown */}
                                <CustomDropdown id={_id} />
                                {/* dropdown */}
                            </div>
                        )}
                    </div>
                    <div className=" h-fit w-full relative rounded-2xl mt-2 ">
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

export default CustomPostCard;
