export function extractPageFromLastLink(link: string): number | undefined {
  if (!link) {
    return undefined;
  }

  const match = extractMatchFromLink(link);

  return isInvalidMatch(match) ? undefined : extractPageFromMatch(match!);
}

function isInvalidMatch(match: RegExpMatchArray | null): boolean {
  return !match || !match[1];
}

function extractMatchFromLink(link: string): RegExpMatchArray | null {
  const regex = /<.+[?&]page=(\d+).+>; rel="last"/;
  return link.match(regex);
}

function extractPageFromMatch(match: RegExpMatchArray): number | undefined {
  return parseInt(match[1], 10);
}
