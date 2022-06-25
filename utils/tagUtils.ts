import { allBlogs } from "contentlayer/generated";

const TAG_COLOR = [
  "from-cyan-400 to-teal-200 shadow-sky-300",
  "from-pink-400 to-rose-300 shadow-red-200",
  "from-violet-400 to-purple-200 shadow-fuchsia-200",
  "from-amber-400 to-yellow-200 shadow-orange-200",
  "from-lime-300 to-emerald-300 shadow-teal-200",
];

const TAG_COLOR_INDEX_MAP = {
  "Next.js": 0,
};

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

export const getTagCardBgColor = (title: string) => {
  const index = TAG_COLOR_INDEX_MAP[title] ?? TAG_COLOR_INDEX_MAP[0];
  return TAG_COLOR[index];
};
