import { RepositoriesList } from './RepositoriesList';
import { getByRole, screen, waitFor } from '@testing-library/react';
import {
  getSearchRepositoriesHandler,
  renderComponent,
  ServerMockHandler,
  Events,
} from '../../testing';

jest.mock('../../app/translation/useTranslation', () =>
  require('../../testing/__mocks__/useTranslation')
);

describe(RepositoriesList, () => {
  ServerMockHandler.start(getSearchRepositoriesHandler());

  function setUp() {
    renderComponent(RepositoriesList);
  }

  function getSearchInput() {
    return screen.getByPlaceholderText('finder.repositories.input.placeholder');
  }

  function getSearchButton() {
    return screen.getByRole('button', {
      name: 'finder.repositories.button.submit',
    });
  }

  function getSearchLoading() {
    return screen.queryByRole('progressbar');
  }

  function getPagination() {
    return screen.queryByRole('navigation', {
      name: 'finder.components.pagination.container.alt',
    });
  }

  function getNextPaginationButton() {
    return getByRole(getPagination()!, 'button', {
      name: 'finder.components.pagination.next.alt',
    });
  }

  function getPreviousPaginationButton() {
    return getByRole(getPagination()!, 'button', {
      name: 'finder.components.pagination.previous.alt',
    });
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

  it('also searches username in input when enter key is pressed, then show the results.', async () => {
    setUp();

    Events.typeOn(getSearchInput())('username');
    Events.pressEnterKey();

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

  it('shows loading between searches.', async () => {
    setUp();

    Events.typeOn(getSearchInput())('username');
    Events.pressEnterKey();

    await waitFor(() => {
      expect(getSearchLoading()).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(getSearchLoading()).not.toBeInTheDocument();
    });

    Events.typeOn(getSearchInput())('username_2');
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

  it('disables last and previous pagination button', async () => {
    setUp();

    Events.typeOn(getSearchInput())('username');
    Events.clickOn(getSearchButton());

    await waitFor(() => {
      expect(getPreviousPaginationButton()).toBeDisabled();
      Events.clickOn(getNextPaginationButton());
    });

    await waitFor(() => {
      expect(getPreviousPaginationButton()).not.toBeDisabled();
      expect(getNextPaginationButton()).toBeDisabled();
    });
  });
});
