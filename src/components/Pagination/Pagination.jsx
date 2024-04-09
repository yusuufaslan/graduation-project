import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-l-md bg-gray-300 ${
          currentPage === 1 ? "text-gray-400" : "text-gray-800"
        }`}
      >
        Prev
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => handleClick(i + 1)}
          className={`px-4 py-2 ${
            currentPage === i + 1
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-800"
          }`}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-r-md bg-gray-300 ${
          currentPage === totalPages ? "text-gray-400" : "text-gray-800"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
