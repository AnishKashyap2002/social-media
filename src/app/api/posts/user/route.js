import { NextResponse } from "next/server";
import Connection from "@/lib/connectDb";
import Post from "@/lib/post";

Connection();

export async function POST(request) {
    const { id } = await request.json();
    const posts = await Post.find({ user: id })
        .sort({ createdAt: -1 })
        .limit(5);
    console.log(posts, "this is posts");
    return NextResponse.json(posts);
}
