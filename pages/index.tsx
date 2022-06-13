import { compareDesc, format, parseISO } from "date-fns";
import { allPosts } from "contentlayer/generated";
import Image from "next/image";
import Container from "../components/Container";
import BlogPostCard from "../components/BlogPostCard";
import Link from "next/link";
import { InferGetStaticPropsType } from "next";

export const getStaticProps = () => {
  const posts = allPosts
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    })
    .slice(0, 3);
  return { props: { posts } };
};

const GRADIENTS = [
  "from-[#D8B4FE] to-[#818CF8]",
  "from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]",
  "from-[#FDE68A] via-[#FCA5A5] to-[#FECACA]",
];

export default function Home({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        <div className="flex flex-col-reverse sm:flex-row items-start">
          <div className="flex flex-col pr-8">
            <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-1 text-black dark:text-white">
              Lee Robinson
            </h1>
            <h2 className="text-gray-700 dark:text-gray-200 mb-4">
              Director of Developer Relations at{" "}
              <span className="font-semibold">Vercel</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-16">
              Helping developers build a faster web. Teaching about web
              development, serverless, and React / Next.js.
            </p>
          </div>
          <div className="w-[80px] sm:w-[176px] relative mb-8 sm:mb-0 mr-auto">
            {/* <Image
              alt="Lee Robinson"
              height={176}
              width={176}
              src="/avatar.jpg"
              className="rounded-full filter grayscale"
            /> */}
          </div>
        </div>

        <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black dark:text-white">
          Latest Posts
        </h3>
        <div className="flex gap-6 flex-col md:flex-row w-full">
          {posts.map((post, index) => (
            <BlogPostCard key={index} post={post} gradient={GRADIENTS[index]} />
          ))}
        </div>
        <Link href="/blog">
          <a className="flex mt-8 text-gray-600 dark:text-gray-400 leading-7 rounded-lg hover:text-gray-800 dark:hover:text-gray-200 transition-all h-6">
            Read all posts
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-6 w-6 ml-1"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.5 12h-15m11.667-4l3.333 4-3.333-4zm3.333 4l-3.333 4 3.333-4z"
              />
            </svg>
          </a>
        </Link>
      </div>
    </Container>
  );
}
