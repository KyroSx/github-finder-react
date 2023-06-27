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

export function useSearchRepositories() {
  const { data: repositories = [] } = useQuery<Repository[]>(
    ['repositories', 'kyrosx'],
    () => searchRepositories('kyrosx')
  );

  return { repositories };
}
