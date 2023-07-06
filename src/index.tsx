import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app';

declare module 'react' {
  interface ProviderFC<P = any> {
    (props: React.PropsWithChildren<P>, context?: any): React.ReactElement<
      any,
      any
    > | null;
  }
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
