import type { Lang } from '../i18n';

export function formatDate(date: Date, lang: Lang) {
  return new Intl.DateTimeFormat(lang === 'en' ? 'en-US' : 'zh-TW', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}
