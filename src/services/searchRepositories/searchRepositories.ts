import axios from 'axios';
import { Paginated, Repository } from '../../models';
import { extractPageFromLastLink } from './extractPageFromLastLink';

export async function searchRepositories(
  username: string,
  page: number,
  pageSize: number
): Promise<Paginated<Repository>> {
  const response = await axios.get(
    `https://api.github.com/users/${username}/repos`,
    { params: { page, per_page: pageSize } }
  );

  return {
    items: response.data,
    totalPages: +extractPageFromLastLink(response.headers.link)!,
  };
}
