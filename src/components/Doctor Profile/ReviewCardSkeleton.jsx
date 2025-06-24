import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function SkeletonReviewCard() {
  return (
    <div className="rounded-lg border border-gray-200 p-4">
      <div className="flex items-center space-x-3">
        <Skeleton circle width={48} height={48} />

        <div className="flex w-full items-center justify-between">
          <span>
            <Skeleton width={100} height={14} />
            <Skeleton width={60} height={10} style={{ marginTop: 4 }} />
          </span>
          <span className="inline-flex items-center gap-1 font-medium">
            <Skeleton width={40} height={16} />
          </span>
        </div>
      </div>
      <Skeleton count={2} height={12} style={{ marginTop: 12 }} />
    </div>
  );
}
