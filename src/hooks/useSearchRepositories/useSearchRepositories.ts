import { useQuery } from 'react-query';
import { searchRepositories } from '../../services';
import { Paginated, Repository, Status } from '../../models';
import { useState } from 'react';
import { UseSearchRepositoriesResponse } from './useSearchRepositories.types';

export function useSearchRepositories(
  username: string
): UseSearchRepositoriesResponse {
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(5);
  const [fetch, setFetch] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(1);

  const query = useQuery<Paginated<Repository>>(
    ['repositories', page, pageSize],
    () => searchRepositories(username, page, pageSize),
    {
      enabled: fetch,
      retry: false,
      onSettled: (data) => {
        setFetch(false);

        data?.totalPages ? setTotalPages(data.totalPages) : setTotalPages(page);
      },
    }
  );

  const dispatchSearchRepositories = async () => {
    setPage(1);
    setFetch(true);
  };

  const updatePagination = (page: number) => {
    setPage(page);
    setFetch(true);
  };

  if (query.isSuccess) {
    return {
      status: Status.success,
      repositories: query.data.items,
      dispatchSearchRepositories,

      page,
      totalPages,
      setPage: updatePagination,
    };
  }

  return {
    status: query.isLoading || query.isFetching ? Status.loading : Status.error,
    repositories: null,
    dispatchSearchRepositories,

    page: null,
    totalPages: null,
    setPage: null,
  };
}
