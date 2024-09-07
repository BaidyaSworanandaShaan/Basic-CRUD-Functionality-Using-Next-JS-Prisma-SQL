import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  try {
    // Fetch all blogs along with their associated tags
    const blogs = await prisma.blog.findMany({
      include: {
        tags: true, // Include associated tags
      },
    });
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.error();
  }
}

export async function POST(request) {
  try {
    const { title, tagNames, description } = await request.json();
    const tagsArray = Array.isArray(tagNames) ? tagNames : tagNames.split(",");
    // Create a new blog with associated tags
    const newBlog = await prisma.blog.create({
      data: {
        title,
        description,
        tags: {
          connectOrCreate: tagsArray.map((name) => ({
            where: { name },
            create: { name },
          })),
        },
      },
    });

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json({ error: "Error creating blog" }, { status: 500 });
  }
}
