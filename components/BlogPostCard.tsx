import Link from "next/link";
import { format, parseISO } from "date-fns";
import React from "react";
import { Blog } from "contentlayer/generated";

interface IProps {
  blog: Blog;
  gradient: string;
}

const BlogPostCard: React.FC<IProps> = ({ blog, gradient }) => {
  return (
    <Link href={blog.url}>
      <a
        className={`transform hover:scale-[1.01] transition-all rounded-xl w-full md:w-1/3 bg-gradient-to-br p-1 ${gradient}`}
      >
        <div className="flex flex-col justify-between h-full bg-white dark:bg-gray-900 rounded-lg p-4">
          <div className="flex flex-col md:flex-row justify-between">
            <h4 className="line-clamp-4 text-lg md:text-lg font-medium mb-6 sm:mb-10 w-full text-gray-900 dark:text-gray-100 tracking-tight">
              {blog.title}
            </h4>
          </div>
          <div className="flex items-center text-gray-800 dark:text-gray-200 capsize">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="ml-2 align-baseline capsize">
              {format(
                parseISO(
                  blog.updated_date ? blog.updated_date : blog.created_date
                ),
                "yyyy.MM.dd"
              )}
            </span>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default BlogPostCard;
