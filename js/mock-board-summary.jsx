/* ───── STUDENT BOARD mockup (what the student sees in Meet)
   + SUMMARY mockup (end-of-session scoring)
   Artboard pair fits in 1280 × 360 row */

function MockStudentBoard({ t }) {
  return (
    <div style={{ ...themeStyle(t), display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <Nameplate t={t} />
      <div style={{
        display: 'flex', alignItems: 'center', gap: 14,
        padding: '14px 28px',
        background: t.color.surface,
        borderBottom: `1px solid ${t.color.line}`,
      }}>
        <div>
          <div style={{
            fontSize: 10, fontWeight: 700, letterSpacing: 1.6,
            textTransform: 'uppercase', color: t.color.accent, marginBottom: 2,
          }}>Chủ đề buổi học</div>
          <div style={{
            fontFamily: t.fonts.display, fontSize: 22, fontWeight: 700,
            color: t.color.ink, letterSpacing: -0.4,
          }}>Travel — Memorable Trips</div>
        </div>
        <span style={{
          marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '5px 12px', fontSize: 11, fontWeight: 700,
          background: t.color.accent, color: t.mode === 'dark' ? t.color.bg : '#fff',
          borderRadius: 999, letterSpacing: 1,
        }}>
          <span style={{
            width: 7, height: 7, borderRadius: '50%',
            background: t.color.success || '#34d399',
          }}/>
          LIVE
        </span>
      </div>

      <div style={{ flex: 1, padding: 24, overflow: 'auto' }}>
        <Surface t={t} style={{
          padding: '32px 40px',
          height: '100%',
          border: `2px solid ${t.color.accent}40`,
          display: 'flex', flexDirection: 'column', gap: 14,
        }}>
          <div>
            <span style={{
              fontFamily: t.fonts.display, fontSize: 34, fontWeight: 600,
              color: t.color.ink, letterSpacing: -0.6,
              fontStyle: t.id === 'studio' ? 'italic' : 'normal',
            }}>destination</span>
            <span style={{
              fontFamily: t.fonts.phonetic, fontStyle: 'italic',
              fontSize: 22, color: t.color.accent, marginLeft: 12,
            }}>/ˌdes.tɪˈneɪ.ʃən/</span>
            <span style={{
              marginLeft: 12, fontSize: 12, padding: '3px 9px',
              background: t.color.accentSoft, color: t.color.accent,
              borderRadius: 999, fontWeight: 600, verticalAlign: 4,
            }}>noun</span>
          </div>
          <div style={{
            fontSize: 18, color: t.color.inkSoft, lineHeight: 1.6,
            fontFamily: t.fonts.body,
          }}>
            The place where someone is going or where something is being sent.
          </div>
          <div style={{
            fontFamily: t.fonts.display, fontStyle: 'italic',
            fontSize: 16, color: t.color.muted,
            padding: '12px 16px', borderLeft: `3px solid ${t.color.accent}`,
            background: t.color.surfaceAlt,
            borderRadius: t.radius.sm,
          }}>
            "Hanoi has become a popular destination for foreign tourists."
          </div>
        </Surface>
      </div>
    </div>
  );
}

function MockSummary({ t }) {
  const remembered = ['destination', 'itinerary', 'accommodation', 'sightseeing', 'souvenir', 'delay'];
  const forgotten = ['journey', 'luggage'];
  return (
    <div style={{ ...themeStyle(t), padding: 28, overflow: 'auto', position: 'relative' }}>
      <Nameplate t={t} />

      <div style={{
        background: t.color.accent,
        color: t.mode === 'dark' ? t.color.bg : '#fff',
        borderRadius: t.radius.xl,
        padding: '24px 28px',
        marginBottom: 16,
        boxShadow: t.shadow.lg,
      }}>
        <div style={{
          fontSize: 11, fontWeight: 700, letterSpacing: 1.6,
          textTransform: 'uppercase', opacity: .75, marginBottom: 4,
        }}>Tổng kết buổi học</div>
        <div style={{
          fontFamily: t.fonts.display, fontSize: 24, fontWeight: 600, letterSpacing: -0.5,
        }}>Travel — Memorable Trips</div>
        <div style={{ marginTop: 4, fontSize: 12, opacity: .8 }}>
          Ngày 12 · B1+ · 30 phút · 8 từ vựng
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 14 }}>
        <Surface t={t} style={{ padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: t.color.muted, marginBottom: 8 }}>Điểm hôm nay</div>
          <div style={{
            fontFamily: t.fonts.display, fontSize: 64, lineHeight: 1, fontWeight: 700,
            color: t.color.accent, letterSpacing: -2,
            fontVariantNumeric: 'tabular-nums',
          }}>82</div>
          <div style={{ fontSize: 11, color: t.color.mutedSoft, marginBottom: 16 }}>/ 100</div>
          {/* slider track */}
          <div style={{
            height: 6, background: t.color.surfaceAlt,
            borderRadius: 999, position: 'relative', marginBottom: 6,
          }}>
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0, width: '82%',
              background: t.color.accent, borderRadius: 999,
            }}/>
            <div style={{
              position: 'absolute', left: 'calc(82% - 8px)', top: -5,
              width: 16, height: 16, borderRadius: '50%',
              background: t.color.accent,
              border: `2px solid ${t.color.surface}`,
              boxShadow: t.shadow.md,
            }}/>
          </div>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            fontSize: 10, color: t.color.mutedSoft,
          }}>
            <span>Cần cải thiện</span><span>Rất tốt</span>
          </div>
        </Surface>

        <Surface t={t} style={{ padding: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <Icon.Book size={14} color={t.color.accent}/>
            <span style={{ fontWeight: 700, fontSize: 13 }}>Từ vựng nhớ được</span>
            <span style={{ marginLeft: 'auto', fontSize: 11, color: t.color.muted }}>
              {remembered.length} / 8
            </span>
          </div>
          <div style={{ fontSize: 11, color: t.color.muted, marginBottom: 10 }}>
            Click để chọn các từ học viên nhớ
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {remembered.map(w => (
              <span key={w} style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                padding: '5px 11px', fontSize: 12, fontWeight: 600,
                background: t.color.accentSoft, color: t.color.accent,
                border: `1px solid ${t.color.accent}40`,
                borderRadius: t.radius.md,
              }}>
                <Icon.Check size={11}/>
                {w}
              </span>
            ))}
            {forgotten.map(w => (
              <span key={w} style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '5px 11px', fontSize: 12, fontWeight: 500,
                background: t.color.surface, color: t.color.mutedSoft,
                border: `1px solid ${t.color.line}`,
                borderRadius: t.radius.md,
                textDecoration: 'line-through',
              }}>{w}</span>
            ))}
          </div>
        </Surface>
      </div>

      <Surface t={t} style={{ padding: 18, marginTop: 14 }}>
        <Label t={t}>Nhận xét buổi học</Label>
        <div style={{
          padding: '12px 14px',
          background: t.color.surfaceAlt,
          border: `1px solid ${t.color.line}`,
          borderRadius: t.radius.md,
          fontSize: 13, lineHeight: 1.6,
          color: t.color.inkSoft, fontStyle: 'italic',
        }}>
          Học viên phát âm /ʃ/ ở "destination" còn hơi nhẹ. Đã tự kể được chuyến đi Đà Lạt
          dùng Past Simple khá tốt. Buổi sau ôn lại Present Perfect và mở rộng sang chủ đề
          "Cultural Differences".
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
          <Btn t={t} variant="outline" size="md">Về trang chính</Btn>
          <Btn t={t} variant="primary" size="md" style={{ flex: 1 }}
               icon={<Icon.Check size={14}/>}>Lưu buổi học</Btn>
        </div>
      </Surface>
    </div>
  );
}

window.MockStudentBoard = MockStudentBoard;
window.MockSummary = MockSummary;
