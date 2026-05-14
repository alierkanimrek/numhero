import { useState } from 'react';
import { useContacts } from '../../context/ContactContext';
import { ContactForm } from '../Forms/ContactForm';
import { LetterValuesModal } from '../Forms/LetterValuesModal';
import { ImportExportPanel } from '../Forms/ImportExportPanel';
import { formatBirthDate } from '../../utils/calculations';

export function HomePage() {
  const { contacts, selectedContactId, setSelectedContactId, deleteContact, setCurrentPage } = useContacts();
  const selected = contacts.find(c => c.id === selectedContactId);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [showLetters, setShowLetters] = useState(false);

  const handleDelete = (id: string) => {
    if (window.confirm('Bu kişiyi silmek istediğinizden emin misiniz?')) deleteContact(id);
  };

  return (
    <div className="page-enter" style={{ display: 'flex', gap: 0, minHeight: 'calc(100vh - 56px)' }}>
      {/* Sidebar */}
      <aside style={{ width: 260, minWidth: 200, borderRight: '1px solid rgba(201,168,76,0.2)', background: '#FDFAF3', padding: '20px 12px', display: 'flex', flexDirection: 'column', gap: 4, overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.06em', color: 'var(--ink)', opacity: 0.4 }}>
            REHBER ({contacts.length})
          </p>
          <button className="btn-gold" style={{ fontSize: '0.75rem', padding: '4px 10px' }} onClick={() => { setShowForm(true); setEditId(null); }}>
            + Yeni
          </button>
        </div>

        {contacts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '24px 12px', color: 'var(--ink)', opacity: 0.35, fontSize: '0.85rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: 8 }}>◈</div>
            Henüz kişi eklenmedi
          </div>
        )}

        {contacts.map(c => (
          <div
            key={c.id}
            className={`sidebar-item ${c.id === selectedContactId ? 'active' : ''}`}
            onClick={() => setSelectedContactId(c.id)}
          >
            <p style={{ fontWeight: 500, fontSize: '0.9rem', color: 'var(--ink)' }}>{c.fullName}</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--ink)', opacity: 0.45 }}>{formatBirthDate(c.birthDate)}</p>
          </div>
        ))}

        <div style={{ marginTop: 'auto', paddingTop: 16 }}>
          <ImportExportPanel />
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: 24, overflowY: 'auto' }}>
        {/* Add form */}
        {showForm && !editId && (
          <div className="parchment-card p-5 mb-6">
            <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: '1.15rem', fontWeight: 600, color: 'var(--ink)', marginBottom: 16 }}>
              Yeni Kişi Ekle
            </h2>
            <ContactForm onClose={() => setShowForm(false)} />
          </div>
        )}

        {/* Edit form */}
        {editId && (
          <div className="parchment-card p-5 mb-6">
            <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: '1.15rem', fontWeight: 600, color: 'var(--ink)', marginBottom: 16 }}>
              Kişiyi Düzenle
            </h2>
            <ContactForm editId={editId} onClose={() => setEditId(null)} />
          </div>
        )}

        {/* Selected contact */}
        {selected && !editId && (
          <div className="parchment-card p-6">
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
              <div>
                <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: '1.8rem', fontWeight: 700, color: 'var(--ink)' }}>
                  {selected.fullName}
                </h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--ink)', opacity: 0.5, marginTop: 2 }}>
                  🗓 {formatBirthDate(selected.birthDate)}
                </p>
                {Object.keys(selected.letterValues || {}).length > 0 && (
                  <p style={{ fontSize: '0.75rem', color: 'var(--gold)', marginTop: 4 }}>
                    ✦ {Object.keys(selected.letterValues).length} harf özelleştirildi
                  </p>
                )}
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button className="btn-secondary" onClick={() => setEditId(selected.id)}>Düzenle</button>
                <button className="btn-secondary" onClick={() => setShowLetters(true)}>Harf Karşılıkları</button>
                <button className="btn-secondary" onClick={() => setCurrentPage('numeroloji')}>Numeroloji →</button>
                <button className="btn-danger" onClick={() => handleDelete(selected.id)}>Sil</button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px,1fr))', gap: 12 }}>
              {[
                { label: 'Ad Soyad', value: selected.fullName },
                { label: 'Doğum', value: formatBirthDate(selected.birthDate) },
                { label: 'Parça Sayısı', value: `${( selected.fullName ?? '' ).trim().split(/\s+/).length} kelime` },
              ].map(item => (
                <div key={item.label} style={{ background: 'rgba(201,168,76,0.06)', borderRadius: 8, padding: '10px 14px' }}>
                  <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.04em', color: 'var(--ink)', opacity: 0.4, marginBottom: 2 }}>
                    {item.label.toUpperCase()}
                  </p>
                  <p style={{ fontWeight: 500, color: 'var(--ink)', fontFamily: "'Outfit',sans-serif" }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {!selected && contacts.length === 0 && !showForm && (
          <div style={{ textAlign: 'center', padding: '80px 24px', color: 'var(--ink)', opacity: 0.4 }}>
            <div style={{ fontSize: '4rem', marginBottom: 16, color: 'var(--gold)' }}>✦</div>
            <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '1.5rem', fontWeight: 600, marginBottom: 8 }}>numhero</p>
            <p style={{ fontSize: '0.95rem' }}>Başlamak için "Yeni" butonuna tıklayın.</p>
          </div>
        )}

        {!selected && contacts.length > 0 && (
          <div style={{ textAlign: 'center', padding: '60px 24px', color: 'var(--ink)', opacity: 0.4 }}>
            <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '1.1rem' }}>Soldaki listeden bir kişi seçin</p>
          </div>
        )}
      </main>

      {showLetters && selected && (
        <LetterValuesModal contactId={selected.id} onClose={() => setShowLetters(false)} />
      )}
    </div>
  );
}
