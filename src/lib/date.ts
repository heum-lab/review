// Formats an ISO timestamp as "YYYY.MM.DD HH:mm" in Korea Standard Time,
// regardless of the server's own timezone (Vercel runs in UTC).
const KST_FORMAT = new Intl.DateTimeFormat('ko-KR', {
  timeZone: 'Asia/Seoul',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
});

export function formatDate(iso: string): string {
  const p: Record<string, string> = {};
  for (const part of KST_FORMAT.formatToParts(new Date(iso))) p[part.type] = part.value;
  return `${p.year}.${p.month}.${p.day} ${p.hour}:${p.minute}`;
}
