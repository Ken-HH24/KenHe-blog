import { compareDesc } from 'date-fns';
import { allBlogs } from 'contentlayer/generated';
import Image from 'next/image';
import Container from '../components/Container';
import BlogPostCard from '../components/BlogPostCard';
import { InferGetStaticPropsType } from 'next';
import ReadAllLink from 'components/ReadAllLink';

export const getStaticProps = () => {
  const blogs = allBlogs
    .sort((a, b) => {
      return compareDesc(
        new Date(a.updated_date ? a.updated_date : a.created_date),
        new Date(b.updated_date ? b.updated_date : b.created_date)
      );
    })
    .slice(0, 3);

  return { props: { blogs } };
};

const GRADIENTS = [
  'from-[#85fcee] via-[#b4bbd5] to-[#e971b8]',
  'from-[#42d392] via-[#50b3bc] to-[#5e8dea]',
  'from-[#fdf611] via-[#fecc62] to-[#fea8a7]',
];

export default function Home({ blogs }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        <div className="flex flex-col-reverse sm:flex-row items-start">
          <div className="flex flex-col pr-8">
            <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-1 text-black dark:text-white">Ken He</h1>
            {/* <h2 className="text-gray-700 dark:text-gray-200 mb-4">
              A fontend developer
              <span className="font-semibold">Vercel</span>
            </h2> */}
            <p className="text-gray-600 dark:text-gray-400 mb-16 mt-8">
              A fontend developer in China. Write blogs to record work and life.
            </p>
          </div>
          <div className="w-[80px] sm:w-[190px] relative mb-8 sm:mb-0 mr-auto">
            <Image alt="Ken He" src="/avatar.PNG" width={190} height={190} className="rounded-full filter" />
          </div>
        </div>

        <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black dark:text-white">Latest Posts</h3>
        <div className="flex gap-6 flex-col md:flex-row w-full">
          {blogs.map((blog, index) => (
            <BlogPostCard key={index} blog={blog} gradient={GRADIENTS[index]} />
          ))}
        </div>
        <ReadAllLink title="Read all blogs" url="/blog" />
        <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black dark:text-white">Coming Next ... ...</h3>
        <div className="flex flex-col">
          <span className="mb-4">1. 可复用hook与业务逻辑分离</span>
          <span className="mb-4">2. Formily</span>
          <span className="mb-4">3. useRequest, React Dnd ...</span>
        </div>
      </div>
    </Container>
  );
}
