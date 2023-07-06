import React from 'react';
import * as Styles from './Pagination.styles';
import { useTranslation } from '../../../app';

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
  const { translate } = useTranslation('finder.components.pagination');

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const texts = {
    container: translate('container.alt'),
    previous: translate('previous.text'),
    previous_label: translate('previous.alt'),
    next: translate('next.text'),
    next_label: translate('next.alt'),
  };

  return (
    <Styles.PaginationContainer aria-label={texts.container}>
      <Styles.PageButton
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        aria-label={texts.previous_label}
      >
        &lt; {texts.previous}
      </Styles.PageButton>

      <Styles.PageButton
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        aria-label={texts.next_label}
      >
        {texts.next} &gt;
      </Styles.PageButton>
    </Styles.PaginationContainer>
  );
};
