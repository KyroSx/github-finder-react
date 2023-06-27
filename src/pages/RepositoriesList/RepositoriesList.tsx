import React from 'react';
import * as Styles from './RepositoriesList.styles';
import { useSearchRepositories } from '../../hooks';

export function RepositoriesList() {
  const { repositories } = useSearchRepositories();

  return (
    <Styles.Container>
      <Styles.Header>
        <h1>GitHub Search</h1>
      </Styles.Header>

      <Styles.Content>
        <Styles.SearchBar>
          <Styles.Input type="text" placeholder="Digite algo para pesquisar" />
          <Styles.Button>Pesquisar</Styles.Button>
        </Styles.SearchBar>

        {repositories.map((repo) => (
          <h1 key={repo.name}>{repo.name}</h1>
        ))}
      </Styles.Content>
    </Styles.Container>
  );
}
