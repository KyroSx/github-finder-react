import React from 'react';
import { RepositoriesList } from '../pages';
import { Providers } from './Providers';
import { GlobalStyle } from '../ui';

import './translation/translation.setup';

export function App() {
  return (
    <Providers>
      <RepositoriesList />

      <GlobalStyle />
    </Providers>
  );
}
