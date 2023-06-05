import SinglePost from "../components/Post/SinglePost";
import { getAllTages, getPostTopPage } from "../../lib/notionAPI";
import { GetStaticProps } from "next";
import Link from "next/link";
import Tag from "@/components/Tag/Tag";

export const getStaticProps: GetStaticProps = async () => {
  const topPosts = await getPostTopPage();
  const allTags = await getAllTages();

  return {
    props: {
      topPosts,
      allTags,
    },
    revalidate: 60 * 60 * 3,
  };
};

export default function Home({
  topPosts,
  allTags,
}: {
  topPosts: string[];
  allTags: string[];
}) {
  return (
    <div className="container mx-auto px-4">
      <title>Notion-Study</title>
      <main className="mt-16">
        <h1 className="text-5xl font-medium text-center mb-16">Study Blog</h1>
        <p className="text-center text-gray-600 mb-8">
          モダンフロントエンドについて学ぶ
        </p>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {topPosts.map((post: any) => (
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

        <Link
          href="/posts/page/1"
          className="block w-full max-w-sm mx-auto mt-8 bg-gray-200 hover:bg-gray-300 text-center py-2 px-4 rounded-md text-gray-800 font-medium transition-colors duration-300"
        >
          ...もっと見る
        </Link>
        <Tag tags={allTags}></Tag>
      </main>
    </div>
  );
}
