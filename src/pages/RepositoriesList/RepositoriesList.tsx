import React, { useState } from 'react';
import * as Styles from './RepositoriesList.styles';
import { useSearchRepositories } from '../../hooks';
import { List } from './List';

function useSearchInput() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return { searchQuery, handleChange };
}

export function RepositoriesList() {
  const { searchQuery, handleChange } = useSearchInput();
  const { repositories, isLoading, isError, refetch } =
    useSearchRepositories(searchQuery);

  const handleSearch = async () => {
    await refetch();
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

        {isLoading && <div>Loading...</div>}
        {isError && <div>Error</div>}
        {repositories && <List repositories={repositories} />}
      </Styles.Content>
    </Styles.Container>
  );
}
