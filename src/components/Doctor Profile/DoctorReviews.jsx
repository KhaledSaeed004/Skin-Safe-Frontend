import { useState, useMemo } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import ReviewCard from "./ReviewCard";
import Button from "../ui/Button";
import { useDoctroReviews } from "../../features/doctorProfile/useDoctorReviews";
import { SkeletonReviewCard } from "./ReviewCardSkeleton";

const REVIEWS_PER_PAGE = 4;

export default function DoctorReviews({ reviews }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = useMemo(() => {
    return Math.ceil(reviews.length / REVIEWS_PER_PAGE);
  }, [reviews]);

  const visibleReviews = useMemo(() => {
    const start = (currentPage - 1) * REVIEWS_PER_PAGE;
    const end = start + REVIEWS_PER_PAGE;
    return reviews.slice(start, end);
  }, [currentPage, reviews]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPagination = () => {
    const pages = [];

    if (totalPages <= 7) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Truncate pages
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        );
      }
    }

    return pages;
  };

  return reviews?.length > 0 ? (
    <div className="mt-4 space-y-4">
      {visibleReviews.map((review, index) => (
        <ReviewCard key={index} {...review} />
      ))}

      <div className="flex items-center justify-between pt-4">
        <Button
          className="inline-flex min-w-fit items-center gap-1 rounded-lg border border-gray-200 bg-transparent p-2 text-sm text-black disabled:pointer-events-none disabled:opacity-50"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeftIcon className="h-4 w-4" />
          Previous
        </Button>

        <div className="flex items-center gap-2">
          {getPagination().map((page, index) =>
            page === "..." ? (
              <span key={index} className="px-2 text-gray-400">
                ...
              </span>
            ) : (
              <button
                key={index}
                onClick={() => goToPage(page)}
                className={`flex aspect-square min-w-[40px] cursor-pointer items-center justify-center rounded-lg border border-gray-200 p-2 ${
                  currentPage === page
                    ? "bg-primary border-0 font-bold text-white"
                    : "bg-transparent"
                }`}
              >
                {page}
              </button>
            ),
          )}
        </div>

        <Button
          className="inline-flex min-w-fit items-center gap-1 rounded-lg border border-gray-200 bg-transparent p-2 text-sm text-black disabled:pointer-events-none disabled:opacity-50"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  ) : (
    <div className="flex w-full items-center justify-center p-4">
      <p className="text-gray-500">
        No reviews available yet. Be the first to review this doctor!
      </p>
    </div>
  );
}
