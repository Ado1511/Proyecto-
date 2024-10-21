import React from 'react';

interface PaginationProps {
  totalRecords: number;
  pageLimit: number;
  currentPage: number;
  onPageChanged: (data: { currentPage: number }) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalRecords,
  pageLimit,
  currentPage,
  onPageChanged,
}) => {
  const totalPages = Math.ceil(totalRecords / pageLimit);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      onPageChanged({ currentPage: newPage });
    }
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 mx-1 text-white bg-orange-500 rounded"
        aria-label="Previous Page"
      >
        Previous
      </button>

      <p className="mr-4">
        Page {currentPage} of {totalPages}
      </p>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 mx-1 text-white bg-orange-500 rounded"
        aria-label="Next Page"
      >
        Next
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`p-2 mx-1 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-orange-500 text-white'}`}
          aria-label={`Go to page ${page}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
