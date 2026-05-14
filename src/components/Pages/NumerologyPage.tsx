import { useMemo } from 'react';
import { useContacts } from '../../context/ContactContext';
import { calculateNumerology, formatBirthDate } from '../../utils/calculations';
import { KulvarDisplay } from '../Displays/KulvarDisplay';
import { PinCodeTable } from '../Displays/PinCodeTable';
import { LifePurposeDisplay } from '../Displays/LifePurposeDisplay';
import { LifeTreeTable } from '../Displays/LifeTreeTable';
import { LetterDisplay } from '../Displays/LetterDisplay';

export function NumerologyPage() {
  const { contacts, selectedContactId, setSelectedContactId } = useContacts();
  const contact = contacts.find(c => c.id === selectedContactId);

  const results = useMemo(() => {
    if (!contact) return null;
    return calculateNumerology(contact);
  }, [contact]);

  return (
    <div className="page-enter" style={{ maxWidth: 860, margin: '0 auto', padding: '20px 12px' }}>

      {/* Kişi seçici */}
      <div className="parchment-card p-4 mb-5">
        <div className="numerology-header" style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <label style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.05em', color: 'var(--ink)', opacity: 0.45, display: 'block', marginBottom: 4 }}>
              KİŞİ SEÇ
            </label>
            <select
              className="input-field"
              value={selectedContactId || ''}
              onChange={e => setSelectedContactId(e.target.value || null)}
            >
              <option value="">— Kişi seçin —</option>
              {contacts.map(c => (
                <option key={c.id} value={c.id}>
                  {c.fullName} · {formatBirthDate(c.birthDate)}
                </option>
              ))}
            </select>
          </div>
          {contact && (
            <div>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '1.2rem', fontWeight: 700, color: 'var(--ink)' }}>
                {contact.fullName}
              </p>
              <p style={{ fontSize: '0.82rem', color: 'var(--ink)', opacity: 0.5 }}>
                {formatBirthDate(contact.birthDate)}
              </p>
            </div>
          )}
        </div>
      </div>

      {!contact && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--ink)', opacity: 0.4 }}>
          <div style={{ fontSize: '3rem', marginBottom: 12, color: 'var(--gold)' }}>✦</div>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '1.1rem' }}>Hesaplama için bir kişi seçin</p>
        </div>
      )}

      {contact && results && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="parchment-card p-4">
            <LetterDisplay letters={results.letterDetails} title="HARF KARŞILIKLARI" />
          </div>
          <KulvarDisplay title="Ana Kulvar" subtitle="Sesli harfler — iç dünya, motivasyon" kulvar={results.anaKulvar} icon="◎" />
          <KulvarDisplay title="Yan Kulvar" subtitle="Sessiz harfler — dış dünya, davranış" kulvar={results.yanKulvar} icon="◈" />
          <KulvarDisplay title="Fon Kulvar" subtitle="Tüm harfler — genel karakter" kulvar={results.fonKulvar} icon="◇" />
          <PinCodeTable pinCode={results.pinCode} size="big" label="Pin Kodu" />
          <LifePurposeDisplay lifePurpose={results.lifePurpose} size="big" label="Yaşam Amacı" />
          <LifeTreeTable lifeTree={results.lifeTree} />
        </div>
      )}
    </div>
  );
}
