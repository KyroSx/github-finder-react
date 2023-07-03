import { RepositoriesList } from './RepositoriesList';
import { getByRole, screen, waitFor } from '@testing-library/react';
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
    return screen.getByRole('button', { name: 'Pesquisar' });
  }

  function getSearchLoading() {
    return screen.queryByText('Carregando...');
  }

  function getPagination() {
    return screen.queryByRole('navigation', { name: 'pagination' });
  }

  function getNextPaginationButton() {
    return getByRole(getPagination()!, 'button', { name: 'next page' });
  }

  function getPreviousPaginationButton() {
    return getByRole(getPagination()!, 'button', { name: 'previous page' });
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

  it('renders pagination only after search.', async () => {
    setUp();

    await waitFor(() => {
      expect(getPagination()).not.toBeInTheDocument();
    });

    Events.typeOn(getSearchInput())('username');
    Events.clickOn(getSearchButton());

    await waitFor(() => {
      expect(getPagination()).toBeInTheDocument();
    });
  });

  it('renders repositories from next and previous page', async () => {
    setUp();

    Events.typeOn(getSearchInput())('username');
    Events.clickOn(getSearchButton());

    await waitFor(() => {
      Events.clickOn(getNextPaginationButton());
    });

    await waitFor(() => {
      expect(screen.getByText('repo-name#4')).toBeInTheDocument();
      expect(screen.getByText('repo-name#5')).toBeInTheDocument();
      expect(screen.getByText('repo-name#6')).toBeInTheDocument();
    });

    await waitFor(() => {
      Events.clickOn(getPreviousPaginationButton());
    });

    await waitFor(() => {
      expect(screen.getByText('repo-name#1')).toBeInTheDocument();
      expect(screen.getByText('repo-name#2')).toBeInTheDocument();
      expect(screen.getByText('repo-name#3')).toBeInTheDocument();
    });
  });
});
