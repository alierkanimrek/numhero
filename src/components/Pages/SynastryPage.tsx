import { useMemo } from 'react';
import { useContacts } from '../../context/ContactContext';
import {
  calculatePinCode, calculateLifePurpose, calculateSynastryPinCode, simpleReduce,
} from '../../utils/calculations';
import { PinCodeTable } from '../Displays/PinCodeTable';
import { LifePurposeDisplay } from '../Displays/LifePurposeDisplay';
import { NumberDisplay } from '../Common/NumberDisplay';

export function SynastryPage() {
  const { contacts, selectedContactId, selectedContact2Id, setSelectedContactId, setSelectedContact2Id } = useContacts();

  const c1 = contacts.find(c => c.id === selectedContactId);
  const c2 = contacts.find(c => c.id === selectedContact2Id);

  const pin1 = useMemo(() => c1 ? calculatePinCode(c1.birthDate) : null, [c1]);
  const pin2 = useMemo(() => c2 ? calculatePinCode(c2.birthDate) : null, [c2]);
  const synPin = useMemo(() => pin1 && pin2 ? calculateSynastryPinCode(pin1, pin2) : null, [pin1, pin2]);

  const lp1 = useMemo(() => c1 ? calculateLifePurpose(c1.birthDate) : null, [c1]);
  const lp2 = useMemo(() => c2 ? calculateLifePurpose(c2.birthDate) : null, [c2]);

  const commonPath = useMemo(() => {
    if (!lp1 || !lp2) return null;
    return simpleReduce(lp1.secondNumber + lp2.secondNumber);
  }, [lp1, lp2]);

  const ready = c1 && c2 && pin1 && pin2 && synPin && lp1 && lp2;

  return (
    <div className="page-enter" style={{ maxWidth: 900, margin: '0 auto', padding: '24px 16px' }}>

      {/* Kişi seçimi */}
      <div className="parchment-card p-5 mb-6">
        <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: '1.15rem', fontWeight: 600, color: 'var(--ink)', marginBottom: 16 }}>
          ⟡ Sinastri — İki Kişi Karşılaştırması
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 16, alignItems: 'center' }}>
          <div>
            <label style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.05em', color: 'var(--ink)', opacity: 0.45, display: 'block', marginBottom: 4 }}>1. KİŞİ</label>
            <select className="input-field" value={selectedContactId || ''} onChange={e => setSelectedContactId(e.target.value || null)}>
              <option value="">— Seçin —</option>
              {contacts.map(c => (
                <option key={c.id} value={c.id} disabled={c.id === selectedContact2Id}>{c.fullName}</option>
              ))}
            </select>
          </div>
          <div style={{ textAlign: 'center', fontSize: '1.5rem', color: 'var(--gold)', paddingTop: 20 }}>⟡</div>
          <div>
            <label style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.05em', color: 'var(--ink)', opacity: 0.45, display: 'block', marginBottom: 4 }}>2. KİŞİ</label>
            <select className="input-field" value={selectedContact2Id || ''} onChange={e => setSelectedContact2Id(e.target.value || null)}>
              <option value="">— Seçin —</option>
              {contacts.map(c => (
                <option key={c.id} value={c.id} disabled={c.id === selectedContactId}>{c.fullName}</option>
              ))}
            </select>
          </div>
        </div>
        {selectedContactId && selectedContact2Id && selectedContactId === selectedContact2Id && (
          <p style={{ color: '#DC2626', fontSize: '0.85rem', marginTop: 8 }}>⚠ İki farklı kişi seçmelisiniz.</p>
        )}
      </div>

      {!ready && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--ink)', opacity: 0.4 }}>
          <div style={{ fontSize: '3rem', marginBottom: 12, color: 'var(--gold)' }}>⟡</div>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '1.2rem' }}>İki kişi seçilerek sinastri hesaplanır</p>
        </div>
      )}

      {ready && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* İki kişinin pin kodları — küçük gösterim, yan yana */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <p style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.05em', color: 'var(--ink)', opacity: 0.45, marginBottom: 8 }}>
                {c1!.fullName.toUpperCase()} — PIN KODU
              </p>
              <PinCodeTable pinCode={pin1!} size="small" />
            </div>
            <div>
              <p style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.05em', color: 'var(--ink)', opacity: 0.45, marginBottom: 8 }}>
                {c2!.fullName.toUpperCase()} — PIN KODU
              </p>
              <PinCodeTable pinCode={pin2!} size="small" />
            </div>
          </div>

          {/* Sinastri pin kodu — büyük */}
          <PinCodeTable pinCode={synPin!} size="big" label="Sinastri Pin Kodu" />

          {/* İki kişinin yaşam amaçları — küçük gösterim, yan yana */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <LifePurposeDisplay lifePurpose={lp1!} size="small" label={`${c1!.fullName} — Yaşam Amacı`} />
            <LifePurposeDisplay lifePurpose={lp2!} size="small" label={`${c2!.fullName} — Yaşam Amacı`} />
          </div>

          {/* Ortak yaşam yolu */}
          {commonPath !== null && (
            <div className="parchment-card p-6" style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.05em', color: 'var(--ink)', opacity: 0.45, marginBottom: 8 }}>
                ORTAK YAŞAM YOLU
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--ink)', opacity: 0.5, marginBottom: 16 }}>
                {lp1!.secondNumber} + {lp2!.secondNumber} = {lp1!.secondNumber + lp2!.secondNumber} → {commonPath}
              </p>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <NumberDisplay number={commonPath} size="big" showPlanet />
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
