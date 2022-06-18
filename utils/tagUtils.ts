import { allBlogs } from "contentlayer/generated";

export function getTagUrl(title: string) {
  return `/tags/${title}`.replaceAll(" ", "_");
}

export function getTagsInfo() {
  const tagCountMap = {};
  const tagUrlMap = {};
  const tagTitleArr = [];

  allBlogs.forEach((blog) => {
    (blog.tags || []).forEach((tag) => {
      const title = tag.title;
      if (tagCountMap[title]) {
        tagCountMap[title] = tagCountMap[title] + 1;
      } else {
        tagCountMap[title] = 1;
        tagTitleArr.push(title);
        tagUrlMap[title] = getTagUrl(title);
      }
    });
  });

  return { tagCountMap, tagUrlMap, tagTitleArr };
}
