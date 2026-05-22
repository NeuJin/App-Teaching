/* ───── DASHBOARD mockup ─────
   Hero + stats + recent sessions list.
   Artboard size: 920 × 600 */

function MockDashboard({ t }) {
  const sessions = [
    { day: 12, topic: 'Job Interview Practice', meta: 'Th 5 · B2 · 10 từ · 28 phút', score: 88 },
    { day: 11, topic: 'Travel Stories — Past Experiences', meta: 'Th 4 · B1+ · 8 từ · 30 phút', score: 76 },
    { day: 10, topic: 'Technology & Daily Life', meta: 'Th 3 · B1+ · 8 từ · 32 phút', score: 82 },
    { day: 9,  topic: 'Food & Restaurant Conversations', meta: 'Th 2 · B1 · 6 từ · 25 phút', score: 71 },
  ];

  return (
    <div style={{ ...themeStyle(t), padding: '28px 40px 24px', overflow: 'auto', position: 'relative', display: 'flex', flexDirection: 'column' }}>
      <Nameplate t={t} />

      {/* top profile strip — teacher greeting + student selector */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22,
        paddingBottom: 14, borderBottom: `1px solid ${t.color.lineSoft}`,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: `linear-gradient(135deg, ${t.color.accent}, ${t.color.accentHover})`,
          color: t.mode === 'dark' ? t.color.bg : '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: t.fonts.display, fontWeight: 700, fontSize: 14,
        }}>QA</div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.4, textTransform: 'uppercase', color: t.color.muted }}>Giáo viên</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: t.color.ink, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            Quỳnh Anh
            <Icon.Pencil size={11} color={t.color.mutedSoft}/>
          </div>
        </div>
        <div style={{ width: 1, height: 28, background: t.color.line, margin: '0 4px' }}/>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.4, textTransform: 'uppercase', color: t.color.muted }}>Học viên</div>
          <div style={{
            fontSize: 13, fontWeight: 600, color: t.color.ink,
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '3px 10px', marginLeft: -10, marginTop: -2,
            background: t.color.accentSoft, borderRadius: t.radius.sm,
          }}>
            Học viên
            <Icon.Pencil size={11} color={t.color.accent}/>
          </div>
        </div>
        <span style={{
          marginLeft: 'auto', fontFamily: t.fonts.mono, fontSize: 12,
          color: t.color.muted, fontVariantNumeric: 'tabular-nums',
        }}>Th 5, 22/05/2026 · 19:30</span>
      </div>

      {/* hero strip */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <div style={{
            fontSize: 11, fontWeight: 600, letterSpacing: 2,
            textTransform: 'uppercase', color: t.color.accent, marginBottom: 8,
          }}>
            <Icon.Book size={11} style={{ verticalAlign: -1, marginRight: 6 }}/>
            English Teaching Board
          </div>
          <h1 style={{
            fontFamily: t.fonts.display,
            fontSize: 38, lineHeight: 1.05, fontWeight: 600, letterSpacing: -0.8,
            color: t.color.ink, margin: 0,
          }}>
            Chào cô Quỳnh Anh,{' '}
            <span style={{
              fontStyle: (t.id === 'studio' || t.id === 'editorial') ? 'italic' : 'normal',
              color: t.color.accent,
            }}>sẵn sàng cho buổi học chưa?</span>
          </h1>
          <div style={{ marginTop: 10, color: t.color.muted, fontSize: 13 }}>
            Buổi học hôm nay bắt đầu lúc <strong style={{ color: t.color.ink }}>20:00</strong> · 30 phút · chủ đề chưa chọn
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Btn t={t} variant="outline" icon={<Icon.History size={14}/>}>Lịch sử</Btn>
          <Btn t={t} variant="primary" size="lg" icon={<Icon.Plus size={14}/>}>Soạn buổi học mới</Btn>
        </div>
      </div>

      {/* stats */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12,
        marginBottom: 28,
      }}>
        <StatCard t={t} num="12" label="Ngày học liên tục" />
        <StatCard t={t} num="38" label="Buổi đã hoàn thành" />
        <StatCard t={t} num="284" label="Từ vựng đã học" />
        <StatCard t={t} num="79" label="Điểm trung bình" />
      </div>

      {/* recent list */}
      <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 12 }}>
        <h3 style={{
          fontFamily: t.fonts.display, fontSize: 16, fontWeight: 600,
          color: t.color.ink, margin: 0,
        }}>Buổi học gần đây</h3>
        <span style={{ marginLeft: 'auto', fontSize: 12, color: t.color.muted }}>4 trong số 38 buổi</span>
      </div>

      <Surface t={t} style={{ overflow: 'hidden' }}>
        {sessions.map((s, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '44px 1fr auto auto',
            gap: 16, padding: '14px 18px', alignItems: 'center',
            borderTop: i ? `1px solid ${t.color.lineSoft}` : 'none',
          }}>
            <div style={{
              width: 40, height: 40,
              background: t.color.accentSoft,
              color: t.color.accent,
              borderRadius: t.radius.md,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: t.fonts.display, fontWeight: 700, fontSize: 16,
              fontVariantNumeric: 'tabular-nums',
            }}>{s.day}</div>
            <div style={{ minWidth: 0 }}>
              <div style={{
                fontWeight: 600, fontSize: 14, color: t.color.ink, marginBottom: 2,
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>{s.topic}</div>
              <div style={{ fontSize: 11, color: t.color.muted }}>{s.meta}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{
                fontFamily: t.fonts.display, fontSize: 22, fontWeight: 700,
                color: s.score >= 80 ? t.color.success : t.color.accent,
                fontVariantNumeric: 'tabular-nums',
              }}>{s.score}</span>
              <span style={{ fontSize: 10, color: t.color.mutedSoft }}>/100</span>
            </div>
            <Icon.ArrowRight size={14} color={t.color.mutedSoft}/>
          </div>
        ))}
      </Surface>

      {/* footer signature */}
      <div style={{
        marginTop: 28, paddingTop: 16,
        borderTop: `1px solid ${t.color.lineSoft}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        fontFamily: t.fonts.display,
        fontStyle: 'italic', fontSize: 12,
        color: t.color.mutedSoft, letterSpacing: 0.3,
      }}>
        Made with
        <span style={{ color: t.color.accent, fontSize: 13 }}>♥</span>
        — Anh
      </div>
    </div>
  );
}

window.MockDashboard = MockDashboard;
