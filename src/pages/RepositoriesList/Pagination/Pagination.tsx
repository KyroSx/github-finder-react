import React from 'react';
import * as Styles from './Pagination.styles';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <Styles.PaginationContainer aria-label="pagination">
      <Styles.PageButton
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        &lt; previous
      </Styles.PageButton>

      <Styles.PageButton
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        next &gt;
      </Styles.PageButton>
    </Styles.PaginationContainer>
  );
};
