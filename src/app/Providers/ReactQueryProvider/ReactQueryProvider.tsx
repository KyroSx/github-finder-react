import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';

export const queryClient = new QueryClient();

export const ReactQueryProvider: React.ProviderFC = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
