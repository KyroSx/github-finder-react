import { useQuery } from 'react-query';
import { searchRepositories } from '../../services';
import { Repository } from '../../models';

export function useSearchRepositories(username: string) {
  const {
    data: repositories = [],
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useQuery<Repository[]>(
    ['repositories'],
    () => searchRepositories(username),
    { enabled: false, retry: false }
  );

  const dispatchSearchRepositories = async () => {
    await refetch();
  };

  return {
    repositories,
    isLoading: isLoading || isFetching,
    isError,
    dispatchSearchRepositories,
  };
}
