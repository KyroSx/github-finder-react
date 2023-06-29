import { SetupServer, setupServer } from 'msw/node';
import { c as RequestHandler } from 'msw/lib/glossary-de6278a9';

export class ServerMockHandler {
  private static server: SetupServer;

  static start(...handlers: Array<RequestHandler>) {
    this.server = setupServer(...handlers);

    this.setUpTestConfiguration();
  }

  private static setUpTestConfiguration() {
    beforeAll(() => this.server.listen());
    afterEach(() => this.server.resetHandlers());
    afterAll(() => this.server.close());
  }

  static setUpHandler(serverConfig: any) {
    this.server.use(serverConfig);
  }
}
