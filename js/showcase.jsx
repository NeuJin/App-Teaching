/* ───── Main Themes Showcase
   For each of 5 themes, render a section with:
     • Tokens overview artboard (920 × 360)
     • Dashboard (920 × 600)
     • Setup (1080 × 700)
     • Teach full view (1280 × 720)
     • Student board + Summary pair (could be 2 boards in one row)
   ───── */

function ThemesShowcase() {
  return (
    <DesignCanvas
      title="App-Teaching · 5 themes"
      subtitle="Mỗi section là một theme — chứa palette, dashboard, setup, teach view, summary và bảng học viên. Kéo để xem, click bất kỳ artboard để xem fullscreen."
    >
      {THEME_LIST.map(id => {
        const t = THEMES[id];
        return (
          <DCSection
            key={id}
            id={id}
            title={t.name}
            subtitle={t.tagline}
          >
            <DCArtboard id={`${id}-tokens`} label="Design tokens" width={920} height={400}>
              <MockTokens t={t}/>
            </DCArtboard>
            <DCArtboard id={`${id}-dash`} label="Dashboard" width={920} height={760}>
              <MockDashboard t={t}/>
            </DCArtboard>
            <DCArtboard id={`${id}-setup`} label="Soạn buổi học" width={1080} height={700}>
              <MockSetup t={t}/>
            </DCArtboard>
            <DCArtboard id={`${id}-teach`} label="Đang dạy · Flashcard + Bảng HV" width={1280} height={720}>
              <MockTeach t={t}/>
            </DCArtboard>
            <DCArtboard id={`${id}-board`} label="Màn hình học viên (share Meet)" width={900} height={520}>
              <MockStudentBoard t={t}/>
            </DCArtboard>
            <DCArtboard id={`${id}-summary`} label="Tổng kết buổi học" width={700} height={680}>
              <MockSummary t={t}/>
            </DCArtboard>
          </DCSection>
        );
      })}
    </DesignCanvas>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ThemesShowcase/>);
