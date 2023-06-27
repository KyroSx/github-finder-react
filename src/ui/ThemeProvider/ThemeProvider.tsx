import React from 'react';
import { ThemeProvider as StyledComponentsProvider } from 'styled-components';
import { theme } from './theme';
import { ThemeProviderProps } from './ThemeProvider.types';

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <StyledComponentsProvider theme={theme}>
      {children}
    </StyledComponentsProvider>
  );
};
