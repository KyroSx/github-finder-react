import React from 'react';
import * as Styles from './RepositoriesList.styles';

export function RepositoriesList() {
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
      </Styles.Content>
    </Styles.Container>
  );
}
