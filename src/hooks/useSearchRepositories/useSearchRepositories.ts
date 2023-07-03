import { useQuery } from 'react-query';
import { searchRepositories } from '../../services';
import { Repository } from '../../models';
import { useState } from 'react';

export function useSearchRepositories(username: string) {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(3);
  const [fetch, setFetch] = useState<boolean>(false);

  const {
    data: repositories = [],
    isLoading,
    isError,
    isFetching,
  } = useQuery<Repository[]>(
    ['repositories', page, pageSize],
    () => searchRepositories(username, page, pageSize),
    {
      enabled: fetch,
      retry: false,
      onSettled: () => setFetch(false),
    }
  );

  const dispatchSearchRepositories = async () => {
    setFetch(true);
  };

  const updatePagination = (page: number) => {
    setPage(page);
    setFetch(true);
  };

  return {
    repositories,
    isLoading: isLoading || isFetching,
    isError,
    dispatchSearchRepositories,
    page,
    setPage: updatePagination,
    pageSize,
    setPageSize,
  };
}
