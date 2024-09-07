"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";

const Card = () => {
  const [blogDetails, setBlogDetails] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get("/api/blogs");
        setBlogDetails(response.data);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };

    fetchBlogDetails();
  }, []);

  const handleReadMore = (id) => {
    router.push(`/blogs/${id}`);
  };

  return (
    <>
      <Typography component="h1" variant="h5" sx={{ marginBottom: "20px" }}>
        All Blogs
      </Typography>
      <div style={{ display: "flex", gap: "10px" }}>
        {blogDetails?.map((blog) => (
          <div
            key={blog.id}
            className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {blog.tags.map((tag) => (
                <>{tag.name} </>
              ))}
            </p>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {blog.title}
            </h5>

            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {blog.description?.split(" ").slice(0, 10).join(" ")}...
            </p>
            <button
              onClick={() => handleReadMore(blog.id)}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Read more
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Card;
