"use client";

import "@uploadthing/react/styles.css";
import { toast } from "react-hot-toast";

import { UploadButton } from "@/utils/uploadthing";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createUserPost, getPost, updateUserPost } from "@/lib/actions";

export const Postpage = ({ params }) => {
    const { id } = params;

    useEffect(() => {
        const fetchPost = async () => {
            const result = await getPost(id);
            const post = JSON.parse(result);
            setForm({
                title: post.title,
                imageUrl: post.image,
            });
        };
        fetchPost();
    }, []);

    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        title: "",
        imageUrl: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.title && form.imageUrl) {
            setLoading(true);
            const createPost = async () => {
                try {
                    const isUpdated = await updateUserPost(
                        id,
                        form.title,
                        form.imageUrl
                    );
                    if (isUpdated) {
                        toast.success("Post Updated Successfully :)");

                        setForm({
                            title: "",
                            imageUrl: "",
                        });
                        setTimeout(() => {
                            router.back();
                        }, 1000);
                    } else {
                        toast.error("Something went wrong !!");
                    }
                } catch (error) {
                    console.log("error", error);
                } finally {
                    setLoading(false);
                }
            };
            createPost();
        } else {
            toast.error("All fields are required !!");
        }
    };

    return (
        <div className="w-full py-4 flex mt-10 justify-center mb-20 ">
            <form
                action=""
                onSubmit={handleSubmit}
                className=" sm:min-w-[700px] w-full rounded-xl bg-light shadow-lg bg-opacity-60"
            >
                <div className="text-2xl font-bold text-center">
                    Upload Post
                </div>
                <div className="flex flex-col w-full text-black px-4 py-2 gap-1">
                    <label
                        htmlFor=""
                        className=""
                    >
                        Enter Caption
                    </label>
                    <textarea
                        rows={5}
                        value={form.title}
                        onChange={(e) =>
                            setForm({ ...form, title: e.target.value })
                        }
                        className="w-full bg-dark text-white rounded-xl px-4 py-2 outline-none font-semibold shadow-sm"
                    />
                </div>
                <div className="flex flex-col w-full text-black px-4 py-2 gap-1">
                    <label
                        htmlFor=""
                        className=""
                    >
                        Select Image
                    </label>
                    <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                            // Do something with the response
                            console.log("Files: ", res);

                            setForm({ ...form, imageUrl: res[0].fileUrl });
                            toast.success("Image uploaded");
                        }}
                        onUploadError={(error) => {
                            // Do something with the error.
                            alert(`ERROR! ${error.message}`);
                        }}
                    />

                    {form?.imageUrl && (
                        <div className="flex flex-col">
                            <div className="w-fit px-2 bg-light rounded-2xl flex  flex-col gap-2 justify-center">
                                <Image
                                    src={form.imageUrl}
                                    height={100}
                                    width={100}
                                    className="object-contain rounded-2xl "
                                />
                            </div>
                            <p>{form.title}</p>
                        </div>
                    )}
                    <div className="mt-4">
                        {loading ? (
                            <div className="flex bg-green-700 justify-center rounded-xl px-4 py-3 text-white">
                                Loading...
                            </div>
                        ) : (
                            <button
                                type="submit"
                                className="bg-orange-500 px-4 py-2 rounded-2xl text-white"
                            >
                                Update
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Postpage;

// "use client";

// // You need to import our styles for the button to look right. Best to import in the root /layout.tsx but this is fine
// import "@uploadthing/react/styles.css";

// import { UploadButton } from "~/utils/uploadthing";

// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <UploadButton
//         endpoint="imageUploader"
//         onClientUploadComplete={(res) => {
//           // Do something with the response
//           console.log("Files: ", res);
//           alert("Upload Completed");
//         }}
//         onUploadError={(error) => {
//           // Do something with the error.
//           alert(`ERROR! ${error.message}`);
//         }}
//       />
//     </main>
//   );
// }
