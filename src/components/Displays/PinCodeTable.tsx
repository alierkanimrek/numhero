import { getNumberColor } from '../../utils/colorUtils';

interface Props { pinCode: number[]; size?: 'big' | 'small'; label?: string; }

function PinCell({ value, big }: { value: number; big: boolean }) {
  const c = getNumberColor(value);
  const sz = big ? 60 : 44;
  const fs = big ? '1.5rem' : '1.1rem';
  return (
    <div
      style={{
        width: sz, height: sz, flexShrink: 0,
        borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: c.bg, color: c.text,
        fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: fs,
        border: `2px solid ${c.primary}35`, boxShadow: `0 3px 10px ${c.primary}20`,
        transition: 'transform 0.2s', cursor: 'default',
      }}
      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.12)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
    >
      {value}
    </div>
  );
}

export function PinCodeTable({ pinCode, size = 'big', label }: Props) {
  if (pinCode.length < 9) return null;
  const big = size === 'big';
  const cellSize = big ? 60 : 44;
  const gap = big ? 10 : 8;

  // Toplam grid genişliği: 5 hücre + 4 boşluk
  const totalWidth = cellSize * 5 + gap * 4;
  // 3 hücrelik birleşik genişlik: 3 hücre + 2 boşluk
  const mergedW3 = cellSize * 3 + gap * 2;
  // 2 hücrelik birleşik genişlik: 2 hücre + 1 boşluk
  const mergedW2 = cellSize * 2 + gap;

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap,
    width: totalWidth,
  };

  return (
    <div className="parchment-card p-5">
      {label && (
        <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '1.1rem', fontWeight: 600, color: 'var(--ink)', marginBottom: 16 }}>
          {label}
        </p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap, alignItems: 'center' }}>

        {/* Satır 1: [0] [1] [2] [3] [4] */}
        <div style={rowStyle}>
          {[0, 1, 2, 3, 4].map(i => <PinCell key={i} value={pinCode[i]} big={big} />)}
        </div>

        {/* Satır 2: [ilk 3 hücre birleşik → 5 ve 6 yan yana ortalı] [3. hücre boş] [4. hücre boş] */}
        <div style={rowStyle}>
          {/* İlk 3 kolon birleşik: 5. ve 6. sayılar yan yana ortalı */}
          <div style={{ width: mergedW3, height: cellSize, display: 'flex', alignItems: 'center', justifyContent: 'center', gap }}>
            <PinCell value={pinCode[5]} big={big} />
            <PinCell value={pinCode[6]} big={big} />
          </div>
          {/* 4. ve 5. kolon boş */}
          <div style={{ width: cellSize, height: cellSize }} />
          <div style={{ width: cellSize, height: cellSize }} />
        </div>

        {/* Satır 3: [ilk 3 hücre birleşik → 7. sayı ortada] [son 2 hücre birleşik → 8. sayı ortada] */}
        <div style={rowStyle}>
          {/* İlk 3 kolon birleşik: 7. sayı ortada */}
          <div style={{ width: mergedW3, height: cellSize, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PinCell value={pinCode[7]} big={big} />
          </div>
          {/* Son 2 kolon birleşik: 8. sayı ortada */}
          <div style={{ width: mergedW2, height: cellSize, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PinCell value={pinCode[8]} big={big} />
          </div>
        </div>

      </div>


    </div>
  );
}
