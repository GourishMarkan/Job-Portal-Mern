// import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [...Array(totalPages).keys()].map((num) => num + 1);
  return (
    <div className="flex gap-2.5">
      {currentPage > 1 && (
        <button
          className="py-2 px-3 cursor-pointer "
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>
      )}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className="py-2 px-3 cursor-pointer active:text-white bg-blue-100"
        >
          {page}
        </button>
      ))}
      {currentPage < totalPages && (
        <button
          className="py-2 px-3 cursor-pointer "
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
