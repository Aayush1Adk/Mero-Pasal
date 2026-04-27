import { gh, mkBtn } from "../styles";

export default function Header({ tab, setTab, productsCount, categoriesCount }) {
  return (
    <>
      <style>{`
        @media (max-width: 600px) {
          .header-container {
            flex-wrap: wrap !important;
            height: auto !important;
            padding: 12px 12px !important;
            gap: 10px !important;
          }
          .header-divider {
            display: none !important;
          }
          .header-stats {
            width: 100% !important;
            justify-content: center !important;
            font-size: 11px !important;
          }
          .header-title {
            font-size: 13px !important;
          }
        }
      `}</style>
    <header className="header-container" style={{
      background: gh.surface, borderBottom: `1px solid ${gh.border}`,
      height: "56px", display: "flex", alignItems: "center",
      padding: "0 24px", gap: "24px", position: "sticky", top: 0, zIndex: 50,
    }}>
      <div className="header-title" style={{ fontWeight: 700, fontSize: "15px", letterSpacing: "1px", display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ color: gh.accent, fontSize: "18px" }}>◆</span>
        <span>MERO PASAL</span>
      </div>
      <div className="header-divider" style={{ width: "1px", height: "20px", background: gh.border }} />
      <div style={{ display: "flex", gap: "4px" }}>
        {[["feed", "Products"], ["admin", "Admin"]].map(([id, label]) => (
          <button key={id} className="nav-btn" onClick={() => setTab(id)} style={{
            ...mkBtn(), padding: "4px 14px",
            background: tab === id ? gh.surface2 : "transparent",
            border: `1px solid ${tab === id ? gh.border : "transparent"}`,
            color: tab === id ? gh.text : gh.muted,
          }}>
            {label}
          </button>
        ))}
      </div>
      <div className="header-stats" style={{ marginLeft: "auto", color: gh.muted, fontSize: "12px", display: "flex", gap: "16px" }}>
        <span><span style={{ color: gh.accent }}>■</span> {productsCount} products</span>
        <span><span style={{ color: gh.warning }}>■</span> {categoriesCount} categories</span>
      </div>
    </header>
    </>
  );
}