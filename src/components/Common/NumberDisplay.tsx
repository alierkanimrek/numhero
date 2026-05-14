import { getNumberColor, PLANET_NAMES } from '../../utils/colorUtils';

interface Props {
  number: number;
  size?: 'big' | 'normal' | 'small';
  showPlanet?: boolean;
  className?: string;
}

const SIZE = {
  big: { fs: '3.2rem', w: 104, h: 104 },
  normal: { fs: '1.75rem', w: 68, h: 68 },
  small: { fs: '1.1rem', w: 48, h: 48 },
};

export function NumberDisplay({ number, size = 'normal', showPlanet = false, className = '' }: Props) {
  const c = getNumberColor(number);
  const d = SIZE[size];
  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      <div style={{
        width:d.w, height:d.h, fontSize:d.fs,
        background:c.bg, color:c.text,
        borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center',
        fontFamily:"'Outfit',sans-serif", fontWeight:700,
        border:`2px solid ${c.primary}40`, boxShadow:`0 4px 16px ${c.primary}25`,
        transition:'transform 0.2s',
      }}>
        {number}
      </div>
      {showPlanet && <span style={{fontSize:'0.65rem',color:c.text,opacity:0.7,fontWeight:500}}>{PLANET_NAMES[number]}</span>}
    </div>
  );
}

export function ColoredNumber({ number, size = 'normal' }: { number: number; size?: 'big' | 'normal' | 'small' }) {
  const c = getNumberColor(number);
  const fs = size === 'big' ? '3.5rem' : size === 'normal' ? '1.4rem' : '0.95rem';
  return <span style={{color:c.text, fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:fs}}>{number}</span>;
}
