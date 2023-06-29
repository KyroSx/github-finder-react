import { RepositoriesList } from './RepositoriesList';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  getSearchRepositoriesHandler,
  useSetupServer,
  renderComponent,
} from '../../testing';

describe(RepositoriesList, () => {
  useSetupServer(getSearchRepositoriesHandler());

  function setUp() {
    renderComponent(RepositoriesList);
  }

  it('searches username in input when button is clicked, then show the results.', async () => {
    setUp();

    userEvent.type(
      screen.getByPlaceholderText('Digite algo para pesquisar'),
      'test-username'
    );
    userEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByText('repo-name#1')).toBeInTheDocument();
      expect(screen.getByText('repo-name#2')).toBeInTheDocument();
      expect(screen.getByText('repo-name#3')).toBeInTheDocument();
    });
  });
});
