import Container from "../components/ui/Container";
import Card from "../components/Articles/Card";
import { useArticles } from "../features/articles/useArticles";
import Skeleton from "react-loading-skeleton";

function Articles() {
  const { articles, isLoading, error } = useArticles();

  if (isLoading)
    return (
      <>
        <div className="relative w-full pt-4">
          <Skeleton width={200} height={40} />
        </div>
        <div className="grid grid-cols-1 gap-6 py-6 sm:grid-cols-2 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="group relative flex h-[418px] flex-col justify-between rounded-xl bg-white p-5 pb-4 shadow"
            >
              <div>
                <div className="relative max-h-64 w-full overflow-hidden rounded-lg">
                  <div className="absolute top-3 left-3 z-10 rounded-lg px-3 py-1.5">
                    <Skeleton width={80} height={20} />
                  </div>
                  <Skeleton
                    height={180}
                    className="w-full object-cover object-bottom"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">
                    <Skeleton width={`80%`} />
                  </h3>
                  <p className="mt-2 text-gray-600">
                    <Skeleton width={`60%`} />
                  </p>
                </div>
              </div>
              <div className="flex items-end justify-end">
                <Skeleton width={100} height={20} />
              </div>
            </div>
          ))}
        </div>
      </>
    );

  if (error)
    return <p className="py-10 text-center text-red-500">{error.message}</p>;

  return (
    <>
      <div className="relative w-full pt-4">
        <h2 className="text-primary-text text-5xl font-bold">Articles</h2>
      </div>
      <div className="grid grid-cols-1 gap-6 py-6 sm:grid-cols-2 md:grid-cols-3">
        {articles?.map((article) => (
          <Card key={article._id} article={article} />
        ))}
      </div>
    </>
  );
}

export default Articles;
