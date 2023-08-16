import { NextResponse } from "next/server";
import Connection from "@/lib/connectDb";
import Post from "@/lib/post";
import User from "@/lib/user";
import { getCurrentUser } from "@/lib/getData";

Connection();

export async function POST(request) {
    const { _id } = await getCurrentUser();

    const { title, imageUrl } = await request.json();
    console.log(title, imageUrl);

    const post = await Post.create({
        title: title,
        image: imageUrl,
        user: _id,
    });
    const user = await User.findOneAndUpdate(
        { _id: _id },
        {
            $push: { posts: post._id },
        }
    );
    user.save();
    post.save();
    console.log(post, "post created");

    return NextResponse.json(post);
}
