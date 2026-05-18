export const NUMBER_COLORS: Record<number, { primary: string; bg: string; text: string }> = {
  1: { primary: '#FF5500', bg: '#FFF2EC', text: '#CC4400' },
  2: { primary: '#FFFF00', bg: '#FFFFF0', text: '#999900' },
  3: { primary: '#55FF00', bg: '#F2FFEC', text: '#33AA00' },
  4: { primary: '#00FF55', bg: '#ECFFF2', text: '#00AA33' },
  5: { primary: '#00FFFF', bg: '#ECFFFF', text: '#009999' },
  6: { primary: '#0055FF', bg: '#ECF2FF', text: '#0033CC' },
  7: { primary: '#5500FF', bg: '#F2ECFF', text: '#3300CC' },
  8: { primary: '#FF00FF', bg: '#FFECFF', text: '#CC00CC' },
  9: { primary: '#FF0055', bg: '#FFECF2', text: '#CC0033' },
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
