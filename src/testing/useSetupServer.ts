import { setupServer } from 'msw/node';

export function useSetupServer(serverConfig: any) {
  const server = setupServer(serverConfig);

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
}
