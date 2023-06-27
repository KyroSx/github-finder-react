import { ThemeProvider } from './ThemeProvider';
import { ReactQueryProvider } from './ReactQueryProvider';
import React from 'react';

export const Providers: React.ProviderFC = ({ children }) => (
  <ReactQueryProvider>
    <ThemeProvider>{children}</ThemeProvider>
  </ReactQueryProvider>
);
