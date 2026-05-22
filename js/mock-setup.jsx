/* ───── SETUP mockup — compact, 3-column layout
   Artboard: 1080 × 700 */

function MockSetup({ t }) {
  const vocabSample = [
    { w: 'destination', ph: '/ˌdes.tɪˈneɪ.ʃən/', pos: 'noun', m: 'điểm đến' },
    { w: 'itinerary',   ph: '/aɪˈtɪn.ər.ər.i/', pos: 'noun', m: 'lịch trình' },
    { w: 'accommodation', ph: '/əˌkɒm.əˈdeɪ.ʃən/', pos: 'noun', m: 'chỗ ở' },
    { w: 'sightseeing', ph: '/ˈsaɪtˌsiː.ɪŋ/', pos: 'noun', m: 'tham quan' },
    { w: 'souvenir', ph: '/ˌsuː.vənˈɪər/', pos: 'noun', m: 'quà lưu niệm' },
  ];
  const questions = [
    'What was the most memorable trip you have ever taken?',
    'How do you usually plan an itinerary?',
    'Have you ever had a problem with accommodation? Tell me about it.',
    'What kind of souvenirs do you like to bring home?',
    'If you could travel anywhere tomorrow, where would you go and why?',
  ];

  return (
    <div style={{ ...themeStyle(t), display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <Nameplate t={t} />

      {/* top bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 14,
        padding: '14px 24px',
        background: t.color.surface,
        borderBottom: `1px solid ${t.color.line}`,
      }}>
        <Btn t={t} variant="ghost" size="sm" icon={<Icon.ArrowLeft size={14}/>}>Quay lại</Btn>
        <div style={{
          fontFamily: t.fonts.display, fontSize: 17, fontWeight: 600, color: t.color.ink,
        }}>Soạn buổi học mới</div>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '4px 11px', fontSize: 12, fontWeight: 600,
          background: t.color.accentSoft, color: t.color.accent,
          borderRadius: 999,
        }}>
          <Icon.Headphones size={11}/>
          với học viên
        </span>
        <Chip t={t} tone="muted">Tự lưu nháp</Chip>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <Btn t={t} variant="outline" size="sm" icon={<Icon.Eye size={13}/>}>Xem trước</Btn>
          <Btn t={t} variant="primary" size="md" icon={<Icon.Play size={13}/>}>Bắt đầu dạy</Btn>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '20px 24px' }}>
        {/* topic strip */}
        <Surface t={t} style={{ padding: '18px 20px', marginBottom: 16 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 110px 100px 100px auto',
            gap: 14, alignItems: 'end',
          }}>
            <div>
              <Label t={t}>Chủ đề buổi học</Label>
              <Input t={t} large value="Travel — Memorable Trips" />
            </div>
            <div>
              <Label t={t}>Trình độ</Label>
              <Input t={t} value="B1+" />
            </div>
            <div>
              <Label t={t}>Số từ</Label>
              <Input t={t} value="8" mono />
            </div>
            <div>
              <Label t={t}>Số câu hỏi</Label>
              <Input t={t} value="5" mono />
            </div>
            <Btn t={t} variant="secondary" icon={<Icon.Wand size={14}/>}>Gợi ý AI</Btn>
          </div>
        </Surface>

        {/* 3-column main content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.05fr 1.25fr 0.95fr',
          gap: 14,
        }}>

          {/* VOCAB (compact rows) */}
          <Surface t={t} style={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '12px 14px', borderBottom: `1px solid ${t.color.lineSoft}`,
            }}>
              <Icon.Card size={14} color={t.color.accent}/>
              <span style={{ fontWeight: 600, fontSize: 13 }}>Từ vựng</span>
              <Chip t={t} tone="accent" style={{ padding: '1px 7px' }}>8</Chip>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
                <Btn t={t} variant="ghost" size="sm" icon={<Icon.Globe size={12}/>}>Tra hết</Btn>
                <Btn t={t} variant="ghost" size="sm" icon={<Icon.Plus size={12}/>}>Thêm</Btn>
              </div>
            </div>
            <div style={{ padding: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {vocabSample.map((v, i) => (
                <div key={i} style={{
                  display: 'grid',
                  gridTemplateColumns: '1.1fr 1.1fr 0.9fr',
                  gap: 6, padding: '7px 10px',
                  background: i % 2 ? 'transparent' : t.color.surfaceAlt,
                  borderRadius: t.radius.sm,
                  fontSize: 12, alignItems: 'center',
                }}>
                  <div style={{ fontWeight: 600, color: t.color.ink }}>{v.w}</div>
                  <div style={{
                    fontFamily: t.fonts.phonetic,
                    fontStyle: 'italic',
                    color: t.color.accent,
                    fontSize: 12,
                  }}>{v.ph}</div>
                  <div style={{ color: t.color.muted, fontSize: 11 }}>{v.m}</div>
                </div>
              ))}
              <div style={{
                padding: '7px 10px', fontSize: 11, color: t.color.mutedSoft,
                textAlign: 'center', borderTop: `1px dashed ${t.color.line}`,
                marginTop: 4,
              }}>+ 3 từ nữa…</div>
            </div>

            {/* flashcard config */}
            <div style={{
              padding: '12px 14px',
              borderTop: `1px solid ${t.color.lineSoft}`,
              background: t.color.surfaceAlt,
            }}>
              <Label t={t} style={{ marginBottom: 8 }}>Cấu hình flashcard</Label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, marginBottom: 6 }}>
                <span style={{ color: t.color.muted, width: 38 }}>Mặt 1</span>
                <Chip t={t} tone="solid">word</Chip>
                <Chip t={t} tone="solid">phon</Chip>
                <Chip t={t} tone="muted">pos</Chip>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11 }}>
                <span style={{ color: t.color.muted, width: 38 }}>Mặt 2</span>
                <Chip t={t} tone="solid">nghĩa</Chip>
                <Chip t={t} tone="solid">ví dụ</Chip>
                <Chip t={t} tone="muted">word</Chip>
              </div>
            </div>
          </Surface>

          {/* QUESTIONS */}
          <Surface t={t} style={{ padding: 0 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '12px 14px', borderBottom: `1px solid ${t.color.lineSoft}`,
            }}>
              <Icon.Question size={14} color={t.color.accent}/>
              <span style={{ fontWeight: 600, fontSize: 13 }}>Câu hỏi thảo luận</span>
              <Chip t={t} tone="accent" style={{ padding: '1px 7px' }}>5</Chip>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
                <Btn t={t} variant="ghost" size="sm" icon={<Icon.Sparkle size={12}/>}>Tự tạo</Btn>
                <Btn t={t} variant="ghost" size="sm" icon={<Icon.Plus size={12}/>}>Thêm</Btn>
              </div>
            </div>
            <div style={{ padding: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {questions.map((q, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 10,
                  padding: '8px 10px',
                  background: t.color.surfaceAlt,
                  borderRadius: t.radius.md,
                  fontSize: 12, lineHeight: 1.5,
                }}>
                  <span style={{
                    width: 18, height: 18, borderRadius: '50%',
                    background: t.color.surface,
                    color: t.color.muted,
                    border: `1px solid ${t.color.line}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, fontWeight: 700, flexShrink: 0,
                  }}>{i + 1}</span>
                  <span style={{ color: t.color.ink }}>{q}</span>
                </div>
              ))}
            </div>

            <div style={{
              padding: '12px 14px',
              borderTop: `1px solid ${t.color.lineSoft}`,
              background: t.color.surfaceAlt,
            }}>
              <Label t={t} style={{ marginBottom: 8 }}>Mẫu câu giao tiếp · 2</Label>
              <div style={{ fontSize: 12, lineHeight: 1.6 }}>
                <div style={{ marginBottom: 4 }}>
                  <span style={{
                    fontFamily: t.fonts.display, fontWeight: 600, color: t.color.ink,
                  }}>"I would like to </span>
                  <span style={{ background: t.color.accentSoft, color: t.color.accent, padding: '0 4px', borderRadius: 3 }}>...</span>
                  <span style={{ fontFamily: t.fonts.display, fontWeight: 600, color: t.color.ink }}>"</span>
                </div>
                <div>
                  <span style={{
                    fontFamily: t.fonts.display, fontWeight: 600, color: t.color.ink,
                  }}>"Have you ever been to </span>
                  <span style={{ background: t.color.accentSoft, color: t.color.accent, padding: '0 4px', borderRadius: 3 }}>...</span>
                  <span style={{ fontFamily: t.fonts.display, fontWeight: 600, color: t.color.ink }}>?"</span>
                </div>
              </div>
            </div>
          </Surface>

          {/* GRAMMAR + suggestions */}
          <Surface t={t} style={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '12px 14px', borderBottom: `1px solid ${t.color.lineSoft}`,
            }}>
              <Icon.Note size={14} color={t.color.accent}/>
              <span style={{ fontWeight: 600, fontSize: 13 }}>Ngữ pháp</span>
              <Btn t={t} variant="ghost" size="sm" icon={<Icon.Sparkle size={12}/>}
                   style={{ marginLeft: 'auto' }}>Tự điền</Btn>
            </div>
            <div style={{ padding: 12 }}>
              <Label t={t}>Gợi ý cho "travel"</Label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 12 }}>
                {['Past Simple', 'Present Perfect', 'be going to', 'Prepositions of place'].map(g => (
                  <span key={g} style={{
                    fontSize: 11, padding: '4px 9px',
                    border: `1px dashed ${t.color.line}`,
                    color: t.color.accent,
                    borderRadius: 999, cursor: 'pointer',
                  }}>+ {g}</span>
                ))}
              </div>

              <Label t={t}>Ghi chú</Label>
              <div style={{
                padding: '10px 12px',
                background: t.color.surfaceAlt,
                border: `1px solid ${t.color.line}`,
                borderRadius: t.radius.md,
                fontSize: 12, lineHeight: 1.7, color: t.color.inkSoft,
                fontFamily: t.fonts.body,
              }}>
                <div>• Past Simple — kể chuyến đi đã qua</div>
                <div>• Present Perfect — "Have you ever been to...?"</div>
                <div>• be going to — kế hoạch du lịch</div>
                <div>• Prepositions: at the airport, in Hanoi</div>
              </div>
            </div>
          </Surface>
        </div>
      </div>
    </div>
  );
}

window.MockSetup = MockSetup;
