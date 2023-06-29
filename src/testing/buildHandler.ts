import { DefaultBodyType, rest } from 'msw';

type Handler<T> = {
  method: keyof typeof rest;
  url: string;
  response: T;
};

export function buildHandler<T extends DefaultBodyType>(props: Handler<T>) {
  return rest[props.method](props.url, (req, res, ctx) => {
    return res(ctx.json(props.response));
  });
}
