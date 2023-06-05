import { GetStaticPaths, GetStaticProps } from "next";
import SinglePost from "@/components/Post/SinglePost";
import PagiNation from "@/components/PagiNation/PagiNation";
import Tag from "@/components/Tag/Tag";
import {
  getAllTages,
  getNumberOfPageByTag,
  getPostsByTagAndPage,
} from "../../../../../../lib/notionAPI";

export const getStaticPaths: GetStaticPaths = async () => {
  const allTags = await getAllTages();
  let params: any[] = [];

  await Promise.all(
    allTags.map((tag: string) => {
      return getNumberOfPageByTag(tag).then((numberOfPagesByTag: number) => {
        for (let i = 1; i <= numberOfPagesByTag; i++) {
          params.push({ params: { tag: tag, page: i.toString() } });
        }
      });
    })
  );

  return {
    paths: params,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const currentPage = context.params?.page as string;
  const currentTag = context.params?.tag?.toString() as string;

  const UpperCaseCurrentTag =
    currentTag.charAt(0).toUpperCase() + currentTag.slice(1);
  const posts = await getPostsByTagAndPage(
    UpperCaseCurrentTag,
    parseInt(currentPage, 10)
  );

  const numberOfPagesByTag = await getNumberOfPageByTag(UpperCaseCurrentTag);

  const allTags = await getAllTages();

  return {
    props: {
      posts,
      numberOfPagesByTag,
      UpperCaseCurrentTag,
      allTags,
    },
    revalidate: 10,
  };
};

const BlogTagPageLists = ({
  numberOfPagesByTag,
  posts,
  currentTag,
  allTags,
}: {
  posts: any;
  numberOfPagesByTag: number;
  currentTag: string;
  allTags: string[];
}) => {
  return (
    <div className="container mx-auto px-4">
      <title>Study-Card</title>
      <main className="mt-16">
        <h1 className="text-5xl font-medium text-center mb-16">Study-Card</h1>
        <p className="text-center text-gray-600 mb-8">
          Learning programming for each card.
        </p>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: any) => (
            <SinglePost
              key={post.slug}
              title={post.title}
              description={post.description}
              date={post.date}
              tags={post.tags}
              slug={post.slug}
              isPagenationPage={false}
            />
          ))}
        </div>
        <PagiNation
          numberOfPage={numberOfPagesByTag}
          tag={currentTag}
        ></PagiNation>
        <Tag tags={allTags}></Tag>
      </main>
    </div>
  );
};

export default BlogTagPageLists;
