import { NextResponse } from "next/server";
import prisma from "@/lib/prismaClient"; // Adjust the path to your prisma client

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const blog = await prisma.blog.findUnique({
      include: {
        tags: true,
      },
      where: {
        id: parseInt(id),
      },
    });

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function PUT(request, { params }) {
  const { id } = params; // Extract ID from params
  const { title, tagNames, description } = await request.json();

  // Handle tagNames as a comma-separated string
  const tagsArray = tagNames.split(",").map((tag) => tag.trim());

  console.log("PUT request received:");
  console.log("ID:", id);
  console.log("Title:", title);
  console.log("Tag Names:", tagsArray);
  console.log("Description:", description);
  try {
    // Update the blog post with the given ID
    const updatedBlog = await prisma.blog.update({
      where: { id: parseInt(id) }, // Use ID to identify the blog post
      data: {
        title,
        description,
        tags: {
          set: [], // Clear existing tags
          connectOrCreate: tagsArray.map((name) => ({
            where: { name },
            create: { name },
          })),
        },
      },
      include: { tags: true }, // Include tags in the response
    });

    return NextResponse.json(updatedBlog); // Respond with the updated blog
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json(
      { error: "Error updating blog post", details: error.message },
      { status: 500 } // Return a 500 status code on error
    );
  }
}
export async function DELETE(req) {
  try {
    // Extract the blog ID from the URL
    const url = new URL(req.url);
    const id = Number(url.pathname.split("/").pop()); // Ensure this matches your route pattern

    // Check if ID is valid
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    // Delete the blog with the given ID
    const deletedBlog = await prisma.blog.delete({
      where: {
        id: id, // Use the ID here
      },
    });

    return NextResponse.json({
      message: "Blog deleted successfully",
      deletedBlog,
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ error: "Error deleting blog" }, { status: 500 });
  }
}
