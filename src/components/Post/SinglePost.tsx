import Link from "next/link";
import React from "react";

type Props = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  slug: string;
  isPagenationPage: boolean;
};

const SinglePost = (props: Props) => {
  const { title, description, date, tags, slug, isPagenationPage } = props;

  return (
    <>
      {isPagenationPage ? (
        <section className="bg-gray-500 text-white rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <div className="lg: flex items-center justify-between mb-4">
            <h2 className="text-2xl font-medium">
              <Link href={`/posts/${slug}`}>{title}</Link>
            </h2>
            <div className="text-gray-400">{date}</div>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag: string, index: number) => (
              <Link href={`/posts/tag/${tag}/page/1`} key={index}>
                <span className="text-sm bg-blue-500 rounded-full px-3 py-1 font-medium">
                  {tag}
                </span>
              </Link>
            ))}
          </div>
          <p className="text-gray-300">{description}</p>
        </section>
      ) : (
        <section className="bg-gray-500 text-white rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-medium">
              <Link href={`/posts/${slug}`}>{title}</Link>
            </h2>
            <div className="text-gray-400">{date}</div>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag: string, index: number) => (
              <Link href={`/posts/tag/${tag}/page/1`} key={index}>
                <span className="text-sm bg-blue-500 rounded-full px-3 py-1 font-medium">
                  {tag}
                </span>
              </Link>
            ))}
          </div>
          <p className="text-gray-300">{description}</p>
        </section>
      )}
    </>
  );
};

export default SinglePost;
