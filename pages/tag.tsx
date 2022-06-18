import TagCard from "components/TagCard";
import TagGroup from "components/TagGrounp";
import { allBlogs } from "contentlayer/generated";
import { InferGetStaticPropsType } from "next";
import { getTagsInfo, getTagUrl } from "utils/tagUtils";
import Container from "../components/Container";

export function getStaticProps() {
  const { tagCountMap, tagTitleArr, tagUrlMap } = getTagsInfo();

  return { props: { tagCountMap, tagTitleArr, tagUrlMap } };
}

const TagPage = ({
  tagCountMap,
  tagTitleArr,
  tagUrlMap,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Container>
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
        <div className="mb-12 w-2xl text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          Tag
        </div>
        <TagGroup className="w-[42rem] mx-auto flex flex-wrap gap-4">
          {tagTitleArr.map((title, index) => (
            <TagCard
              key={index}
              title={title}
              num={tagCountMap[title]}
              url={tagUrlMap[title]}
            />
          ))}
        </TagGroup>
      </div>
    </Container>
  );
};

export default TagPage;
