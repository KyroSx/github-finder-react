import axios from 'axios';
import { Paginated, Repository } from '../../models';

function extractPageFromLastLink(link: string): number | undefined {
  if (!link) return undefined;

  const regex = /<.+[?&]page=(\d+).+>; rel="last"/;
  const match = link.match(regex);
  if (match && match[1]) {
    return parseInt(match[1], 10);
  }

  return undefined;
}

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
