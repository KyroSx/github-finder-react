import React from 'react';
import * as Styles from './List.styles';
import { Repository } from '../../../models';
import { Pagination } from '../Pagination';
import { useTranslation } from '../../../app';

interface ListProps {
  repositories: Repository[];

  page: number;
  updatePagination: (page: number) => void;
  totalPages: number;
}

export function List({
  repositories,
  page,
  updatePagination,
  totalPages,
}: ListProps) {
  const { translate } = useTranslation('finder.repositories.item');

  return (
    <>
      <div>
        {repositories.map((repo) => (
          <Styles.Container key={repo.id} id={repo.id}>
            <Styles.Header>
              <Styles.Title>{repo.name}</Styles.Title>

              <Styles.PrivateBadge>
                {repo.private ? translate('private') : translate('public')}
              </Styles.PrivateBadge>
            </Styles.Header>

            <Styles.Footer>
              {repo.language && (
                <Styles.Language>{repo.language}</Styles.Language>
              )}

              <Styles.UpdatedAt>
                {translate('updated_at', { date: repo.updated_at })}
              </Styles.UpdatedAt>
            </Styles.Footer>
          </Styles.Container>
        ))}
      </div>

      {repositories.length !== 0 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={updatePagination}
        />
      )}
    </>
  );
}
