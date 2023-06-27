import React from 'react';
import { RepositoriesList } from './pages';
import { GlobalStyle } from './ui';
import { Providers } from './app';

export function App() {
  return (
    <Providers>
      <RepositoriesList />

      <GlobalStyle />
    </Providers>
  );
}
