import { useSearchStore } from "../../features/search/searchStore";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import Skeleton from "react-loading-skeleton";
import { useSaveRecentDoctorSearch } from "../../features/search/useSaveRecentDoctorSearch";

function SearchDropdown() {
  const { saveRecentSearch } = useSaveRecentDoctorSearch();

  const searchQuery = useSearchStore((s) => s.query);
  const filteredDoctors = useSearchStore((s) => s.filteredDoctors);
  const filteredArticles = useSearchStore((s) => s.filteredArticles);
  const isLoading = useSearchStore((s) => s.loading);
  const isOpen = useSearchStore((s) => s.open);
  const closeDropdown = useSearchStore((s) => s.closeDropdown);

  if (!isOpen || searchQuery.trim() === "") return null;

  return (
    <div className="absolute top-full z-50 mt-2 w-full rounded-xl border border-gray-200 bg-white shadow-lg">
      <div className="max-h-[400px] overflow-y-auto">
        {/* Doctors Section */}
        <div className="p-4 pb-2">
          <p className="mb-2 text-sm font-semibold text-gray-500">Doctors</p>
          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} height={50} />
              ))}
            </div>
          ) : filteredDoctors.length > 0 ? (
            filteredDoctors.map((doc) => (
              <Link
                key={doc.id}
                to={`/doctor/${doc.id}`}
                className="flex items-center gap-3 rounded-md p-2 transition hover:bg-gray-100"
                onClick={() => {
                  saveRecentSearch(doc.id);
                  closeDropdown();
                }}
              >
                <img
                  src={
                    doc.image.includes("example.com")
                      ? "/doctor-image.jpg"
                      : doc.image
                  }
                  alt={doc.firstName}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="text-sm">
                  <p className="font-medium">
                    Dr. {doc.firstName} {doc.secondName}
                  </p>
                  <p className="line-clamp-1 text-xs text-gray-500">
                    {doc.specialty}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-sm text-gray-400">No matching doctors.</p>
          )}
        </div>

        {/* Articles Section */}
        <div className="p-4 pt-2">
          <p className="mb-2 text-sm font-semibold text-gray-500">Articles</p>
          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 2 }).map((_, i) => (
                <Skeleton key={i} height={40} />
              ))}
            </div>
          ) : filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <Link
                key={article.id}
                to={`/articles/${article._id}`}
                className="block rounded-md p-2 transition hover:bg-gray-100"
                onClick={closeDropdown}
              >
                <p className="line-clamp-1 text-sm font-medium">
                  {article.title}
                </p>
                <p className="text-xs text-gray-500">
                  by {article.author || "Unknown"}
                </p>
              </Link>
            ))
          ) : (
            <p className="text-sm text-gray-400">No matching articles.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchDropdown;
