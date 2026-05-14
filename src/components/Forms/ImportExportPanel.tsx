import { useRef, useState } from 'react';
import { useContacts } from '../../context/ContactContext';
import type { Contact } from '../../types';

export function ImportExportPanel() {
  const { exportContacts, importContacts, contacts } = useContacts();
  const fileRef = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState('');

  const handleExport = () => {
    const data = exportContacts();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `numhero-contacts-${new Date().toISOString().slice(0,10)}.json`;
    a.click(); URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result as string) as Contact[];
        if (!Array.isArray(parsed)) throw new Error('Geçersiz format');
        const replace = window.confirm(
          `${parsed.length} kişi bulundu.\n\nTamam: Mevcut verilerin üzerine yaz\nİptal: Mevcut verilerle birleştir`
        );
        importContacts(parsed, replace);
        setMsg(`${parsed.length} kişi ${replace ? 'yüklendi' : 'eklendi'}.`);
        setTimeout(() => setMsg(''), 3000);
      } catch {
        setMsg('Geçersiz JSON dosyası!');
        setTimeout(() => setMsg(''), 3000);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div style={{borderTop:'1px solid rgba(201,168,76,0.2)',paddingTop:12,marginTop:12}}>
      <p style={{fontSize:'0.7rem',fontWeight:600,letterSpacing:'0.05em',color:'var(--ink)',opacity:0.4,marginBottom:8}}>VERİ YÖNETİMİ</p>
      <div className="flex gap-2 flex-wrap">
        <button className="btn-secondary" style={{fontSize:'0.8rem',padding:'6px 12px'}} onClick={handleExport} disabled={contacts.length === 0}>
          ↓ İndir
        </button>
        <button className="btn-secondary" style={{fontSize:'0.8rem',padding:'6px 12px'}} onClick={() => fileRef.current?.click()}>
          ↑ Yükle
        </button>
        <input ref={fileRef} type="file" accept=".json" style={{display:'none'}} onChange={handleImport} />
      </div>
      {msg && <p style={{fontSize:'0.8rem',color:'#16A34A',marginTop:6}}>{msg}</p>}
    </div>
  );
}
