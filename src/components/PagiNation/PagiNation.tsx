import Link from "next/link";
import React from "react";
import { getPageLink } from "../../../lib/blog-helper";

interface Props {
  numberOfPage: number;
  tag: string;
}

function PagiNation(props: Props) {
  const { numberOfPage, tag } = props;

  return (
    <section className="mb-8 lg:w-1/2 mx-auto rounded-md p-5">
      <ul className="flex items-center justify-center gap-4">
        {Array.from({ length: numberOfPage }, (_, index) => index + 1).map(
          (page) => (
            <li className="bg-gray-500 rounded-lg w-6 h-8 relative" key={page}>
              <Link
                href={getPageLink(tag, page)}
                className="text-xs absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
              >
                {page}
              </Link>
            </li>
          )
        )}
      </ul>
    </section>
  );
}

export default PagiNation;
