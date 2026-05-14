import type { LifeTreeRow } from '../../types';
import { getNumberColor } from '../../utils/colorUtils';

interface Props { lifeTree: LifeTreeRow[]; }

const ICONS = { left: '🔥', right: '⚡' };

export function LifeTreeTable({ lifeTree }: Props) {
  return (
    <div className="parchment-card p-5">
      <h3 style={{ fontFamily: "'Outfit',sans-serif", fontSize: '1.1rem', fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>
        Yaşam Ağacı
      </h3>
      <div style={{ display: 'flex', gap: 16, marginBottom: 16, fontSize: '0.75rem', color: 'var(--ink)', opacity: 0.45 }}>
        <span>🔥 Pin Kodu</span>
        <span>⚡ Ad-Soyad</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {lifeTree.map(row => {
          const c = getNumberColor(row.number);
          return (
            <div key={row.number} style={{
              display: 'grid', gridTemplateColumns: '1fr 56px 1fr',
              alignItems: 'center', gap: 16, padding: '8px 4px',
              borderBottom: '1px solid rgba(201,168,76,0.1)',
            }}>
              {/* Left: pin kodu noktalari */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end', alignItems: 'center', minHeight: 24 }}>
                {Array.from({ length: row.leftCount }).map((_, i) => (
                  <span key={i} style={{
                    width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                    background: c.primary, display: 'inline-block',
                    boxShadow: `0 2px 6px ${c.primary}70`,
                  }} title={ICONS.left} />
                ))}
              </div>

              {/* Center: sayı */}
              <div style={{
                width: 52, height: 52, borderRadius: '50%',
                background: c.bg, color: c.text,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: '1.3rem',
                border: `2px solid ${c.primary}30`, margin: '0 auto',
              }}>
                {row.number}
              </div>

              {/* Right: ad-soyad noktalari */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'center', minHeight: 24 }}>
                {Array.from({ length: row.rightCount }).map((_, i) => (
                  <span key={i} style={{
                    width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                    background: c.primary, display: 'inline-block',
                    boxShadow: `0 2px 6px ${c.primary}50`,
                    opacity: 0.65,
                  }} title={ICONS.right} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
