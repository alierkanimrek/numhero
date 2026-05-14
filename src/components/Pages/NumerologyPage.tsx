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

  const fullName = contact ? contact.fullName : '';

  return (
    <div className="page-enter" style={{ maxWidth: 900, margin: '0 auto', padding: '24px 16px' }}>
      {/* Header / person select */}
      <div className="parchment-card p-5 mb-6" style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.05em', color: 'var(--ink)', opacity: 0.45, display: 'block', marginBottom: 4 }}>
            KİŞİ SEÇ
          </label>
          <select
            className="input-field"
            style={{ maxWidth: 320 }}
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
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '1.3rem', fontWeight: 700, color: 'var(--ink)' }}>{fullName}</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--ink)', opacity: 0.5 }}>{formatBirthDate(contact.birthDate)}</p>
          </div>
        )}
      </div>

      {!contact && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--ink)', opacity: 0.4 }}>
          <div style={{ fontSize: '3rem', marginBottom: 12, color: 'var(--gold)' }}>✦</div>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '1.2rem' }}>Hesaplama için bir kişi seçin</p>
        </div>
      )}

      {contact && results && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Letter values */}
          <div className="parchment-card p-4">
            <LetterDisplay letters={results.letterDetails} title="HARF KARŞILIKLARI" />
          </div>

          {/* Ana Kulvar */}
          <KulvarDisplay
            title="Ana Kulvar"
            subtitle="Sesli harfler — iç dünya, motivasyon"
            kulvar={results.anaKulvar}
            icon="◎"
          />

          {/* Yan Kulvar */}
          <KulvarDisplay
            title="Yan Kulvar"
            subtitle="Sessiz harfler — dış dünya, davranış"
            kulvar={results.yanKulvar}
            icon="◈"
          />

          {/* Fon Kulvar */}
          <KulvarDisplay
            title="Fon Kulvar"
            subtitle="Tüm harfler — genel karakter"
            kulvar={results.fonKulvar}
            icon="◇"
          />

          {/* Pin Code */}
          <PinCodeTable pinCode={results.pinCode} size="big" label="Pin Kodu" />

          {/* Life Purpose */}
          <LifePurposeDisplay lifePurpose={results.lifePurpose} size="big" label="Yaşam Amacı" />

          {/* Life Tree */}
          <LifeTreeTable lifeTree={results.lifeTree} />
        </div>
      )}
    </div>
  );
}
