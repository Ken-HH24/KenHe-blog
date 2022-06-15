import { Blog } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import Link from "next/link";

interface IProps {
  blog: Blog;
}

const BlogPost: React.FC<IProps> = ({ blog }) => {
  return (
    <Link href={blog.url}>
      <a className="w-full">
        <div className="w-full mb-8">
          <div className="flex flex-col justify-between md:flex-row">
            <h4 className="w-full mb-2 text-lg font-semibold text-gray-900 md:text-xl dark:text-gray-100">
              {blog.title}
            </h4>
          </div>
          <div className="text-sm text-slate-600 mb-1">
            {format(parseISO(blog.date), "LLLL d, yyyy")}
          </div>
          <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
            Why is Rust being used to replace parts of the JavaScript web
            ecosystem like minification (Terser), transpilation (Babel),
            formatting (Prettier), bundling (webpack), linting (ESLint), and
            more?
          </p>
        </div>
      </a>
    </Link>
  );
};

export default BlogPost;
