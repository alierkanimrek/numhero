import { useState } from 'react';
import { useContacts } from '../../context/ContactContext';
import { Modal } from '../Common/Modal';
import { getAllLettersList, getLetterValue } from '../../utils/calculations';
import { getNumberColor } from '../../utils/colorUtils';

interface Props { contactId: string; onClose: () => void; }

export function LetterValuesModal({ contactId, onClose }: Props) {
  const { contacts, updateContact } = useContacts();
  const contact = contacts.find(c => c.id === contactId);
  if (!contact) return null;

  const allLetters = getAllLettersList();
  const nameUpper = contact.fullName.toUpperCase();
  const usedLetters = [...new Set(nameUpper.split('').filter(ch => allLetters.find(l => l.letter === ch)))];

  const [values, setValues] = useState<Record<string, number>>({ ...contact.letterValues });

  const handleSave = () => {
    updateContact(contactId, { letterValues: values });
    onClose();
  };

  return (
    <Modal title="Harf Karşılıklarını Düzenle" onClose={onClose}>
      <p style={{ fontSize: '0.82rem', color: 'var(--ink)', opacity: 0.6, marginBottom: 12 }}>
        İsimde kullanılan harflerin sayı karşılıklarını özelleştirebilirsiniz.
      </p>
      <div style={{ background: 'rgba(201,168,76,0.07)', borderRadius: 8, padding: '8px 12px', marginBottom: 14, fontSize: '0.85rem', color: 'var(--ink)', opacity: 0.7 }}>
        <strong>İsim:</strong> {contact.fullName}
      </div>
      <div className="space-y-1">
        {usedLetters.map(letter => {
          const defaultVal = getLetterValue(letter);
          const currentVal = values[letter] ?? defaultVal;
          const c = getNumberColor(currentVal);
          const letterInfo = allLetters.find(l => l.letter === letter);
          const isCustom = values[letter] !== undefined && values[letter] !== defaultVal;
          return (
            <div key={letter} style={{ display: 'grid', gridTemplateColumns: '44px 1fr 44px', alignItems: 'center', gap: 10, padding: '7px 0', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
              <div style={{ width: 38, height: 38, borderRadius: '50%', background: c.bg, color: c.text, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: '1.05rem', border: `1px solid ${c.primary}30` }}>
                {letter}
              </div>
              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--ink)', opacity: 0.45 }}>
                  {letterInfo?.type === 'vowel' ? 'Sesli' : 'Sessiz'} · varsayılan: {defaultVal}
                </span>
                {isCustom && <span style={{ fontSize: '0.72rem', color: '#C9A84C', marginLeft: 6 }}>● özel</span>}
              </div>
              <input
                type="number" min={1} max={9}
                value={currentVal}
                onChange={e => {
                  const v = parseInt(e.target.value);
                  if (v >= 1 && v <= 9) setValues(prev => ({ ...prev, [letter]: v }));
                }}
                className="input-field"
                style={{ textAlign: 'center', padding: '5px 4px', width: 44 }}
              />
            </div>
          );
        })}
      </div>
      <div className="flex gap-2 mt-4">
        <button className="btn-primary" onClick={handleSave}>Kaydet</button>
        <button className="btn-secondary" onClick={() => setValues({})}>Sıfırla</button>
        <button className="btn-secondary" onClick={onClose}>İptal</button>
      </div>
    </Modal>
  );
}
