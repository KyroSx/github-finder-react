export function useTranslation(base: string) {
  return {
    translate: (key: string) => `${base}.${key}`,
  };
}
