import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  skip: number;
  limit: number;
  total: number;
  onSkipChange: (skip: number) => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  skip,
  limit,
  total,
  onSkipChange,
  hasNext,
  hasPrevious,
}) => {
  const handleNext = () => {
    if (hasNext) {
      onSkipChange(skip + limit);
    }
  };

  const handlePrevious = () => {
    if (hasPrevious) {
      onSkipChange(Math.max(0, skip - limit));
    }
  };

  // Calculate current page info
  const startItem = skip + 1;
  const endItem = Math.min(skip + limit, total);

  return (
    <div className="flex items-center justify-between my-4">
      <div className="text-sm text-gray-600">
        Showing <strong>{startItem}</strong> to <strong>{endItem}</strong> of{" "}
        <strong>{total}</strong> results
      </div>
      <div className="flex gap-2">
        <button
          onClick={handlePrevious}
          disabled={!hasPrevious}
          className="flex items-center px-4 py-2 text-sm border rounded-md dark:text-gray-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Previous
        </button>
        <button
          onClick={handleNext}
          disabled={!hasNext}
          className="flex items-center px-4 py-2 text-sm border rounded-md dark:text-gray-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
