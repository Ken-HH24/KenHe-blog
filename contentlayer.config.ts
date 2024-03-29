import { defineDocumentType, defineNestedType, makeSource } from 'contentlayer/source-files';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrism from 'rehype-prism-plus';

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: `**/*.(md|mdx)`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the blog',
      required: true,
    },
    description: {
      type: 'string',
      description: 'The description of the blog',
    },
    created_date: {
      type: 'date',
      description: 'The create date of the blog',
      required: true,
    },
    updated_date: {
      type: 'date',
      description: 'The update date of the blog',
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (blog) => `/blogs/${blog._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({
  contentDirPath: 'blogs',
  documentTypes: [Blog],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      rehypeCodeTitles,
      rehypePrism,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['anchor'],
          },
        },
      ],
    ],
  },
});
