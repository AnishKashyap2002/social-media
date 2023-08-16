import { NextResponse } from "next/server";
import Connection from "@/lib/connectDb";
import Post from "@/lib/post";
import User from "@/lib/user";
import { getCurrentUser } from "@/lib/getData";

Connection();

export async function POST(request) {
    const { _id } = await getCurrentUser();

    const { name, imageUrl } = await request.json();
    console.log(name, imageUrl);

    const user = await User.findOneAndUpdate(
        { _id: _id },
        {
            name,
            image: imageUrl,
        }
    );
    user.save();

    return NextResponse.json(user);
}
