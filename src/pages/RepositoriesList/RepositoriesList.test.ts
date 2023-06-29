import { RepositoriesList } from './RepositoriesList';
import { screen, waitFor } from '@testing-library/react';
import {
  getSearchRepositoriesHandler,
  renderComponent,
  ServerMockHandler,
  Events,
} from '../../testing';

describe(RepositoriesList, () => {
  ServerMockHandler.start(getSearchRepositoriesHandler());

  function setUp() {
    renderComponent(RepositoriesList);
  }

  function getSearchInput() {
    return screen.getByPlaceholderText('Digite algo para pesquisar');
  }

  function getSearchButton() {
    return screen.getByRole('button');
  }

  function getSearchLoading() {
    return screen.queryByText('Carregando...');
  }

  it('searches username in input when button is clicked, then show the results.', async () => {
    setUp();

    Events.typeOn(getSearchInput())('username');
    Events.clickOn(getSearchButton());

    await waitFor(() => {
      expect(screen.getByText('repo-name#1')).toBeInTheDocument();
      expect(screen.getByText('repo-name#2')).toBeInTheDocument();
      expect(screen.getByText('repo-name#3')).toBeInTheDocument();
    });
  });

  it('shows loading when button is clicked.', async () => {
    setUp();

    Events.typeOn(getSearchInput())('username');
    Events.clickOn(getSearchButton());

    await waitFor(() => {
      expect(getSearchLoading()).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(getSearchLoading()).not.toBeInTheDocument();
    });
  });
});
