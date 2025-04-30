import React from "react";

const Pagination = ({ currentPage, totalPages, handlePageChange }: any) => {
  const pageNumbers = [];
  const maxPageNumbersToShow = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

  if (endPage - startPage < maxPageNumbersToShow - 1) {
    startPage = Math.max(1, endPage - maxPageNumbersToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="mt-8 flex justify-center">
      {currentPage > 1 && (
        <>
          <button
            className="mx-1 cursor-pointer rounded border px-3 py-1 border-[#4716ED] bg-white text-[#4716ED]"
            onClick={() => handlePageChange(1)}
          >
            First
          </button>
          <button
            className="mx-1 cursor-pointer rounded border px-3 py-1 border-[#4716ED] bg-white text-[#4716ED]"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
        </>
      )}
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`mx-1 cursor-pointer rounded border px-3 py-1 ${
            currentPage === number
              ? "bg-[#4716ED] text-white"
              : "border-[#4716ED] bg-white text-[#4716ED]"
          }`}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </button>
      ))}
      {currentPage < totalPages && (
        <>
          <button
            className="mx-1 cursor-pointer rounded border px-3 py-1 border-[#4716ED] bg-white text-[#4716ED]"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
          <button
            className="mx-1 cursor-pointer rounded border px-3 py-1 border-[#4716ED] bg-white text-[#4716ED]"
            onClick={() => handlePageChange(totalPages)}
          >
            Last
          </button>
        </>
      )}
    </div>
  );
};

export default Pagination;
