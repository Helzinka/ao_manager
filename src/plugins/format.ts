import translate from '@/data/translate.json';

export function formatNumberWithEscape(number: number): string {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export function getTranslate(raw_name: string) {
  for (const item of translate) {
    const name = item.UniqueName;
    if (name === raw_name) return item.LocalizedNames['FR-FR'];
  }
}
