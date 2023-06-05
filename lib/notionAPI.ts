import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { NUMBER_OF_POSTS_PER_PAGE } from "../constants/constants";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

export const getAllPosts = async () => {
  const posts = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    page_size: 100,
    filter: {
      property: "Published",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: "Date",
        direction: "descending",
      },
    ],
  });

  const allPosts = posts.results;

  return allPosts.map((post) => {
    return getPageMetaData(post);
  });
};

const getPageMetaData = (post: any) => {
  const getTags = (tags: any) => {
    const allTages = tags.map((tag: any) => {
      return tag.name;
    });
    return allTages;
  };
  return {
    title: post.properties.Name.title[0].plain_text,
    description: post.properties.Description.rich_text[0].plain_text,
    date: post.properties.Date.date.start,
    tags: getTags(post.properties.Tags.multi_select),
    slug: post.properties.Slug.rich_text[0].plain_text,
  };
};

export const getSinglePosts = async (slug: string) => {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: "Slug",
      formula: {
        string: {
          equals: slug,
        },
      },
    },
  });
  const page = res.results[0];
  const metadata = getPageMetaData(page);

  const mdBlocks = await n2m.pageToMarkdown(page.id);
  const mdString = n2m.toMarkdownString(mdBlocks);
  console.log(mdString);

  return {
    metadata,
    markdown: mdString,
  };
};

export const getPostTopPage = async (pageSize = 3) => {
  const allPosts = await getAllPosts();
  const topPosts = allPosts.slice(0, pageSize);
  return topPosts;
};

export const getPostsByPage = async (pageNumber: number) => {
  const allPosts = await getAllPosts();

  const startIndex = (pageNumber - 1) * NUMBER_OF_POSTS_PER_PAGE;
  const endIndex = startIndex + NUMBER_OF_POSTS_PER_PAGE;

  return allPosts.slice(startIndex, endIndex);
};

export const getNumberOfPages = async () => {
  const allPosts = await getAllPosts();

  return Math.floor(
    allPosts.length / NUMBER_OF_POSTS_PER_PAGE +
      (allPosts.length % NUMBER_OF_POSTS_PER_PAGE > 0 ? 1 : 0)
  );
};

export const getPostsByTagAndPage = async (
  tagName: string,
  pageNumber: number
) => {
  const allPosts = await getAllPosts();
  const posts = allPosts.filter((post) =>
    post.tags.find((tag: string) => tag === tagName)
  );
  const startIndex = (pageNumber - 1) * NUMBER_OF_POSTS_PER_PAGE;
  const endIndex = startIndex + NUMBER_OF_POSTS_PER_PAGE;

  return posts.slice(startIndex, endIndex);
};

export const getNumberOfPageByTag = async (tagName: string) => {
  const allPosts = await getAllPosts();
  const posts = allPosts.filter((post) =>
    post.tags.find((tag: String) => tag === tagName)
  );

  return Math.floor(
    posts.length / NUMBER_OF_POSTS_PER_PAGE +
      (posts.length % NUMBER_OF_POSTS_PER_PAGE > 0 ? 1 : 0)
  );
};

export const getAllTages = async () => {
  const allPosts = await getAllPosts();

  const alltagsDuplicationLists = allPosts.flatMap((post) => post.tags);
  const set = new Set(alltagsDuplicationLists);
  const allTagList = Array.from(set);

  return allTagList;
};
