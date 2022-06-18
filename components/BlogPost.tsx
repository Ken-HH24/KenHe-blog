import { Blog } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import { getTagUrl } from "utils/tagUtils";
import TagCard from "./TagCard";
import TagGroup from "./TagGrounp";

interface IProps {
  blog: Blog;
}

const BlogPost: React.FC<IProps> = ({ blog }) => {
  return (
    <a className="w-full">
      <div className="w-full mb-8">
        <Link href={blog.url}>
          <div className="flex flex-col justify-between md:flex-row hover:cursor-pointer">
            <h4 className="w-full mb-2 text-lg font-semibold text-gray-900 md:text-xl dark:text-gray-100">
              {blog.title}
            </h4>
          </div>
        </Link>
        {blog.tags.length > 0 && (
          <TagGroup className="mb-4 mt-2 flex flex-wrap gap-4">
            {blog.tags.map((tag) => (
              <TagCard
                key={tag.title}
                title={tag.title}
                url={getTagUrl(tag.title)}
              />
            ))}
          </TagGroup>
        )}
        <div className="text-sm text-slate-600 mb-1">
          {format(parseISO(blog.date), "LLLL d, yyyy")}
        </div>
        <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
          Why is Rust being used to replace parts of the JavaScript web
          ecosystem like minification (Terser), transpilation (Babel),
          formatting (Prettier), bundling (webpack), linting (ESLint), and more?
        </p>
      </div>
    </a>
  );
};

export default BlogPost;
