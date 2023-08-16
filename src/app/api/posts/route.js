import { NextResponse } from "next/server";
import Connection from "@/lib/connectDb";
import Post from "@/lib/post";

Connection();

export async function GET(request) {
    const posts = await Post.find({}).populate("user").sort({ createdAt: -1 });

    return NextResponse.json(posts);
}
