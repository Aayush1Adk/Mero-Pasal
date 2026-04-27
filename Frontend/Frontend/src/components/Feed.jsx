import { gh, mkBtn } from "../styles";

export default function Feed({ products, setTab, viewDetail }) {
  return (
    <>
      <style>{`
        @media (max-width: 600px) {
          .feed-header {
            flex-direction: column !important;
            gap: 12px !important;
            align-items: flex-start !important;
          }
          .feed-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }} className="feed-header">
        <h1 style={{ fontSize: "18px", fontWeight: 600 }}>Product Feed</h1>
        <button style={mkBtn("primary")} onClick={() => setTab("admin")}>+ Add Product</button>
      </div>

      {products.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 0", color: gh.muted, border: `1px dashed ${gh.border}`, borderRadius: "8px" }}>
          <div style={{ fontSize: "36px", marginBottom: "12px" }}>[ Empty ]</div>
          <p style={{ fontSize: "15px", marginBottom: "4px" }}>No products yet</p>
          <p style={{ fontSize: "13px" }}>Add your first product from the Admin panel.</p>
        </div>
      ) : (
        <div className="feed-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "12px" }}>
          {products.map(p => (
            <div key={p._id} className="pcard" onClick={() => viewDetail(p._id)}
              style={{ background: gh.surface, border: `1px solid ${gh.border}`, borderRadius: "6px", cursor: "pointer", overflow: "hidden" }}>
              <div style={{ padding: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                  <div style={{ fontWeight: 600, fontSize: "14px", lineHeight: "1.4" }}>{p.title}</div>
                  {p.offer && (
                    <span style={{ flexShrink: 0, marginLeft: "8px", background: "#1a4721", color: gh.success, border: `1px solid ${gh.success}44`, borderRadius: "12px", padding: "1px 8px", fontSize: "11px", fontWeight: 700 }}>
                      OFFER
                    </span>
                  )}
                </div>
                <div style={{ fontSize: "12px", color: gh.muted, marginBottom: "12px", display: "flex", alignItems: "center", gap: "4px" }}>
                  <span style={{ color: gh.warning }}>▸</span> {p.catagory?.title || "—"}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "20px", fontWeight: 700, color: gh.accent }}>Rs. {p.SP}</span>
                  {p.Discount > 0 && (
                    <span style={{ background: "#2d1f00", color: gh.warning, border: `1px solid ${gh.warning}44`, borderRadius: "12px", padding: "1px 8px", fontSize: "11px" }}>
                      {p.Discount}% off
                    </span>
                  )}
                </div>
              </div>
              <div style={{ padding: "6px 16px", background: gh.surface2, borderTop: `1px solid ${gh.borderMuted}`, fontSize: "11px", color: gh.muted }}>
                Click for details →
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}