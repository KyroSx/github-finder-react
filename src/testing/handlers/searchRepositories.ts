import { buildHandler } from '../buildHandler';

export function getSearchRepositoriesHandler() {
  return buildHandler({
    url: 'https://api.github.com/users/:username/repos',
    method: 'get',
    response: [
      {
        id: 1234,
        name: 'repo-name#1',
        language: undefined,
        private: false,
        updated_at: '',
        url: '',
      },
      {
        id: 1235,
        name: 'repo-name#2',
        private: true,
        url: '',
        updated_at: '',
      },
      {
        id: 1444,
        name: 'repo-name#3',
        language: '',
        private: false,
        url: '',
        updated_at: '',
      },
    ],
  });
}
