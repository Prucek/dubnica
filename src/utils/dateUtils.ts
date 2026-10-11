function pluralize(n: number, one: string, few: string, many: string): string {
  if (n === 1) return `${n} ${one}`;
  if (n >= 2 && n <= 4) return `${n} ${few}`;
  return `${n} ${many}`;
}

export function formatRelativeDate(dateStr: string): string {
  const target = new Date(dateStr);
  const now = new Date();
  const diffMs = target.getTime() - now.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'dnes';
  if (diffDays === 1) return 'zajtra';
  if (diffDays === -1) return 'včera';

  if (diffDays > 0) {
    if (diffDays < 7) return `o ${pluralize(diffDays, 'deň', 'dni', 'dní')}`;
    if (diffDays < 30) return `o ${pluralize(Math.round(diffDays / 7), 'týždeň', 'týždne', 'týždňov')}`;
    return `o ${pluralize(Math.round(diffDays / 30), 'mesiac', 'mesiace', 'mesiacov')}`;
  }

  const absDays = Math.abs(diffDays);
  if (absDays < 7) return `pred ${pluralize(absDays, 'dňom', 'dňami', 'dňami')}`;
  if (absDays < 30) return `pred ${pluralize(Math.round(absDays / 7), 'týždňom', 'týždňami', 'týždňami')}`;
  return `pred ${pluralize(Math.round(absDays / 30), 'mesiacom', 'mesiacmi', 'mesiacmi')}`;
}

const MONTHS = [
  'januára', 'februára', 'marca', 'apríla', 'mája', 'júna',
  'júla', 'augusta', 'septembra', 'októbra', 'novembra', 'decembra',
];

export function formatDateSlovak(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getDate()}. ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}
