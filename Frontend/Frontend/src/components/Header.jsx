import { gh, mkBtn } from "../styles";

export default function Header({ tab, setTab, productsCount, categoriesCount }) {
  return (
    <header style={{
      background: gh.surface, borderBottom: `1px solid ${gh.border}`,
      height: "56px", display: "flex", alignItems: "center",
      padding: "0 24px", gap: "24px", position: "sticky", top: 0, zIndex: 50,
    }}>
      <div style={{ fontWeight: 700, fontSize: "15px", letterSpacing: "1px", display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ color: gh.accent, fontSize: "18px" }}>◆</span>
        <span>MERO PASAL</span>
      </div>
      <div style={{ width: "1px", height: "20px", background: gh.border }} />
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
      <div style={{ marginLeft: "auto", color: gh.muted, fontSize: "12px", display: "flex", gap: "16px" }}>
        <span><span style={{ color: gh.accent }}>■</span> {productsCount} products</span>
        <span><span style={{ color: gh.warning }}>■</span> {categoriesCount} categories</span>
      </div>
    </header>
  );
}