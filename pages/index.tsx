import { compareDesc } from "date-fns";
import { allBlogs } from "contentlayer/generated";
import Image from "next/image";
import Container from "../components/Container";
import BlogPostCard from "../components/BlogPostCard";
import { InferGetStaticPropsType } from "next";
import TagGroup from "components/TagGrounp";
import { getTagsInfo, getTagUrl } from "utils/tagUtils";
import TagCard from "components/TagCard";
import ReadAllLink from "components/ReadAllLink";
import Avatar from "../public/avatar.png";

export const getStaticProps = () => {
  const { tagCountMap, tagTitleArr, tagUrlMap } = getTagsInfo();
  const blogs = allBlogs
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    })
    .slice(0, 3);

  const popularTagArr = tagTitleArr
    .sort((a, b) => tagCountMap[b] - tagCountMap[a])
    .slice(0, 3);
  return { props: { blogs, popularTagArr, tagCountMap, tagUrlMap } };
};

const GRADIENTS = [
  "from-[#D8B4FE] to-[#818CF8]",
  "from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]",
  "from-[#FDE68A] via-[#FCA5A5] to-[#FECACA]",
];

export default function Home({
  blogs,
  popularTagArr,
  tagCountMap,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        <div className="flex flex-col-reverse sm:flex-row items-start">
          <div className="flex flex-col pr-8">
            <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-1 text-black dark:text-white">
              Alex He
            </h1>
            <h2 className="text-gray-700 dark:text-gray-200 mb-4">
              A fontend developer
              {/* <span className="font-semibold">Vercel</span> */}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-16">
              A graduate in China, interested in Fontend Development. Write
              blogs to record work and life.
            </p>
          </div>
          <div className="w-[80px] sm:w-[190px] relative mb-8 sm:mb-0 mr-auto">
            <Image
              alt="Alex He"
              src={Avatar}
              className="rounded-full filter"
            />
          </div>
        </div>

        <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black dark:text-white">
          Latest Posts
        </h3>
        <div className="flex gap-6 flex-col md:flex-row w-full">
          {blogs.map((blog, index) => (
            <BlogPostCard key={index} blog={blog} gradient={GRADIENTS[index]} />
          ))}
        </div>
        <ReadAllLink title="Read all blogs" url="/blog" />

        <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black dark:text-white">
          Popular tags
        </h3>
        <TagGroup className="flex flex-wrap w-full gap-6">
          {popularTagArr.map((tag) => (
            <TagCard
              key={tag}
              title={tag}
              url={getTagUrl(tag)}
              num={tagCountMap[tag]}
            />
          ))}
        </TagGroup>
        <ReadAllLink title="Read all tags" url="/tag" />
      </div>
    </Container>
  );
}
