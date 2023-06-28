import React from 'react';
import * as Styles from './RepositoriesList.styles';
import { useSearchRepositories } from '../../hooks';
import { List } from './List';
import { useSearchInput } from './useSearchInput';

export function RepositoriesList() {
  const { searchQuery, handleChange } = useSearchInput();
  const { repositories, isLoading, isError, dispatchSearchRepositories } =
    useSearchRepositories(searchQuery);

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

        <List
          repositories={repositories}
          isError={isError}
          isLoading={isLoading}
        />
      </Styles.Content>
    </Styles.Container>
  );
}
