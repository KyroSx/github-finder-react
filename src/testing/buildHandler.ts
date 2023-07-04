import { DefaultBodyType, rest } from 'msw';

type NonePaginatedHandler<T> = {
  url: string;
  method: keyof typeof rest;
  paginated?: false;
  response: T;
};

type PaginatedHandler<T> = {
  url: string;
  method: keyof typeof rest;
  paginated: true;
  paginatedResponse: Array<{ page: number; response: T }>;
};

type Handler<T> = NonePaginatedHandler<T> | PaginatedHandler<T>;

export function buildHandler<T extends DefaultBodyType>(props: Handler<T>) {
  return props.paginated
    ? buildPaginatedHandler(props)
    : buildNonPaginatedHandler(props);
}

function buildPaginatedHandler<T extends DefaultBodyType>(
  props: PaginatedHandler<T>
) {
  const responses = props.paginatedResponse.map((item) => ({
    ...item,
    url: props.url.replace(':page', item.page.toString()),
  }));

  return rest[props.method](props.url, (req, res, ctx) => {
    const pageParam = req.url.searchParams.get('page');
    const page = pageParam ? parseInt(pageParam, 10) : 1;

    const matchedResponse = responses.find((item) => item.page === page);

    if (matchedResponse) {
      const nextPage = page + 1;
      const lastPage = responses[responses.length - 1].page;

      const linkHeader = `<${props.url}?page=${nextPage}>; rel="next", <${props.url}?page=${lastPage}>; rel="last"`;

      return res(
        ctx.delay(),
        ctx.set('link', linkHeader),
        ctx.json(matchedResponse.response)
      );
    }

    return res(ctx.status(404));
  });
}

function buildNonPaginatedHandler<T extends DefaultBodyType>(
  props: NonePaginatedHandler<T>
) {
  if (!props.response) {
    throw new Error(
      'A propriedade "response" é obrigatória quando "paginated" é false.'
    );
  }

  return rest[props.method](props.url, (req, res, ctx) => {
    return res(ctx.delay(), ctx.json(props.response));
  });
}
