import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const CustomPagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Pagination
      style={{ marginTop: "2rem", display: "flex", justifyContent: "flex-end" }}
    >
      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink
          previous
          onClick={() => onPageChange(currentPage - 1)}
        />
      </PaginationItem>

      {pageNumbers.map((pageNumber) => (
        <PaginationItem key={pageNumber} active={pageNumber === currentPage}>
          <PaginationLink onClick={() => onPageChange(pageNumber)}>
            {pageNumber}
          </PaginationLink>
        </PaginationItem>
      ))}

      <PaginationItem disabled={currentPage === totalPages}>
        <PaginationLink next onClick={() => onPageChange(currentPage + 1)} />
      </PaginationItem>
    </Pagination>
  );
};

export default CustomPagination;