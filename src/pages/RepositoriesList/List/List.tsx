import React from 'react';
import * as Styles from './List.styles';
import { Repository } from '../../../models';
import { LoadingList } from '../LoadingList';
import { Pagination } from '../Pagination';

interface ListProps {
  repositories: Repository[];

  page: number;
  updatePagination: (page: number) => void;

  isLoading: boolean;
  isError: boolean;
}

export function List({
  repositories,
  isLoading,
  isError,
  page,
  updatePagination,
}: ListProps) {
  if (isLoading) {
    return <LoadingList />;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      <div>
        {repositories.map((repo) => (
          <Styles.Container key={repo.id}>
            <Styles.Header>
              <Styles.Title>{repo.name}</Styles.Title>

              <Styles.PrivateBadge>
                {repo.private ? 'Privado' : 'Publíco'}
              </Styles.PrivateBadge>
            </Styles.Header>

            <Styles.Footer>
              {repo.language && (
                <Styles.Language>{repo.language}</Styles.Language>
              )}

              <Styles.UpdatedAt>
                Atualizado em {repo.updated_at}
              </Styles.UpdatedAt>
            </Styles.Footer>
          </Styles.Container>
        ))}
      </div>

      {repositories.length !== 0 && (
        <Pagination
          currentPage={page}
          totalPages={10}
          onPageChange={updatePagination}
        />
      )}
    </>
  );
}
