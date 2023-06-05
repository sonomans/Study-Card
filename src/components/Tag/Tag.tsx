import Link from "next/link";
import React from "react";

type Props = {
  tags: string[];
};

const Tag = (props: Props) => {
  const { tags } = props;

  return (
    <div className="m-10">
      <section>
        <div className="font-medium mb-4">Tags</div>
        <div className="flex flex-wrap gap-5">
          {tags.map((tag) => (
            <Link key={tag} href={`/posts/tag/${tag}/page/1`}>
              <span className="cursor-pointer font-medium px-2 pb-1 rounded-xl bg-gray-300 inline-block ">
                {tag}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Tag;
