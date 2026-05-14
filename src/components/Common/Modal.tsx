import { useEffect } from 'react';

interface Props {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ title, onClose, children }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box">
        <div className="flex items-center justify-between p-5 border-b" style={{borderColor:'rgba(201,168,76,0.2)'}}>
          <h2 style={{fontFamily:"'Outfit',sans-serif", fontSize:'1.25rem', fontWeight:600, color:'var(--ink)'}}>{title}</h2>
          <button onClick={onClose} style={{fontSize:'1.5rem', lineHeight:1, color:'var(--ink)', opacity:0.5, cursor:'pointer', background:'none', border:'none'}} aria-label="Kapat">×</button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
