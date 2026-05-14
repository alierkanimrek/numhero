import { useContacts } from '../../context/ContactContext';
import type { Page } from '../../types';

const pages: { id: Page; label: string }[] = [
  { id: 'rehber', label: '◈ Rehber' },
  { id: 'numeroloji', label: '✦ Numeroloji' },
  { id: 'sinastri', label: '⟡ Sinastri' },
];

export function Header() {
  const { currentPage, setCurrentPage } = useContacts();
  return (
    <header className="sticky top-0 z-40" style={{ background: 'rgba(245,240,232,0.92)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(201,168,76,0.25)' }}>
      <div style={{ maxWidth: '7xl', margin: '0 auto', padding: '10px 16px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '8px 16px' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: '1.5rem', color: 'var(--gold)' }}>✦</span>
          <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: '1.25rem', fontWeight: 600, color: 'var(--ink)' }}>
            num<span style={{ color: 'var(--gold)' }}>hero</span>
          </span>
        </div>
        {/* Nav — wraps below logo on small screens */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          {pages.map(p => (
            <button
              key={p.id}
              className={`nav-btn ${currentPage === p.id ? 'active' : ''}`}
              onClick={() => setCurrentPage(p.id)}
            >
              {p.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
