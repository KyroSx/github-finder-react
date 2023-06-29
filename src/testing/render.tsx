import { ComponentType, createElement } from 'react';
import { Providers } from '../app';
import { render } from '@testing-library/react';

export function renderComponent<T extends object>(
  Component: ComponentType<T>,
  props?: T
): void {
  render(<Providers>{createElement(Component, props)}</Providers>);
}
