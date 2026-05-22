/* ───── TEACH view mockup — full app screen
   Sidebar (wider, icon + label) · Whiteboard center (flashcard) · Student board panel.
   Artboard: 1280 × 720 */

function MockTeach({ t }) {
  const isDark = t.mode === 'dark';
  const barBg = isDark ? t.color.bg : t.color.ink;
  const barFg = isDark ? t.color.ink : '#ffffff';
  const barMuted = isDark ? t.color.muted : 'rgba(255,255,255,.55)';
  const barLine = isDark ? t.color.line : 'rgba(255,255,255,.1)';
  const sideBg = isDark ? t.color.bgSoft : t.color.surface;

  const navItems = [
    { id: 'vocab',     icon: <Icon.Card size={16}/>,     label: 'Flashcard',  count: 8, active: true,  hint: '1' },
    { id: 'questions', icon: <Icon.Question size={16}/>, label: 'Câu hỏi',    count: 5, hint: '2' },
    { id: 'patterns',  icon: <Icon.Chat size={16}/>,     label: 'Mẫu câu',    count: 2, hint: '3' },
    { id: 'grammar',   icon: <Icon.Note size={16}/>,     label: 'Ngữ pháp',   hint: '4' },
  ];

  return (
    <div style={{ ...themeStyle(t), display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <Nameplate t={t} />

      {/* TOP BAR */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 16,
        padding: '0 18px', height: 56, flexShrink: 0,
        background: barBg, color: barFg,
        borderBottom: `1px solid ${barLine}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 26, height: 26, borderRadius: t.radius.sm,
            background: t.color.accent,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: isDark ? t.color.bg : '#fff',
          }}>
            <Icon.Book size={14}/>
          </div>
          <div style={{ fontFamily: t.fonts.display, fontWeight: 700, fontSize: 14, letterSpacing: 0.4 }}>ETB</div>
        </div>

        <div style={{ flex: 1, textAlign: 'center', minWidth: 0 }}>
          <div style={{
            fontFamily: t.fonts.display, fontSize: 17, fontWeight: 600,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>Travel — Memorable Trips</div>
          <div style={{ fontSize: 11, color: barMuted, marginTop: -1 }}>B1+ · Buổi 12</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Chip t={t} tone="solid" style={{ background: t.color.accent }}>Ngày 12</Chip>
          <div style={{
            fontFamily: t.fonts.mono, fontSize: 18, fontWeight: 700,
            padding: '4px 12px', borderRadius: t.radius.md,
            border: `1px solid ${barLine}`,
            color: barFg, letterSpacing: 1.5,
            fontVariantNumeric: 'tabular-nums',
          }}>23:14</div>
          <Btn t={t} variant="ghost" size="sm" icon={<Icon.Stop size={13}/>}
            style={{ color: barMuted, border: `1px solid ${barLine}` }}>
            Kết thúc
          </Btn>
        </div>
      </div>

      {/* MAIN AREA */}
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>

        {/* SIDEBAR — wider (240px), bigger touch targets */}
        <div style={{
          width: 240, flexShrink: 0,
          background: sideBg,
          borderRight: `1px solid ${t.color.line}`,
          display: 'flex', flexDirection: 'column',
        }}>
          <div style={{ padding: '18px 14px 8px' }}>
            <div style={{
              fontSize: 10, fontWeight: 700, letterSpacing: 1.4,
              textTransform: 'uppercase', color: t.color.muted,
              padding: '0 8px', marginBottom: 8,
            }}>Nội dung (chỉ GV thấy)</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {navItems.map(n => (
                <button key={n.id} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '11px 12px', borderRadius: t.radius.md,
                  background: n.active ? t.color.accent : 'transparent',
                  color: n.active ? (isDark ? t.color.bg : '#fff') : t.color.inkSoft,
                  fontSize: 14, fontWeight: 600, fontFamily: t.fonts.body,
                  border: 'none', cursor: 'pointer', textAlign: 'left',
                }}>
                  <span style={{
                    width: 28, height: 28, borderRadius: t.radius.sm,
                    background: n.active ? 'rgba(255,255,255,.18)' : t.color.surfaceAlt,
                    color: n.active ? 'inherit' : t.color.accent,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>{n.icon}</span>
                  <span style={{ flex: 1 }}>{n.label}</span>
                  {n.count != null && (
                    <span style={{
                      fontSize: 11, fontWeight: 700,
                      padding: '1px 7px', borderRadius: 999,
                      background: n.active ? 'rgba(255,255,255,.2)' : t.color.surfaceAlt,
                      color: n.active ? 'inherit' : t.color.muted,
                      minWidth: 18, textAlign: 'center',
                    }}>{n.count}</span>
                  )}
                  <span style={{
                    fontSize: 10, fontFamily: t.fonts.mono,
                    padding: '1px 5px', borderRadius: 3,
                    background: n.active ? 'rgba(255,255,255,.12)' : 'transparent',
                    border: `1px solid ${n.active ? 'transparent' : t.color.line}`,
                    color: n.active ? 'inherit' : t.color.mutedSoft,
                    minWidth: 18, textAlign: 'center',
                  }}>{n.hint}</span>
                </button>
              ))}
            </div>
          </div>

          <div style={{ flex: 1 }}/>

          <div style={{
            margin: 14, padding: 12,
            background: t.color.accentSoft,
            border: `1px solid ${t.color.line}`,
            borderRadius: t.radius.md,
          }}>
            <div style={{
              fontSize: 11, fontWeight: 700, color: t.color.accent,
              display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6,
            }}>
              <Icon.Monitor size={12}/> Bảng học viên
            </div>
            <div style={{ fontSize: 11, color: t.color.muted, lineHeight: 1.5, marginBottom: 8 }}>
              Mở cửa sổ phụ, share qua Google Meet.
            </div>
            <Btn t={t} variant="primary" size="sm" style={{ width: '100%' }}
                 icon={<Icon.Monitor size={12}/>}>Mở màn hình HV</Btn>
          </div>
        </div>

        {/* WHITEBOARD (flashcard view) */}
        <div style={{ flex: 1, padding: 18, display: 'flex', minWidth: 0 }}>
          <Surface t={t} style={{
            flex: 1, padding: '24px 32px',
            display: 'flex', flexDirection: 'column', overflow: 'hidden',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16,
            }}>
              <Icon.Card size={14} color={t.color.accent}/>
              <span style={{
                fontSize: 11, fontWeight: 700, letterSpacing: 1.6,
                textTransform: 'uppercase', color: t.color.accent,
              }}>Flashcard từ vựng</span>
              <span style={{ marginLeft: 'auto', fontSize: 11, color: t.color.mutedSoft }}>
                Click thẻ để lật · ←/→ đổi thẻ
              </span>
            </div>

            <Flashcard t={t} />

            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 14, marginTop: 18,
            }}>
              <Btn t={t} variant="outline" size="md" icon={<Icon.ArrowLeft size={14}/>}>Trước</Btn>
              <Btn t={t} variant="secondary" size="md" icon={<Icon.Refresh size={14}/>}>Lật thẻ</Btn>
              <span style={{
                fontFamily: t.fonts.mono, fontSize: 13, color: t.color.muted,
                padding: '0 12px', minWidth: 60, textAlign: 'center',
                fontVariantNumeric: 'tabular-nums',
              }}>3 / 8</span>
              <Btn t={t} variant="primary" size="md">Tiếp <Icon.ArrowRight size={14}/></Btn>
            </div>
          </Surface>
        </div>

        {/* STUDENT BOARD PANEL */}
        <div style={{
          width: 320, flexShrink: 0,
          background: sideBg,
          borderLeft: `1px solid ${t.color.line}`,
          display: 'flex', flexDirection: 'column',
          padding: 16, gap: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon.Monitor size={14} color={t.color.accent}/>
            <span style={{ fontSize: 13, fontWeight: 700, color: t.color.ink }}>Bảng học viên</span>
            <span style={{
              marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 5,
              fontSize: 10, color: t.color.success, fontWeight: 600,
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: '50%',
                background: t.color.success,
                boxShadow: `0 0 0 3px ${t.color.success}33`,
              }}/>
              LIVE
            </span>
          </div>

          <div style={{ fontSize: 11, color: t.color.muted, lineHeight: 1.5 }}>
            Học viên thấy realtime nội dung dưới đây, KHÔNG thấy giáo án.
          </div>

          <Label t={t}>Học viên đang thấy</Label>
          <div style={{
            background: t.color.surface,
            border: `1.5px solid ${t.color.accent}`,
            borderRadius: t.radius.md,
            padding: 14,
            minHeight: 110, maxHeight: 180, overflow: 'auto',
            fontSize: 14, lineHeight: 1.6, color: t.color.ink,
            whiteSpace: 'pre-wrap',
          }}>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>destination /ˌdes.tɪˈneɪ.ʃən/</div>
            <div style={{ color: t.color.muted, fontSize: 12 }}>
              The place you are travelling to.{'\n'}
              → Hanoi is a popular destination.
            </div>
          </div>

          <textarea readOnly style={{
            flex: 1, minHeight: 80,
            background: t.color.surface,
            border: `1px solid ${t.color.line}`,
            borderRadius: t.radius.md,
            padding: 12, fontSize: 13, color: t.color.ink,
            fontFamily: t.fonts.body, resize: 'none', outline: 'none',
          }} value="destination /ˌdes.tɪˈneɪ.ʃən/&#10;The place you are travelling to.&#10;→ Hanoi is a popular destination."/>

          <div style={{ display: 'flex', gap: 8 }}>
            <Btn t={t} variant="outline" size="sm" style={{ flex: 1 }}
                 icon={<Icon.Trash size={12}/>}>Xóa bảng</Btn>
            <Btn t={t} variant="primary" size="sm" style={{ flex: 1 }}
                 icon={<Icon.Send size={12}/>}>Đẩy lên</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───── Flashcard hero (used inside Teach + standalone) ───── */
function Flashcard({ t, big }) {
  const w = 'destination';
  const ph = '/ˌdes.tɪˈneɪ.ʃən/';
  return (
    <div style={{
      flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: big ? 320 : 240,
    }}>
      <div style={{
        width: '100%', maxWidth: big ? 720 : 580,
        aspectRatio: '16 / 9',
        background: t.color.surface,
        border: `1.5px solid ${t.color.line}`,
        borderRadius: t.radius.xl,
        boxShadow: t.shadow.lg,
        position: 'relative',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: 24,
        overflow: 'hidden',
      }}>
        {/* corner labels */}
        <span style={{
          position: 'absolute', top: 14, left: 18,
          fontSize: 10, fontWeight: 700, letterSpacing: 1.8,
          textTransform: 'uppercase', color: t.color.accent,
        }}>Mặt trước · noun</span>
        <span style={{
          position: 'absolute', top: 14, right: 18,
          fontSize: 10, color: t.color.mutedSoft, fontFamily: t.fonts.mono,
        }}>3 / 8</span>

        {/* watermark accent rule */}
        <div style={{
          position: 'absolute', top: 38, left: '50%',
          transform: 'translateX(-50%)',
          width: 40, height: 2, background: t.color.accent,
        }}/>

        <div style={{
          fontFamily: t.fonts.display,
          fontSize: big ? 88 : 72, lineHeight: 1,
          fontWeight: 600, letterSpacing: -2,
          color: t.color.ink, textAlign: 'center',
          fontStyle: t.id === 'studio' ? 'italic' : 'normal',
        }}>{w}</div>

        <div style={{
          fontFamily: t.fonts.phonetic, fontStyle: 'italic',
          fontSize: big ? 28 : 22,
          color: t.color.accent,
          marginTop: 14,
          letterSpacing: 0.5,
        }}>{ph}</div>

        <span style={{
          position: 'absolute', bottom: 14, right: 18,
          fontSize: 10, color: t.color.mutedSoft, fontFamily: t.fonts.mono,
          letterSpacing: 1.2,
        }}>CLICK ĐỂ LẬT</span>
      </div>
    </div>
  );
}

window.MockTeach = MockTeach;
window.Flashcard = Flashcard;
