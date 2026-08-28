import en from './en';
import zhTw from './zh-tw';

export type Lang = 'en' | 'zh-TW';
export const dictionaries = { en, 'zh-TW': zhTw };
export const getDictionary = (lang: Lang) => dictionaries[lang];

export const tagLabels: Record<string, Record<Lang, string>> = {
  'open-source': { en: 'Open Source', 'zh-TW': '開源' },
  'ci-cd': { en: 'CI/CD', 'zh-TW': 'CI/CD' },
  'github-actions': { en: 'GitHub Actions', 'zh-TW': 'GitHub Actions' },
  reflection: { en: 'Lessons Learned', 'zh-TW': '開發心得' },
  infrastructure: { en: 'Infrastructure', 'zh-TW': '基礎設施' },
  'machine-learning': { en: 'Machine Learning', 'zh-TW': '機器學習' },
  ios: { en: 'iOS', 'zh-TW': 'iOS' },
  embedded: { en: 'Embedded Systems', 'zh-TW': '嵌入式系統' },
  linux: { en: 'Linux', 'zh-TW': 'Linux' },
  llm: { en: 'LLM', 'zh-TW': '大型語言模型' },
};

export function tagLabel(tag: string, lang: Lang) {
  return tagLabels[tag]?.[lang] ?? tag;
}
