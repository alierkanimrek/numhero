import { useState } from 'react';
import type { KulvarResult } from '../../types';
import { getNumberColor } from '../../utils/colorUtils';
import { NumberDisplay, ColoredNumber } from '../Common/NumberDisplay';

interface Props {
  title: string;
  subtitle: string;
  kulvar: KulvarResult;
  icon?: string;
}

export function KulvarDisplay({ title, subtitle, kulvar, icon = '✦' }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="parchment-card p-5">
      {/* Header row: başlık + final sayı + toggle butonu */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ color: 'var(--gold)', fontSize: '1rem', flexShrink: 0 }}>{icon}</span>

        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ fontFamily: "'Outfit',sans-serif", fontSize: '1.1rem', fontWeight: 600, color: 'var(--ink)' }}>{title}</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--ink)', opacity: 0.5 }}>{subtitle}</p>
        </div>

        {/* Final number — her zaman görünür */}
        <NumberDisplay number={kulvar.finalRoot} size="normal" showPlanet />

        {/* Detay toggle */}
        <button
          onClick={() => setExpanded(v => !v)}
          style={{
            background: 'none', border: '1.5px solid rgba(201,168,76,0.35)', borderRadius: 8,
            padding: '5px 12px', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 500,
            color: 'var(--ink)', opacity: 0.65, transition: 'all 0.18s', whiteSpace: 'nowrap',
            fontFamily: "'Inter',sans-serif",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.opacity = '1'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.35)'; e.currentTarget.style.opacity = '0.65'; }}
          aria-expanded={expanded}
        >
          {expanded ? '▲ Gizle' : '▼ Ayrıntı'}
        </button>
      </div>

      {/* Collapsible detail section */}
      {expanded && (
        <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(201,168,76,0.2)', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Per-name breakdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {kulvar.perName.map((pn, i) => (
              <div key={i} className="kulvar-section">
                <p style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--ink)', opacity: 0.55, marginBottom: 5 }}>
                  {pn.name.toUpperCase()}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 4, fontSize: '0.95rem' }}>
                  {pn.letterDetails.length === 0 && (
                    <span style={{ color: 'var(--ink)', opacity: 0.3, fontSize: '0.85rem', fontStyle: 'italic' }}>— harf yok —</span>
                  )}
                  {pn.letterDetails.map((ld, j) => (
                    <span key={j} style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
                      <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 600, color: 'var(--ink)' }}>{ld.letter}</span>
                      <span style={{ fontSize: '0.72rem', color: getNumberColor(ld.value).text, fontWeight: 600 }}>({ld.value})</span>
                      {j < pn.letterDetails.length - 1 && <span style={{ color: 'var(--ink)', opacity: 0.25, margin: '0 1px' }}>+</span>}
                    </span>
                  ))}
                  {pn.letterDetails.length > 0 && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginLeft: 6 }}>
                      <span style={{ color: 'var(--ink)', opacity: 0.35 }}>=</span>
                      <span style={{ fontWeight: 600, color: 'var(--ink)' }}>{pn.sum}</span>
                      {pn.specialNumbers.length > 0 && (
                        <span style={{ fontSize: '0.72rem', background: '#FEF3C7', color: '#92400E', padding: '1px 6px', borderRadius: 4, marginLeft: 2 }}>
                          ★ {pn.specialNumbers.join(', ')}
                        </span>
                      )}
                      {pn.sum !== pn.root && (
                        <>
                          <span style={{ color: 'var(--ink)', opacity: 0.35 }}>→</span>
                          <ColoredNumber number={pn.root} size="normal" />
                        </>
                      )}
                      {pn.sum === pn.root && <ColoredNumber number={pn.root} size="normal" />}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Roots sum row (only when >1 name part) */}
          {kulvar.perName.length > 1 && (
            <div style={{ borderTop: '1px dashed rgba(201,168,76,0.3)', paddingTop: 10, display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--ink)', opacity: 0.5 }}>Kökler:</span>
              {kulvar.roots.map((r, i) => (
                <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                  <ColoredNumber number={r} size="small" />
                  {i < kulvar.roots.length - 1 && <span style={{ color: 'var(--ink)', opacity: 0.3 }}>+</span>}
                </span>
              ))}
              <span style={{ color: 'var(--ink)', opacity: 0.35, margin: '0 2px' }}>=</span>
              <span style={{ fontWeight: 600, color: 'var(--ink)' }}>{kulvar.totalSum}</span>
              {kulvar.specialNumbers.length > 0 && (
                <span style={{ fontSize: '0.72rem', background: '#FEF3C7', color: '#92400E', padding: '1px 6px', borderRadius: 4 }}>
                  ★ {kulvar.specialNumbers.join(', ')}
                </span>
              )}
              {kulvar.totalSum !== kulvar.finalRoot && (
                <>
                  <span style={{ color: 'var(--ink)', opacity: 0.35 }}>→</span>
                  <ColoredNumber number={kulvar.finalRoot} size="small" />
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
