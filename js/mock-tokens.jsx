/* ───── Theme tokens overview card (palette + type + sample)
   Sits as the first artboard in each theme section.
   Artboard: 920 × 360 */

function MockTokens({ t }) {
  const swatches = [
    { label: 'Background',   key: 'bg' },
    { label: 'Surface',      key: 'surface' },
    { label: 'Ink',          key: 'ink' },
    { label: 'Muted',        key: 'muted' },
    { label: 'Accent',       key: 'accent' },
    { label: 'Accent soft',  key: 'accentSoft' },
    { label: 'Accent 2',     key: 'accent2' },
    { label: 'Success',      key: 'success' },
  ];

  return (
    <div style={{ ...themeStyle(t), padding: '24px 28px', overflow: 'hidden', position: 'relative' }}>
      <Nameplate t={t}/>

      {/* header */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 4 }}>
        <span style={{
          fontFamily: t.fonts.display, fontSize: 28, fontWeight: 700,
          letterSpacing: -0.6, color: t.color.ink,
        }}>{t.name}</span>
        <span style={{
          fontSize: 11, fontWeight: 600, letterSpacing: 1.4,
          textTransform: 'uppercase', color: t.color.accent,
        }}>{t.mode === 'dark' ? 'Dark mode mặc định' : 'Light mode'}</span>
      </div>
      <div style={{ fontSize: 13, color: t.color.muted, marginBottom: 22, maxWidth: 540 }}>
        {t.tagline}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 24 }}>

        {/* PALETTE */}
        <div>
          <Label t={t}>Palette</Label>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8,
            marginTop: 4,
          }}>
            {swatches.map(s => {
              const c = t.color[s.key];
              const dark = isDarkColor(c);
              return (
                <div key={s.key} style={{
                  background: c,
                  border: `1px solid ${t.color.line}`,
                  borderRadius: t.radius.md,
                  padding: '14px 12px 10px',
                  color: dark ? '#fff' : '#000',
                  height: 78, display: 'flex', flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', opacity: .85 }}>
                    {s.label}
                  </div>
                  <div style={{ fontFamily: t.fonts.mono, fontSize: 10, opacity: .9 }}>{c}</div>
                </div>
              );
            })}
          </div>

          {/* radius + shadow ribbon */}
          <div style={{ display: 'flex', gap: 10, marginTop: 14, alignItems: 'center' }}>
            <Label t={t} style={{ marginBottom: 0, marginRight: 4 }}>Radius</Label>
            {['sm','md','lg','xl'].map(k => (
              <div key={k} style={{
                width: 36, height: 28,
                background: t.color.surface,
                border: `1px solid ${t.color.line}`,
                borderRadius: t.radius[k],
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontFamily: t.fonts.mono, color: t.color.muted,
              }}>{t.radius[k].replace('px','')}</div>
            ))}
          </div>
        </div>

        {/* TYPE */}
        <div>
          <Label t={t}>Type</Label>
          <div style={{
            background: t.color.surface,
            border: `1px solid ${t.color.line}`,
            borderRadius: t.radius.md,
            padding: '16px 18px',
            marginTop: 4,
          }}>
            <div style={{
              fontFamily: t.fonts.display, fontSize: 30, fontWeight: 600,
              lineHeight: 1.05, letterSpacing: -0.6, color: t.color.ink,
              fontStyle: t.id === 'studio' ? 'italic' : 'normal',
            }}>destination</div>
            <div style={{
              fontFamily: t.fonts.phonetic, fontStyle: 'italic',
              fontSize: 16, color: t.color.accent, marginTop: 4,
            }}>/ˌdes.tɪˈneɪ.ʃən/</div>
            <div style={{
              marginTop: 12, fontSize: 13, color: t.color.inkSoft, lineHeight: 1.6,
              fontFamily: t.fonts.body,
            }}>
              Body text in <strong>{shortFont(t.fonts.body)}</strong> — the place where someone
              is travelling to or where something is being sent.
            </div>
            <div style={{
              marginTop: 8, fontFamily: t.fonts.mono, fontSize: 11, color: t.color.mutedSoft,
            }}>
              23:14 · /ˌdes.tɪˈneɪ.ʃən/ · {shortFont(t.fonts.mono)}
            </div>
          </div>

          {/* button row */}
          <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
            <Btn t={t} variant="primary" size="md" icon={<Icon.Play size={13}/>}>Bắt đầu</Btn>
            <Btn t={t} variant="secondary" size="md" icon={<Icon.Sparkle size={13}/>}>Gợi ý</Btn>
            <Btn t={t} variant="outline" size="md">Outline</Btn>
            <Btn t={t} variant="ghost" size="md">Ghost</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

function isDarkColor(hex) {
  const h = hex.replace('#', '');
  if (h.length < 6) return false;
  const r = parseInt(h.slice(0,2),16),
        g = parseInt(h.slice(2,4),16),
        b = parseInt(h.slice(4,6),16);
  // perceived luminance
  return (0.299*r + 0.587*g + 0.114*b) < 145;
}
function shortFont(stack) {
  const f = (stack || '').split(',')[0].replace(/['"]/g, '').trim();
  return f || 'sans';
}

window.MockTokens = MockTokens;
