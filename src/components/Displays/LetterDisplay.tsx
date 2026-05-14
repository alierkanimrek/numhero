import { getNumberColor } from '../../utils/colorUtils';

interface LetterItem { letter: string; value: number; }
interface Props { letters: LetterItem[]; title?: string; }

export function LetterDisplay({ letters, title }: Props) {
  return (
    <div style={{marginBottom:8}}>
      {title && <p style={{fontSize:'0.72rem',fontWeight:600,letterSpacing:'0.05em',color:'var(--ink)',opacity:0.45,marginBottom:6}}>{title}</p>}
      <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
        {letters.map((l, i) => {
          const c = getNumberColor(l.value);
          return (
            <span key={i} style={{
              display:'inline-flex', alignItems:'center', gap:2,
              background:c.bg, border:`1px solid ${c.primary}30`,
              borderRadius:6, padding:'3px 7px', fontSize:'0.85rem',
            }}>
              <span style={{fontFamily:"'Outfit',sans-serif",fontWeight:600,color:c.text}}>{l.letter}</span>
              <span style={{fontSize:'0.7rem',color:c.text,opacity:0.7}}>({l.value})</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
