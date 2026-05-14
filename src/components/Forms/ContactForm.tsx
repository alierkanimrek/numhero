import { useState } from 'react';
import { useContacts } from '../../context/ContactContext';

interface Props { onClose?: () => void; editId?: string; }

export function ContactForm({ onClose, editId }: Props) {
  const { contacts, addContact, updateContact } = useContacts();
  const editing = editId ? contacts.find(c => c.id === editId) : null;

  const [fullName, setFullName] = useState(editing?.fullName || '');
  const [birthDate, setBirthDate] = useState(editing?.birthDate || '');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!fullName.trim() || !birthDate) {
      setError('Ad soyad ve doğum tarihi zorunludur.');
      return;
    }
    if (editId) {
      updateContact(editId, { fullName: fullName.trim(), birthDate });
    } else {
      addContact({ fullName: fullName.trim(), birthDate });
    }
    onClose?.();
  };

  return (
    <div className="space-y-3">
      {error && (
        <p style={{ color: '#DC2626', fontSize: '0.85rem', background: '#FEF2F2', padding: '8px 12px', borderRadius: 6 }}>
          {error}
        </p>
      )}
      <div className="grid gap-3" style={{ gridTemplateColumns: '1fr auto' }}>
        <div>
          <label style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--ink)', opacity: 0.55, display: 'block', marginBottom: 4, letterSpacing: '0.05em' }}>
            AD SOYAD *
          </label>
          <input
            className="input-field"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            placeholder="Ahmet Mehmet Yılmaz"
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          />
        </div>
        <div>
          <label style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--ink)', opacity: 0.55, display: 'block', marginBottom: 4, letterSpacing: '0.05em' }}>
            DOĞUM TARİHİ *
          </label>
          <input
            className="input-field"
            type="date"
            value={birthDate}
            onChange={e => setBirthDate(e.target.value)}
            style={{ width: 180 }}
          />
        </div>
      </div>
      <div className="flex gap-2 pt-1">
        <button className="btn-primary" onClick={handleSubmit}>
          {editId ? 'Güncelle' : '+ Ekle'}
        </button>
        {!editId && (
          <button className="btn-secondary" onClick={() => { setFullName(''); setBirthDate(''); setError(''); }}>
            Temizle
          </button>
        )}
        {onClose && (
          <button className="btn-secondary" onClick={onClose}>İptal</button>
        )}
      </div>
    </div>
  );
}
