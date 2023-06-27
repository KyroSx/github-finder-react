import axios from 'axios';
import { useQuery } from 'react-query';

interface Repository {
  name: string;
  description: string;
  url: string;
}

async function searchRepositories(
  username: string
): Promise<Array<Repository>> {
  const response = await axios.get(
    `https://api.github.com/users/${username}/repos`
  );

  return response.data.map((repo: any) => ({
    name: repo.name,
    description: repo.description,
    url: repo.html_url,
  }));
}

export function useSearchRepositories() {
  const { data: repositories = [] } = useQuery<Repository[]>(
    ['repositories', 'kyrosx'],
    () => searchRepositories('kyrosx')
  );

  return { repositories };
}
