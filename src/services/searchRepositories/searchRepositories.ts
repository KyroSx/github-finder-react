import axios from 'axios';
import { Repository } from '../../models';

export async function searchRepositories(
  username: string,
  page: number,
  pageSize: number
): Promise<Array<Repository>> {
  const response = await axios.get(
    `https://api.github.com/users/${username}/repos`,
    { params: { page, per_page: pageSize } }
  );

  return response.data;
}
