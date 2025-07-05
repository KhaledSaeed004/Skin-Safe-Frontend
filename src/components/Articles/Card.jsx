// src/components/Card.jsx
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { format, parseISO } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLinkIcon } from "../../utils/Icons";

const Card = ({ article }) => {
  const { _id, updatedAt, title, author, image } = article;

  const imageUrl = image?.startsWith("http")
    ? image
    : "https://images.unsplash.com/photo-1676312754401-d97fe43c2c4b?q=80&w=2073&auto=format&fit=crop";

  const date = updatedAt
    ? format(parseISO(updatedAt), "dd MMM, yyyy")
    : "Unknown";

  return (
    <div className="group relative flex h-[418px] flex-col justify-between rounded-xl bg-white p-5 pb-4 shadow transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
      <div>
        <div className="relative max-h-64 w-full overflow-hidden rounded-lg">
          <div className="bg-primary absolute top-3 left-3 z-10 rounded-lg px-3 py-1.5 text-white">
            <time className="cursor-default text-sm">{date}</time>
          </div>
          <img
            src={imageUrl}
            alt={title}
            className="w-full transform object-cover object-bottom transition duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-110"
          />
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="mt-2 text-gray-600">
            {author ? `By ${author}` : "Author Unknown"}
          </p>
        </div>
      </div>
      <div className="flex items-end justify-start">
        <Link
          to={`/articles/${_id}`}
          className="text-primary hover:text-primary-text relative ms-auto flex items-center gap-1 rounded-2xl text-base transition-all duration-300"
        >
          Read More
          <ArrowLinkIcon size={20} />
        </Link>
      </div>
    </div>
  );
};

export default Card;
