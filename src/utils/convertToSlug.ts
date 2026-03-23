export function convertToSlug(input: string) {
  const translit: Record<string, string> = {
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'g',
    д: 'd',
    е: 'e',
    ё: 'yo',
    ж: 'zh',
    з: 'z',
    и: 'i',
    й: 'y',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'h',
    ц: 'c',
    ч: 'ch',
    ш: 'sh',
    щ: 'shch',
    ъ: '',
    ы: 'y',
    ь: '',
    э: 'e',
    ю: 'yu',
    я: 'ya',
  };
  const transliterated = input
    .trim()
    .toLowerCase()
    .replace(/[а-яё]/g, (ch) => translit[ch] ?? ch);
  return transliterated
    .replace(/[\s_]+/g, '-') // пробелы/подчеркивания -> -
    .replace(/-+/g, '-') // схлопнуть подряд `--`
    .replace(/[^a-z0-9-]+/g, '') // теперь разрешаем латиницу/цифры/-
    .replace(/-+$/g, '') // убрать хвостовые -
    .replace(/^-+/g, ''); // убрать ведущие -
}
