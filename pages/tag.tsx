import TagCard from "components/TagCard";
import TagGroup from "components/TagGrounp";
import { InferGetStaticPropsType } from "next";
import { getTagsInfo } from "utils/tagUtils";
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
      <div className="flex flex-col items-start justify-start max-w-2xl mx-auto mb-16">
        <div className="mb-8 w-2xl text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          Tag
        </div>
        <div className='w-screen h-2' />
        <div className="flex">
          <TagGroup className="flex flex-wrap gap-4">
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
      </div>
    </Container>
  );
};

export default TagPage;
