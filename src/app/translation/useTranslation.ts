import { useTranslation as usei18nTranslation } from 'react-i18next';

export function useTranslation(base: string) {
  const { t } = usei18nTranslation();

  const translate = (key: string, args?: any): string => {
    if (args) {
      return t(`${base}.${key}`, args).toString();
    }

    return t(`${base}.${key}`);
  };

  return {
    translate,
  };
}
