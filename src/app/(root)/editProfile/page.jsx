"use client";

import "@uploadthing/react/styles.css";

import { UploadButton } from "@/utils/uploadthing";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { updateUser } from "@/lib/actions";
import { toast } from "react-hot-toast";

export const Editpage = () => {
    const { data: session } = useSession();

    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: session?.user?.name || "",
        bio: session?.user?.bio || "",
        imageUrl: session?.user?.image || "",
    });

    useEffect(() => {
        setForm({
            name: session?.user?.name || "",
            bio: session?.user?.bio || "",
            imageUrl: session?.user?.image || "",
        });
    }, [session]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.name && form.imageUrl) {
            try {
                setLoading(true);
                const isUpdated = await updateUser(
                    session.user._id,
                    form.name,
                    form.bio,
                    form.imageUrl
                );

                if (isUpdated) {
                    toast.success("User updated successfully");
                    setForm({
                        name: "",
                        bio: "",
                        imageUrl: "",
                    });
                }
                setTimeout(() => {
                    router.back();
                }, 1000);
            } catch (error) {
                console.log("error", error);
            } finally {
                setLoading(false);
            }
        } else {
            toast.error("All fields are required !!");
        }
    };

    return (
        <div className="w-full h-full py-4 flex  justify-center mb-20 bg-[url('/hacker.jpg')] bg-cover bg-no-repeat bg-center">
            <form
                action=""
                onSubmit={handleSubmit}
                className="  mt-10 sm:min-w-[700px] w-full rounded-xl bg-light shadow-lg bg-opacity-70 h-fit"
            >
                <div className="text-2xl font-bold text-center">
                    Update User
                </div>
                <div className="flex flex-col w-full text-black px-4 py-2 gap-1">
                    <label
                        htmlFor=""
                        className=""
                    >
                        Enter Name
                    </label>
                    <input
                        type="text"
                        value={form.name}
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                        className="w-full bg-dark text-white rounded-xl px-4 py-2 outline-none font-semibold shadow-sm"
                    />
                </div>
                <div className="flex flex-col w-full text-black px-4 py-2 gap-1">
                    <label
                        htmlFor=""
                        className=""
                    >
                        Enter Bio
                    </label>
                    <textarea
                        rows={4}
                        value={form.bio}
                        onChange={(e) =>
                            setForm({ ...form, bio: e.target.value })
                        }
                        className="w-full bg-dark text-white rounded-xl px-4 py-2 outline-none font-semibold shadow-sm"
                    />
                </div>
                <div className="flex flex-col w-full text-black px-4 py-2 gap-1">
                    <label
                        htmlFor=""
                        className=""
                    >
                        Select Avatar
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

                    {form.imageUrl && (
                        <div className="w-fit px-2 bg-light rounded-2xl flex  flex-col gap-2 justify-center">
                            <Image
                                src={form.imageUrl}
                                height={100}
                                width={100}
                                className="object-contain rounded-2xl "
                            />
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

export default Editpage;
