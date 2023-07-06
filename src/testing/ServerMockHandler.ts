import { SetupServer, setupServer } from 'msw/node';
import { c as RequestHandler } from 'msw/lib/glossary-de6278a9';
import { queryClient } from '../app/Providers/ReactQueryProvider';

export class ServerMockHandler {
  private static server: SetupServer;

  static start(...handlers: Array<RequestHandler>) {
    this.server = setupServer(...handlers);

    this.setUpTestConfiguration();
  }

  private static setUpTestConfiguration() {
    beforeAll(() => this.server.listen());

    afterEach(() => {
      this.server.resetHandlers();
      queryClient.clear();
    });

    afterAll(() => this.server.close());
  }

  static setUpHandler(serverConfig: any) {
    this.server.use(serverConfig);
  }
}
