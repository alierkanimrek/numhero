// Vedic numerology planet colors
export const NUMBER_COLORS: Record<number, { primary: string; secondary: string; bg: string; text: string }> = {
  1: { primary: '#FF0000', secondary: '#FFA500', bg: '#FFF0F0', text: '#CC0000' },
  2: { primary: '#94A3B8', secondary: '#CBD5E1', bg: '#F8FAFC', text: '#64748B' },
  3: { primary: '#A855F7', secondary: '#FFFF00', bg: '#FAF5FF', text: '#7C3AED' },
  4: { primary: '#3B82F6', secondary: '#6B7280', bg: '#EFF6FF', text: '#1D4ED8' },
  5: { primary: '#16A34A', secondary: '#D2B48C', bg: '#F0FDF4', text: '#15803D' },
  6: { primary: '#EC4899', secondary: '#ADD8E6', bg: '#FDF2F8', text: '#DB2777' },
  7: { primary: '#65A30D', secondary: '#86EFAC', bg: '#F7FEE7', text: '#4D7C0F' },
  8: { primary: '#1E3A5F', secondary: '#374151', bg: '#EFF6FF', text: '#1E3A5F' },
  9: { primary: '#DC2626', secondary: '#9B2335', bg: '#FFF1F2', text: '#B91C1C' },
};

export function getNumberColor(n: number) {
  return NUMBER_COLORS[n] || NUMBER_COLORS[9];
}

export function getNumberTextColor(n: number): string {
  return getNumberColor(n).text;
}

export function getNumberBgColor(n: number): string {
  return getNumberColor(n).bg;
}

export function blendColors(n1: number, n2: number): string {
  const c1 = hexToRgb(NUMBER_COLORS[n1]?.primary || '#808080');
  const c2 = hexToRgb(NUMBER_COLORS[n2]?.primary || '#808080');
  if (!c1 || !c2) return '#808080';
  const r = Math.round((c1.r + c2.r) / 2);
  const g = Math.round((c1.g + c2.g) / 2);
  const b = Math.round((c1.b + c2.b) / 2);
  return `rgb(${r},${g},${b})`;
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : null;
}

export const PLANET_NAMES: Record<number, string> = {
  1: 'Güneş',
  2: 'Ay',
  3: 'Jüpiter',
  4: 'Rahu',
  5: 'Merkür',
  6: 'Venüs',
  7: 'Ketu',
  8: 'Satürn',
  9: 'Mars',
};
