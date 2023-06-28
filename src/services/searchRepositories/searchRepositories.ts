import axios from 'axios';
import { Repository } from '../../models';

export async function searchRepositories(
  username: string
): Promise<Array<Repository>> {
  const response = await axios.get(
    `https://api.github.com/users/${username}/repos`
  );

  return response.data;
}
