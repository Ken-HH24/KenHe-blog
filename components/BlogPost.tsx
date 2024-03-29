import { Blog } from 'contentlayer/generated';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';

interface IProps {
  blog: Blog;
}

const BlogPost: React.FC<IProps> = ({ blog }) => {
  return (
    <a className="w-full">
      <div className="w-full mb-8">
        <Link href={blog.url}>
          <div className="flex flex-col justify-between md:flex-row hover:cursor-pointer">
            <h4 className="w-full mb-2 text-lg font-bold text-gray-900 md:text-xl dark:text-gray-100">{blog.title}</h4>
          </div>
        </Link>
        <div className="text-sm text-slate-600 mb-2">
          {blog.updated_date ? (
            <span>Updated at {format(parseISO(blog.updated_date), 'LLLL d, yyyy')}</span>
          ) : (
            <span>Created at {format(parseISO(blog.created_date), 'LLLL d, yyyy')}</span>
          )}
        </div>
        <p className="text-gray-600 dark:text-gray-400 line-clamp-2 font-medium tracking-wide">{blog.description}</p>
      </div>
    </a>
  );
};

export default BlogPost;
