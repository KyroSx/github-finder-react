import React from 'react';
import * as Styles from './RepositoriesList.styles';
import { useSearchRepositories } from '../../hooks';
import { List } from './List';
import { useSearchInput } from './useSearchInput';
import { Status } from '../../models';
import { LoadingList } from './LoadingList';

export function RepositoriesList() {
  const { searchQuery, handleChange } = useSearchInput();
  const {
    status,
    repositories,
    dispatchSearchRepositories,
    page,
    setPage,
    totalPages,
  } = useSearchRepositories(searchQuery);

  const handleSearch = async () => {
    await dispatchSearchRepositories();
  };

  return (
    <Styles.Container>
      <Styles.Header>
        <h1>GitHub Search</h1>
      </Styles.Header>

      <Styles.Content>
        <Styles.SearchBar>
          <Styles.Input
            type="text"
            placeholder="Digite algo para pesquisar"
            value={searchQuery}
            onChange={handleChange}
          />

          <Styles.Button onClick={handleSearch}>Pesquisar</Styles.Button>
        </Styles.SearchBar>

        {status === Status.loading && <LoadingList />}
        {status === Status.success && (
          <List
            repositories={repositories}
            page={page}
            updatePagination={setPage}
            totalPages={totalPages}
          />
        )}
      </Styles.Content>
    </Styles.Container>
  );
}
