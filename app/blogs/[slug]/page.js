"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import ModalForm from "@/components/ModalForm";

const BlogPost = () => {
  const { slug } = useParams(); // Get the dynamic slug from the URL
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false); // State to control modal visibility
  const router = useRouter();

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await axios.get(`/api/blogs/${slug}`); // Fetch single blog by slug
        setBlog(response.data);
      } catch (err) {
        console.error("Error fetching blog post:", err);
        setError("Failed to fetch blog post.");
      }
    };

    if (slug) {
      fetchBlogPost();
    }
  }, [slug]);

  const handleBlogDelete = async () => {
    try {
      const response = await axios.delete(`/api/blogs/${slug}`);
      if (response.status === 200) {
        router.push("/blogs");
      }
    } catch (err) {
      console.error("Error deleting blog post:", err);
      setError("Failed to delete blog post.");
    }
  };

  const handleUpdate = async (formData) => {
    try {
      const response = await axios.put(`/api/blogs/${slug}`, formData);
      if (response.status === 200) {
        setBlog(response.data);
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      setError("Failed to update blog post.");
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!blog) {
    return <p>Loading...</p>;
  }

  return (
    <div className=" p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {blog?.tags?.map((tag, index) => (
          <span key={index}>{tag.name} </span>
        ))}
      </p>
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {blog.title}
      </h5>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {blog.description}
      </p>
      <button
        className="bg-blue-500 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg hover:bg-blue-600"
        onClick={() => setOpen(true)}
      >
        Edit
      </button>
      <button
        className="ml-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-600"
        onClick={handleBlogDelete}
      >
        Delete
      </button>

      <ModalForm
        open={open}
        handleClose={() => setOpen(false)}
        blogData={blog}
        handleUpdate={handleUpdate}
      />
    </div>
  );
};

export default BlogPost;
