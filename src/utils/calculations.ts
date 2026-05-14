import type { Contact, KulvarResult, LifePurpose, LifeTreeRow, NumerologyResults } from '../types';
import dictionary from '../data/dictionary.json';

const SPECIAL_NUMBERS = [11, 22, 33, 19];

// Build letter lookup map
const LETTER_MAP: Record<string, { number: number; type: 'vowel' | 'consonant' }> = {};
dictionary.letters.forEach(l => {
  LETTER_MAP[l.letter.toUpperCase()] = { number: l.number, type: l.type as 'vowel' | 'consonant' };
});

export function getLetterValue(letter: string, overrides: Record<string, number> = {}): number {
  const upper = letter.toUpperCase();
  if (overrides[upper] !== undefined) return overrides[upper];
  return LETTER_MAP[upper]?.number ?? 0;
}

export function getLetterType(letter: string): 'vowel' | 'consonant' | null {
  const upper = letter.toUpperCase();
  return LETTER_MAP[upper]?.type ?? null;
}

// Tam dijital kök: her zaman tek basamağa indirir.
// Yol boyunca geçilen özel sayıları da döndürür (bilgi amaçlı gösterim için).
export function digitalRootWithSpecials(n: number): { root: number; specialNumbers: number[] } {
  const specials: number[] = [];

  function reduce(x: number): number {
    if (x < 10) return x;
    if (SPECIAL_NUMBERS.includes(x)) specials.push(x);
    const next = String(x).split('').reduce((acc, d) => acc + parseInt(d), 0);
    return reduce(next);
  }

  const root = reduce(n);
  return { root, specialNumbers: [...new Set(specials)] };
}

// Pin kodu için basit indirgeme (özel sayı kontrolü yok)
export function simpleReduce(n: number): number {
  if (n < 10) return n;
  const sum = String(n).split('').reduce((acc, d) => acc + parseInt(d), 0);
  return simpleReduce(sum);
}

// fullName'i boşluklara göre parçalara ayır
function getNameParts(contact: Contact): string[] {
  return contact.fullName.trim().split(/\s+/).filter(n => n.length > 0);
}

function getLetterDetails(name: string, filterType: 'vowel' | 'consonant' | null, overrides: Record<string, number>) {
  return name.toUpperCase().split('').filter(ch => {
    if (!LETTER_MAP[ch]) return false;
    if (filterType === null) return true;
    return LETTER_MAP[ch].type === filterType;
  }).map(ch => ({ letter: ch, value: getLetterValue(ch, overrides) }));
}

export function calculateKulvar(
  contact: Contact,
  filterType: 'vowel' | 'consonant' | null
): KulvarResult {
  const names = getNameParts(contact);
  const overrides = contact.letterValues || {};

  const perName = names.map(name => {
    const letterDetails = getLetterDetails(name, filterType, overrides);
    const sum = letterDetails.reduce((acc, l) => acc + l.value, 0);
    const { root, specialNumbers } = digitalRootWithSpecials(sum);
    return { name, letterDetails, sum, specialNumbers, root };
  });

  const roots = perName.map(p => p.root);
  const totalSum = roots.reduce((acc, r) => acc + r, 0);
  const { root: finalRoot, specialNumbers: totalSpecials } = digitalRootWithSpecials(totalSum);

  // Tüm özel sayıları birleştir (isim bazlı + toplam bazlı)
  const allSpecials = [
    ...perName.flatMap(p => p.specialNumbers),
    ...totalSpecials,
  ];

  return {
    perName,
    roots,
    totalSum,
    specialNumbers: [...new Set(allSpecials)],
    finalRoot,
  };
}

export function calculatePinCode(birthDate: string): number[] {
  const [year, month, day] = birthDate.split('-').map(Number);

  const h1 = simpleReduce(day);
  const h2 = simpleReduce(month);
  const h3 = simpleReduce(year);
  const h4 = simpleReduce(h1 + h2 + h3);
  const h5 = simpleReduce(h1 + h4);

  const h6 = simpleReduce(h1 + h2);
  const h7 = simpleReduce(h2 + h3);
  const h8 = simpleReduce(h6 + h7);
  const h9 = simpleReduce(h1 + h2 + h3 + h4 + h5 + h6 + h7 + h8);

  return [h1, h2, h3, h4, h5, h6, h7, h8, h9];
}

export function calculateLifePurpose(birthDate: string): LifePurpose {
  const [year, month, day] = birthDate.split('-').map(Number);
  const all = [...String(day).split('').map(Number), ...String(month).split('').map(Number), ...String(year).split('').map(Number)];
  const total = all.reduce((a, b) => a + b, 0);

  let firstNumber = total;
  while (firstNumber >= 100) {
    firstNumber = String(firstNumber).split('').reduce((a, d) => a + parseInt(d), 0);
  }

  const secondNumber = String(firstNumber).split('').reduce((a, d) => a + parseInt(d), 0);
  return { firstNumber, secondNumber };
}

export function calculateLifeTree(pinCode: number[], nameNumbers: number[]): LifeTreeRow[] {
  const rows: LifeTreeRow[] = [];
  for (let i = 9; i >= 1; i--) {
    rows.push({
      number: i,
      leftCount: pinCode.filter(n => n === i).length,
      rightCount: nameNumbers.filter(n => n === i).length,
    });
  }
  return rows;
}

export function calculateNumerology(contact: Contact): NumerologyResults {
  const overrides = contact.letterValues || {};
  const names = getNameParts(contact);

  const letterDetails = names.flatMap(name =>
    name.toUpperCase().split('').filter(ch => LETTER_MAP[ch]).map(ch => ({
      letter: ch,
      value: getLetterValue(ch, overrides),
    }))
  );

  const anaKulvar = calculateKulvar(contact, 'vowel');
  const yanKulvar = calculateKulvar(contact, 'consonant');
  const fonKulvar = calculateKulvar(contact, null);

  const pinCode = calculatePinCode(contact.birthDate);
  const lifePurpose = calculateLifePurpose(contact.birthDate);

  const nameNumbers = letterDetails.map(l => digitalRootWithSpecials(l.value).root);
  const lifeTree = calculateLifeTree(pinCode, nameNumbers);

  return { letterDetails, anaKulvar, yanKulvar, fonKulvar, pinCode, lifePurpose, lifeTree };
}

export function calculateSynastryPinCode(pin1: number[], pin2: number[]): number[] {
  return pin1.map((v, i) => simpleReduce(v + pin2[i]));
}

export function getAllLettersList() {
  return dictionary.letters;
}

export function formatBirthDate(birthDate: string): string {
  if (!birthDate) return '';
  const [year, month, day] = birthDate.split('-');
  return `${day}/${month}/${year}`;
}
