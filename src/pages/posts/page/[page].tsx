import { GetStaticPaths, GetStaticProps } from "next";
import SinglePost from "@/components/Post/SinglePost";
import {
  getAllTages,
  getNumberOfPages,
  getPostsByPage,
} from "../../../../lib/notionAPI";
import PagiNation from "@/components/PagiNation/PagiNation";
import Tag from "@/components/Tag/Tag";

export const getStaticPaths: GetStaticPaths = async () => {
  const numberOfPage = await getNumberOfPages();

  let params = [];
  for (let i = 1; i <= numberOfPage; i++) {
    params.push({ params: { page: i.toString() } });
  }

  return {
    paths: params,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const currentPage = context.params?.page as string;
  const postsByPage = await getPostsByPage(
    parseInt(currentPage.toString(), 10)
  );
  const numberOfPage = await getNumberOfPages();

  const allTags = await getAllTages();
  return {
    props: {
      postsByPage,
      numberOfPage,
      allTags,
    },
    revalidate: 60 * 60 * 3,
  };
};

const BlogPageLists = ({
  postsByPage,
  numberOfPage,
  allTags,
}: {
  postsByPage: any;
  numberOfPage: number;
  allTags: string[];
}) => {
  return (
    <div className="container mx-auto px-4">
      <title>Study-Card</title>
      <main className="mt-16">
        <h1 className="text-5xl font-medium text-center mb-16">Study-Card</h1>
        <p className="text-center text-gray-600 mb-8">
          モダンフロントエンドについて学ぶ
        </p>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {postsByPage.map((post: any) => (
            <SinglePost
              key={post.id}
              title={post.title}
              description={post.description}
              date={post.date}
              tags={post.tags}
              slug={post.slug}
              isPagenationPage={false}
            />
          ))}
        </div>
        <PagiNation numberOfPage={numberOfPage} tag={""}></PagiNation>
        <Tag tags={allTags}></Tag>
      </main>
    </div>
  );
};

export default BlogPageLists;
