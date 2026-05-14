import type { Contact } from '../types';

const STORAGE_KEY = 'numerology_contacts';

// Eski format (firstName/middleName/lastName) → yeni format (fullName) migrasyonu
function migrateContact(raw: Record<string, unknown>): Contact {
  if (typeof raw.fullName === 'string') {
    return raw as unknown as Contact;
  }
  // Eski kayıt: firstName + middleName + lastName birleştir
  const parts = [raw.firstName, raw.middleName, raw.lastName]
    .filter((p): p is string => typeof p === 'string' && p.trim().length > 0);
  return {
    id: String(raw.id ?? ''),
    fullName: parts.join(' '),
    birthDate: String(raw.birthDate ?? ''),
    letterValues: (raw.letterValues as Record<string, number>) ?? {},
    createdAt: String(raw.createdAt ?? new Date().toISOString()),
  };
}

export function loadContacts(): Contact[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Record<string, unknown>[];
    return parsed.map(migrateContact);
  } catch {
    return [];
  }
}

export function saveContacts(contacts: Contact[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  } catch (e) {
    console.error('localStorage error:', e);
  }
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}
