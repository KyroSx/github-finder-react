import React from 'react';
import { ThemeProvider as StyledComponentsProvider } from 'styled-components';
import { theme } from './theme';

export const ThemeProvider: React.ProviderFC = ({ children }) => (
  <StyledComponentsProvider theme={theme}>{children}</StyledComponentsProvider>
);
