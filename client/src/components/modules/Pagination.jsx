import React from "react";
import "./Pagination.css";

const Pagination = ({ productsPerPage, totalProducts, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const pageNumbers = [];

  // Dynamic page numbers generation
  if (totalPages <= 3) {
    // If total pages is 3 or less, show all pages
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else if (currentPage <= 2) {
    // First range: show 1,2,3
    for (let i = 1; i <= 3; i++) {
      pageNumbers.push(i);
    }
  } else if (currentPage >= totalPages - 1) {
    // Last range: show last two pages
    for (let i = totalPages - 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else if (currentPage === 3 || currentPage === 4) {
    // Middle range: show 3,4,5
    for (let i = 3; i <= 5; i++) {
      pageNumbers.push(i);
    }
  } else {
    // For other cases in larger pagination scenarios
    for (let i = currentPage; i <= Math.min(currentPage + 2, totalPages); i++) {
      pageNumbers.push(i);
    }
  }

  // Add last page if not in final range and total pages > 3
  if (currentPage < totalPages - 1 && !pageNumbers.includes(totalPages) && totalPages > 3) {
    pageNumbers.push(totalPages);
  }

  // Modified width class calculation
  const getWidthClass = () => {
    const visibleItems = pageNumbers.length + 2; // +2 for Previous and Next buttons
    switch (visibleItems) {
      case 3: // 1 number + prev/next
        return "pagination-xsmall";
      case 4: // 2 numbers + prev/next
        return "pagination-small";
      case 5: // 3 numbers + prev/next
        return "pagination-medium";
      default:
        return "pagination-large";
    }
  };

  return (
    <nav className="pagination-container">
      <ul className={`pagination ${getWidthClass()}`}>
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="page-link"
          >
            Previous
          </button>
        </li>

        {pageNumbers.map((number, index) => (
          <React.Fragment key={number}>
            {index > 0 &&
              (number - pageNumbers[index - 1] > 1 ||
                (currentPage >= 3 && currentPage <= 4 && number === totalPages)) && (
                <li className="page-item disabled">
                  <span className="page-link">...</span>
                </li>
              )}
            <li className={`page-item ${currentPage === number ? "active" : ""}`}>
              <button onClick={() => onPageChange(number)} className="page-link">
                {number}
              </button>
            </li>
          </React.Fragment>
        ))}

        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="page-link"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
