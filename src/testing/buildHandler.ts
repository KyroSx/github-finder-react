import { DefaultBodyType, rest } from 'msw';

type Handler<T> =
  | {
      url: string;
      method: keyof typeof rest;
      paginated?: false;
      response: T;
    }
  | {
      url: string;
      method: keyof typeof rest;
      paginated: true;
      paginatedResponse: Array<{ page: number; response: T }>;
    };

export function buildHandler<T extends DefaultBodyType>(props: Handler<T>) {
  if (props.paginated) {
    const responses = props.paginatedResponse.map((item) => ({
      ...item,
      url: props.url.replace(':page', item.page.toString()),
    }));

    return rest[props.method](props.url, (req, res, ctx) => {
      const pageParam = req.url.searchParams.get('page');
      const page = pageParam ? parseInt(pageParam, 10) : 1;

      const matchedResponse = responses.find((item) => item.page === page);

      if (matchedResponse) {
        return res(ctx.delay(), ctx.json(matchedResponse.response));
      }

      return res(ctx.status(404));
    });
  }

  return rest[props.method](props.url, (req, res, ctx) => {
    return res(ctx.delay(), ctx.json(props.response));
  });
}
