export interface Repository {
  id: string;
  name: string;
  url: string;
  language?: string;
  updated_at: string;
  private: boolean;
}

export interface Paginated<T> {
  items: Array<T>;
  totalPages: number;
}

export enum Status {
  loading,
  error,
  success,
}
