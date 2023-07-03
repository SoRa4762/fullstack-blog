import { NextResponse } from "next/server";
import { PostContentType, paramsType } from "@app/helper/types";
import Post from "@models/Post";
import connect from "@utils/db";

export const GET = async (request, { params }: paramsType) => {
  const { id } = params;
  console.log(params);

  try {
    await connect();
    const post = await Post.findById(id);
    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error!", { status: 500 });
  }
};

export const DELETE = async (request, { params }: paramsType) => {
  const { id } = params;
  console.log(params);

  try {
    await connect();
    await Post.findByIdAndDelete(id);
    return new NextResponse("Post Has been deleted", { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error!", { status: 500 });
  }
};

export const UPDATE = async (
  request: PostContentType,
  { params }: paramsType
) => {
  const body = await request.json();
  const { id } = params;

  try {
    await connect();
    await Post.findByIdAndUpdate({ id }, body);
    return new NextResponse("Post has been Updated!", { status: 201 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Could not Update Post!", { status: 500 });
  }
};
