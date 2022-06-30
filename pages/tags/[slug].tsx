import BlogPost from "components/BlogPost";
import Container from "components/Container";
import { allBlogs } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { InferGetStaticPropsType } from "next";
import { useState } from "react";
import { getTagUrl } from "utils/tagUtils";

export async function getStaticPaths() {
  const paths = [];
  const pathSet = new Set<string>();
  allBlogs.forEach((blog) => {
    blog.tags.forEach((tag) => {
      if (!pathSet.has(tag.title)) {
        pathSet.add(tag.title);
        paths.push(getTagUrl(tag.title));
      }
    });
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const target = params.slug.replace("_", " ");
  const blogs = allBlogs
    .filter((blog) => blog.tags.some((tag) => tag.title === target))
    .sort((a, b) => {
      return compareDesc(
        new Date(a.updated_date ? a.updated_date : a.created_date),
        new Date(b.updated_date ? b.updated_date : b.created_date)
      );
    });

  return {
    props: {
      tag: target,
      blogs,
    },
  };
}

const BlogPage = ({
  tag,
  blogs,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [searchValue, setSearchValue] = useState("");
  const filteredBlogPosts = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <Container>
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
        <div className="mb-8 w-2xl text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          {tag} Tag
        </div>
        <div className="relative w-full mb-8">
          <input
            aria-label="Search articles"
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search articles"
            className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-200 rounded-md dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
          />
          <svg
            className="absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        {!filteredBlogPosts.length && (
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            No blogs found.
          </p>
        )}
        {filteredBlogPosts.map((blog) => (
          <BlogPost key={blog.title} blog={blog} />
        ))}
      </div>
    </Container>
  );
};

export default BlogPage;
