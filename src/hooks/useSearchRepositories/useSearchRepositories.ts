import axios from 'axios';
import { useQuery } from 'react-query';

interface Repository {
  id: string;
  name: string;
  description: string;
  url: string;
  language: string;
  updated_at: string;
  private: boolean;
}

async function searchRepositories(
  username: string
): Promise<Array<Repository>> {
  const response = await axios.get(
    `https://api.github.com/users/${username}/repos`
  );

  return response.data;
}

export function useSearchRepositories(username: string) {
  const {
    data: repositories = [],
    isLoading,
    isError,
    refetch,
  } = useQuery<Repository[]>(
    ['repositories', 'kyrosx'],
    () => searchRepositories(username),
    { enabled: false, retry: false }
  );

  return { repositories, isLoading, isError, refetch };
}
