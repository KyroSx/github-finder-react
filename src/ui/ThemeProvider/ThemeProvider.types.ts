import React from 'react';
import { theme } from './theme';

export interface ThemeProviderProps {
  children: React.ReactNode;
}

type Theme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
