import { NextResponse } from "next/server";
import Connection from "@/lib/connectDb";
import User from "@/lib/user";

Connection();

export async function POST(request) {
    const { search } = await request.json();

    console.log(search);
    const users = await User.find({
        $or: [{ name: { $regex: search, $options: "xi" } }],
    });

    console.log(users);
    return NextResponse.json(users);
}
