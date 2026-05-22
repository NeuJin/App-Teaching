/* ───── Shared primitives for all theme mockups.
   All read color/font/radius from the `t` prop (theme tokens).
   ───── */

// Returns CSS vars + base font for an artboard
function themeStyle(t) {
  return {
    background: t.color.bg,
    color: t.color.ink,
    fontFamily: t.fonts.body,
    fontSize: 13,
    lineHeight: 1.5,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    boxSizing: 'border-box',
    WebkitFontSmoothing: 'antialiased',
  };
}

// Generic surface card
const Surface = ({ t, style = {}, children, alt, ...rest }) => (
  <div {...rest} style={{
    background: alt ? t.color.surfaceAlt : t.color.surface,
    border: `1px solid ${t.color.line}`,
    borderRadius: t.radius.lg,
    boxShadow: t.shadow.sm,
    ...style,
  }}>{children}</div>
);

// Pill / chip / badge
const Chip = ({ t, tone = 'muted', children, style = {} }) => {
  const tones = {
    muted:   { bg: t.color.surfaceAlt, fg: t.color.muted, bd: t.color.line },
    accent:  { bg: t.color.accentSoft, fg: t.color.accent, bd: 'transparent' },
    solid:   { bg: t.color.accent,     fg: t.mode === 'dark' ? '#0b1220' : '#fff', bd: 'transparent' },
    success: { bg: t.mode === 'dark' ? 'rgba(52,211,153,.15)' : '#ecfdf5', fg: t.color.success, bd: 'transparent' },
  };
  const c = tones[tone] || tones.muted;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '3px 10px', borderRadius: 999,
      fontSize: 11, fontWeight: 600, letterSpacing: .1,
      background: c.bg, color: c.fg, border: `1px solid ${c.bd}`,
      ...style,
    }}>{children}</span>
  );
};

// Button variants
const Btn = ({ t, variant = 'primary', size = 'md', icon, children, style = {}, ...rest }) => {
  const sizes = {
    sm: { p: '5px 10px', fs: 12 },
    md: { p: '8px 14px', fs: 13 },
    lg: { p: '11px 20px', fs: 14 },
  };
  const variants = {
    primary: {
      bg: t.color.accent, fg: t.mode === 'dark' ? '#0b1220' : '#fff',
      bd: 'transparent',
    },
    secondary: {
      bg: t.color.accentSoft, fg: t.color.accent, bd: 'transparent',
    },
    outline: {
      bg: 'transparent', fg: t.color.ink, bd: t.color.line,
    },
    ghost: {
      bg: 'transparent', fg: t.color.muted, bd: 'transparent',
    },
    danger: {
      bg: 'transparent', fg: t.color.danger, bd: t.color.line,
    },
  };
  const s = sizes[size], v = variants[variant];
  return (
    <button {...rest} style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: s.p, fontSize: s.fs, fontWeight: 600,
      fontFamily: t.fonts.body,
      background: v.bg, color: v.fg,
      border: `1px solid ${v.bd}`, borderRadius: t.radius.md,
      cursor: 'pointer', whiteSpace: 'nowrap',
      ...style,
    }}>
      {icon}
      {children}
    </button>
  );
};

// Input look (visual only)
const Input = ({ t, placeholder, value, large, style = {}, mono }) => (
  <div style={{
    padding: large ? '10px 14px' : '7px 11px',
    fontSize: large ? 14 : 13,
    fontFamily: mono ? t.fonts.mono : t.fonts.body,
    color: value ? t.color.ink : t.color.mutedSoft,
    background: t.color.surface,
    border: `1px solid ${t.color.line}`,
    borderRadius: t.radius.md,
    ...style,
  }}>{value || placeholder}</div>
);

// Label uppercase tracking small
const Label = ({ t, children, style = {} }) => (
  <div style={{
    fontSize: 10, fontWeight: 700, letterSpacing: 1.2,
    textTransform: 'uppercase', color: t.color.muted,
    marginBottom: 5, ...style,
  }}>{children}</div>
);

// Theme nameplate (used in artboard top-right corner)
const Nameplate = ({ t }) => (
  <div style={{
    position: 'absolute', top: 10, right: 12, zIndex: 5,
    display: 'flex', alignItems: 'center', gap: 6,
    padding: '4px 10px', fontSize: 11, fontWeight: 600,
    background: t.mode === 'dark' ? 'rgba(255,255,255,.08)' : 'rgba(0,0,0,.04)',
    color: t.color.muted,
    border: `1px solid ${t.color.line}`,
    borderRadius: 999,
    fontFamily: t.fonts.body,
  }}>
    <span style={{
      width: 7, height: 7, borderRadius: '50%',
      background: t.color.accent,
    }}/>
    {t.name}
  </div>
);

// Stat box (dashboard)
const StatCard = ({ t, num, label }) => (
  <Surface t={t} style={{ padding: '20px 22px', textAlign: 'left' }}>
    <div style={{
      fontFamily: t.fonts.display,
      fontSize: 44, lineHeight: 1, fontWeight: 700, letterSpacing: -1,
      color: t.color.ink, marginBottom: 8,
      fontVariantNumeric: 'tabular-nums',
    }}>{num}</div>
    <div style={{
      fontSize: 12, color: t.color.muted, fontWeight: 500,
    }}>{label}</div>
  </Surface>
);

// Section header label
const SectionTitle = ({ t, kicker, title, children }) => (
  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 14 }}>
    {kicker && <span style={{
      fontSize: 10, fontWeight: 700, letterSpacing: 1.4,
      textTransform: 'uppercase', color: t.color.accent,
    }}>{kicker}</span>}
    {title && <span style={{
      fontFamily: t.fonts.display, fontSize: 18, fontWeight: 600, color: t.color.ink,
    }}>{title}</span>}
    <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>{children}</div>
  </div>
);

// A subtly-striped image placeholder
const ImagePh = ({ t, w = '100%', h = 80, label }) => (
  <div style={{
    width: w, height: h,
    background: `repeating-linear-gradient(135deg, ${t.color.surfaceAlt} 0 8px, ${t.color.surface} 8px 16px)`,
    border: `1px dashed ${t.color.line}`,
    borderRadius: t.radius.md,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: t.fonts.mono, fontSize: 10, color: t.color.mutedSoft,
    letterSpacing: 1, textTransform: 'uppercase',
  }}>{label}</div>
);

Object.assign(window, { themeStyle, Surface, Chip, Btn, Input, Label, Nameplate, StatCard, SectionTitle, ImagePh });
