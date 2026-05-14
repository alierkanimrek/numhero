export interface Contact {
  id: string;
  fullName: string;          // "Ahmet Mehmet Yılmaz" — tek string
  birthDate: string;         // YYYY-MM-DD
  letterValues: Record<string, number>;
  createdAt: string;
}

export interface LetterDef {
  letter: string;
  number: number;
  type: 'vowel' | 'consonant';
}

export interface LetterDictionary {
  language: string;
  languageCode: string;
  description: string;
  letters: LetterDef[];
}

// Bir ismin (boşlukla ayrılmış parça) hesap detayı
export interface NamePart {
  name: string;
  letterDetails: Array<{ letter: string; value: number }>;
  sum: number;
  specialNumbers: number[];   // sum özel sayı ise buraya eklenir
  root: number;               // her zaman tek basamak dijital kök
}

export interface KulvarResult {
  perName: NamePart[];
  roots: number[];            // her ismin root'u
  totalSum: number;           // root'ların toplamı
  specialNumbers: number[];   // toplam özel sayı ise + bireysel özel sayılar
  finalRoot: number;          // her zaman tek basamak
}

export interface LifePurpose {
  firstNumber: number;
  secondNumber: number;
}

export interface LifeTreeRow {
  number: number;
  leftCount: number;
  rightCount: number;
}

export interface NumerologyResults {
  letterDetails: Array<{ letter: string; value: number }>;
  anaKulvar: KulvarResult;
  yanKulvar: KulvarResult;
  fonKulvar: KulvarResult;
  pinCode: number[];
  lifePurpose: LifePurpose;
  lifeTree: LifeTreeRow[];
}

export type Page = 'rehber' | 'numeroloji' | 'sinastri';
