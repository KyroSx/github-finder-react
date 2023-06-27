import React from 'react';
import { RepositoriesList } from './pages';
import { GlobalStyle, ThemeProvider } from './ui';

export function App() {
  return (
    <ThemeProvider>
      <RepositoriesList />

      <GlobalStyle />
    </ThemeProvider>
  );
}
