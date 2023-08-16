import { NextResponse } from "next/server";
import Connection from "@/lib/connectDb";
import User from "@/lib/user";

Connection();

export async function POST(request) {
    const { id } = await request.json();
    const user = await User.findOne({ _id: id }).lean();
    return NextResponse.json(user);
}
