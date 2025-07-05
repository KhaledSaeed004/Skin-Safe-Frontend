import { useParams } from "react-router-dom";
import { useArticle } from "../features/articles/useArticle";
import { format, parseISO } from "date-fns";
import { getReadingTime } from "../utils/readingTimeFns";
import ReadAloudPlayer from "../components/ReadAloudPlayer";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

function Article() {
  const { id } = useParams();
  const { article, isLoading, error } = useArticle(id);
  const [highlightedSentence, setHighlightedSentence] = useState("");

  useEffect(() => {
    const titleTruncated =
      article?.title?.length > 40
        ? `${article.title.slice(0, 40)}...`
        : article?.title;
    document.title = article?.title
      ? `${titleTruncated} | Skin Safe`
      : "Skin Safe";
    return () => {
      document.title = "Skin Safe";
    };
  }, [article?.title]);

  if (isLoading)
    return (
      <section>
        <div className="relative">
          {/* Image skeleton */}
          <div className="relative max-h-[400px] w-full overflow-hidden rounded-xl">
            <Skeleton height={400} className="w-full object-cover" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Metadata skeleton */}
          <div className="absolute inset-x-0 bottom-4 z-10 flex items-center justify-between">
            <div className="pl-6">
              <h1 className="text-2xl font-semibold text-white">
                <Skeleton width={240} />
              </h1>
              <span className="mt-2 inline-flex items-center gap-4 text-center">
                <p className="text-sm text-gray-300">
                  <Skeleton width={120} inline />
                </p>
                <div className="h-4 w-px bg-gray-300" />
                <p className="text-sm text-gray-300">
                  <Skeleton width={100} inline />
                </p>
                <div className="h-4 w-px bg-gray-300" />
                <span className="text-sm text-gray-300">
                  <Skeleton width={60} inline />
                </span>
              </span>
            </div>

            <div className="pr-6">
              {/* Simulate ReadAloudPlayer */}
              <div className="flex items-center gap-4 text-white">
                <Skeleton circle width={32} height={32} />
                <Skeleton circle width={32} height={32} />
              </div>
            </div>
          </div>
        </div>

        {/* Paragraph skeleton */}
        <div className="mt-6 max-w-none space-y-6 text-lg">
          {Array.from({ length: 4 }).map((_, i) => (
            <p key={i}>
              <Skeleton count={3} />
            </p>
          ))}
        </div>
      </section>
    );

  if (error) return <p>Error: {error.message}</p>;

  const { author, content, updatedAt, image, title } = article;

  const imageUrl = image?.startsWith("http")
    ? image
    : "https://images.unsplash.com/photo-1676312754401-d97fe43c2c4b?q=80&w=2073&auto=format&fit=crop";

  const formattedUpdatedAt = format(parseISO(updatedAt), "MMM d, yyyy");
  const readingTime = getReadingTime(content);

  const getSentenceChunks = (text) =>
    text.match(/[^.!?]+[.!?]+[\])'"`’”]*|.+$/g) || [text];

  return (
    <section>
      <div className="relative">
        <div className="relative max-h-[400px] w-full overflow-hidden rounded-xl">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover"
            title={title}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
        </div>
        <div className="absolute inset-x-0 bottom-4 z-10 flex items-center justify-between">
          <div className="cursor-default pl-6">
            <h1 className="text-2xl font-semibold text-white" title={title}>
              {title}
            </h1>
            <span className="mt-2 inline-flex items-center gap-4 text-center">
              <p className="text-sm text-gray-300">
                By{" "}
                <span className="cursor-pointer hover:text-white">
                  {author}
                </span>
              </p>
              <div className="h-4 w-px bg-gray-300" />
              <p className="text-sm text-gray-300">
                Last updated: {formattedUpdatedAt}
              </p>
              <div className="h-4 w-px bg-gray-300" />
              <span className="text-sm text-gray-300">{readingTime.text}</span>
            </span>
          </div>
          <div className="pr-6">
            <ReadAloudPlayer
              text={content}
              highlightedSentence={highlightedSentence}
              setHighlightedSentence={setHighlightedSentence}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 max-w-none space-y-6 text-lg">
        {content.split("\n").map((para, i) => (
          <p
            key={i}
            className={
              i === 0
                ? "first-letter:float-left first-letter:mr-2 first-letter:text-6xl first-letter:leading-none first-letter:font-bold"
                : ""
            }
          >
            {getSentenceChunks(para).map((sentence, idx) => (
              <span
                key={idx}
                className={
                  sentence.trim() === highlightedSentence.trim()
                    ? "bg-yellow-200 transition duration-200"
                    : ""
                }
              >
                {sentence + " "}
              </span>
            ))}
          </p>
        ))}
      </div>
    </section>
  );
}

export default Article;
