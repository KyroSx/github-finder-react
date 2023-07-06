import { Repository, Status } from '../../models';

export type UseSearchRepositoriesResponse =
  | {
      status: Status.loading | Status.error;
      repositories: null;

      totalPages: null;
      page: null;
      dispatchSearchRepositories: () => Promise<void>;
      setPage: null;
    }
  | {
      status: Status.success;
      repositories: Array<Repository>;
      totalPages: number;
      page: number;
      dispatchSearchRepositories: () => Promise<void>;
      setPage: (page: number) => void;
    };
