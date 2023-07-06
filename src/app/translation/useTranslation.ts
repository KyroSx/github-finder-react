import { useTranslation as usei18nTranslation } from 'react-i18next';

export function useTranslation(base: string) {
  const { t } = usei18nTranslation();

  const translate = (key: string) => t(`${base}.${key}`);

  return {
    translate,
  };
}
