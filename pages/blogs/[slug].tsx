import Head from 'next/head';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { allBlogs } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { InferGetStaticPropsType } from 'next';
import React from 'react';
import ThemeButton from 'components/ThemeButton';

export async function getStaticPaths() {
  const paths = allBlogs.map((post) => post.url);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const blog = allBlogs.find((blog) => blog._raw.flattenedPath === params.slug);
  return {
    props: {
      blog,
    },
  };
}

const BlogLayoutHeader = () => {
  return (
    <div className="mb-6 flex items-center">
      <Link href="/">
        <div className="flex items-center hover:cursor-pointer">
          <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2477" width="25" height="25">
            <path
              d="M800 480H268.8l233.6-233.6c12.8-12.8 12.8-32 0-44.8-12.8-12.8-32-12.8-44.8 0l-284.8 288c-12.8 12.8-12.8 32 0 44.8h3.2l284.8 288c6.4 6.4 16 9.6 22.4 9.6 9.6 0 16-3.2 22.4-9.6 12.8-12.8 12.8-32 0-44.8L272 544H800c19.2 0 32-12.8 32-32s-16-32-32-32z"
              p-id="2478"
              fill="#707070"
            ></path>
          </svg>
          <a className="ml-4 font-bold uppercase text-blue-400">Home</a>
        </div>
      </Link>
      <ThemeButton className="ml-auto" />
    </div>
  );
};

const BlogLayout = ({ blog }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const MDXContent = useMDXComponent(blog.body.code);
  return (
    <>
      <Head>
        <title>{blog.title}</title>
      </Head>
      <div className="bg-gray-50 dark:bg-gray-900 px-8">
        <article className="mx-auto max-w-2xl pt-8 pb-16">
          <BlogLayoutHeader />
          <div className="mb-6 text-center flex flex-col items-center">
            <h1 className="mb-4 text-3xl font-bold">{blog.title}</h1>
            <time dateTime={blog.created_date} className="text-sm text-slate-600 mt-2">
              Created at {format(parseISO(blog.created_date), 'LLLL d, yyyy')}
            </time>
            {blog.updated_date && (
              <time dateTime={blog.updated_date} className="text-sm text-slate-600 mt-2">
                Updated at {format(parseISO(blog.updated_date), 'LLLL d, yyyy')}
              </time>
            )}
          </div>
          <div className="prose dark:prose-dark">
            <MDXContent />
          </div>
        </article>
      </div>
    </>
  );
};

export default BlogLayout;
