import React from 'react';
import * as Styles from './RepositoriesList.styles';
import { useSearchRepositories, useTranslation } from '../../hooks';
import { List } from './List';
import { useSearchInput } from './useSearchInput';
import { Status } from '../../models';
import { LoadingList } from './LoadingList';

export function RepositoriesList() {
  const { searchQuery, updateSearchQuery, handleEnterPressed } =
    useSearchInput();

  const {
    status,
    repositories,
    dispatchSearchRepositories,
    page,
    setPage,
    totalPages,
  } = useSearchRepositories(searchQuery);

  const { translate } = useTranslation('finder.repositories');

  const texts = {
    input: translate('input.placeholder'),
    button: translate('button.submit'),
  };

  return (
    <Styles.Container>
      <Styles.Header>
        <h1>GitHub Search</h1>
      </Styles.Header>

      <Styles.Content>
        <Styles.SearchBar>
          <Styles.Input
            type="text"
            placeholder={texts.input}
            value={searchQuery}
            onChange={updateSearchQuery}
            onKeyPress={handleEnterPressed(dispatchSearchRepositories)}
          />

          <Styles.Button onClick={dispatchSearchRepositories}>
            {texts.button}
          </Styles.Button>
        </Styles.SearchBar>

        {status === Status.loading && <LoadingList />}
        {status === Status.success && (
          <List
            repositories={repositories}
            page={page}
            updatePagination={setPage}
            totalPages={totalPages}
          />
        )}
      </Styles.Content>
    </Styles.Container>
  );
}
