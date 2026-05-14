import type { LifePurpose } from '../../types';
import { getNumberColor, blendColors } from '../../utils/colorUtils';

interface Props { lifePurpose: LifePurpose; size?: 'big' | 'small'; label?: string; }

export function LifePurposeDisplay({ lifePurpose, size = 'big', label }: Props) {
  const { firstNumber, secondNumber } = lifePurpose;

  // firstNumber may be 2 digits (e.g. 40), secondNumber is single
  const d1 = Math.floor(firstNumber / 10); // tens digit (may be 0)
  const d2 = firstNumber % 10;             // units digit

  // Color: if d1 == 0, use d2 color only; else blend
  let color: string;
  if (d1 === 0) {
    color = getNumberColor(d2).text;
  } else if (d2 === 0) {
    color = getNumberColor(d1).text;
  } else {
    color = blendColors(d1 === 0 ? d2 : d1, d2 === 0 ? d1 : d2);
  }

  const fs = size === 'big' ? '3.5rem' : '1.2rem';
  const sfx = size === 'big' ? '2rem' : '0.9rem';

  return (
    <div className="parchment-card p-5">
      {label && <p style={{fontFamily:"'Outfit',sans-serif",fontSize:'1.1rem',fontWeight:600,color:'var(--ink)',marginBottom:12}}>{label}</p>}
      <div style={{display:'flex',alignItems:'baseline',gap:6,justifyContent: size === 'big' ? 'center' : 'flex-start'}}>
        <span style={{fontFamily:"'Outfit',sans-serif",fontWeight:700,fontSize:fs,color,lineHeight:1}}>
          {firstNumber}
        </span>
        <span style={{fontFamily:"'Outfit',sans-serif",fontWeight:400,fontSize:sfx,color,opacity:0.6,lineHeight:1}}>/</span>
        <span style={{fontFamily:"'Outfit',sans-serif",fontWeight:700,fontSize:sfx,color:getNumberColor(secondNumber).text,lineHeight:1}}>
          {secondNumber}
        </span>
      </div>
      {size === 'big' && (
        <p style={{textAlign:'center',fontSize:'0.75rem',color:'var(--ink)',opacity:0.4,marginTop:8}}>
          Yaşam Amacı
        </p>
      )}
    </div>
  );
}
