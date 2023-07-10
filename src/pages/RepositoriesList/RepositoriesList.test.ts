import { RepositoriesList } from './RepositoriesList';
import {
  getByRole,
  queryByAttribute,
  screen,
  waitFor,
} from '@testing-library/react';
import {
  getSearchRepositoriesHandler,
  renderComponent,
  ServerMockHandler,
  Events,
  raise,
} from '../../testing';

jest.mock('../../app/translation/useTranslation', () =>
  require('../../testing/__mocks__/useTranslation')
);

describe(RepositoriesList, () => {
  const repositories = getSearchRepositoriesHandler();
  ServerMockHandler.start(repositories.handler);

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

  function getRepository(id: number) {
    const getById = queryByAttribute.bind(null, 'id');
    const element = getById(document as any, id.toString());

    return element || raise('invalid id');
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

  it('renders all information about repository after search', async () => {
    setUp();

    Events.typeOn(getSearchInput())('username');
    Events.clickOn(getSearchButton());

    await waitFor(() => {
      repositories.responses[0].response.forEach((repository) => {
        const container = getRepository(repository.id);

        expect(container).toHaveTextContent(repository.name);
        expect(container).toHaveTextContent(
          repository.private
            ? 'finder.repositories.item.private'
            : 'finder.repositories.item.public'
        );
        expect(container).toHaveTextContent(
          'finder.repositories.item.updated_at' + repository.updated_at
        );
      });
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
