import Image from "next/image";

const CustomPostCard = ({ post }) => {
    const { image, title, user, createdAt } = post;
    return (
        <div className="px-4 py-3 bg-dark text-white w-full flex flex-col rounded-xl shadow-lg">
            <div className="flex gap-5 flex-1 ">
                <div className="flex flex-col ">
                    <div className="py-1">{title}</div>
                    <p className="font-light text-slate-200 text-xs justify-end">
                        {createdAt}
                    </p>
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
